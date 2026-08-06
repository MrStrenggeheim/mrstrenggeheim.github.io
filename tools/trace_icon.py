#!/usr/bin/env python3
"""
Trace the alpha channel of a PNG into an SVG path for the icon sprite.

The bufo icon arrived as a 1024px PNG whose shape lives entirely in its alpha
channel. Icons in assets/icons.svg are vector symbols filled with currentColor,
which is what lets them pick up hover and active colours, so the PNG is traced
rather than embedded.

Marching squares extracts closed contours (outer edges and holes alike) and
Douglas-Peucker drops the redundant points. The result is emitted with
fill-rule="evenodd", so nested holes need no winding bookkeeping.

Usage:
    python tools/trace_icon.py --input icon.png --size 24 [--grid 256]
"""

import argparse
from pathlib import Path

from PIL import Image

# Segment endpoints produced by each 4-bit marching-squares case. Corners are
# numbered tl=1, tr=2, br=4, bl=8; edges are named by the side they cross.
EDGE = {
    "T": (0.5, 0.0),
    "R": (1.0, 0.5),
    "B": (0.5, 1.0),
    "L": (0.0, 0.5),
}
CASES = {
    1: [("L", "T")], 2: [("T", "R")], 3: [("L", "R")],
    4: [("R", "B")], 5: [("L", "T"), ("R", "B")], 6: [("T", "B")],
    7: [("L", "B")], 8: [("B", "L")], 9: [("B", "T")],
    10: [("T", "R"), ("B", "L")], 11: [("B", "R")], 12: [("R", "L")],
    13: [("R", "T")], 14: [("T", "L")],
}


def load_mask(path: Path, grid: int) -> list[list[int]]:
    """Alpha channel as a padded binary grid, 1 inside the shape."""
    with Image.open(path) as im:
        alpha = im.convert("RGBA").getchannel("A")
        alpha = alpha.resize((grid, grid), Image.LANCZOS)

    # One cell of padding guarantees every contour closes inside the grid.
    mask = [[0] * (grid + 2) for _ in range(grid + 2)]
    px = alpha.load()
    for y in range(grid):
        for x in range(grid):
            mask[y + 1][x + 1] = 1 if px[x, y] >= 128 else 0
    return mask


def marching_squares(mask: list[list[int]]) -> list[list[tuple[float, float]]]:
    height, width = len(mask), len(mask[0])
    segments: dict[tuple[float, float], list[tuple[float, float]]] = {}

    for y in range(height - 1):
        for x in range(width - 1):
            index = (mask[y][x] * 1 + mask[y][x + 1] * 2
                     + mask[y + 1][x + 1] * 4 + mask[y + 1][x] * 8)
            if index in (0, 15):
                continue
            for a, b in CASES[index]:
                pa = (x + EDGE[a][0], y + EDGE[a][1])
                pb = (x + EDGE[b][0], y + EDGE[b][1])
                segments.setdefault(pa, []).append(pb)

    # Walk the segment graph into closed rings.
    contours = []
    while segments:
        start = next(iter(segments))
        ring = [start]
        current = start
        while True:
            nexts = segments.get(current)
            if not nexts:
                break
            nxt = nexts.pop()
            if not nexts:
                del segments[current]
            if nxt == start:
                break
            ring.append(nxt)
            current = nxt
        if len(ring) >= 3:
            contours.append(ring)
    return contours


def perpendicular_distance(p, a, b) -> float:
    if a == b:
        return ((p[0] - a[0]) ** 2 + (p[1] - a[1]) ** 2) ** 0.5
    dx, dy = b[0] - a[0], b[1] - a[1]
    t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))
    cx, cy = a[0] + t * dx, a[1] + t * dy
    return ((p[0] - cx) ** 2 + (p[1] - cy) ** 2) ** 0.5


def simplify(points, tolerance):
    """Iterative Douglas-Peucker; recursion would blow the stack on 1000+ pts."""
    if len(points) < 3:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        first, last = stack.pop()
        worst, index = 0.0, None
        for i in range(first + 1, last):
            d = perpendicular_distance(points[i], points[first], points[last])
            if d > worst:
                worst, index = d, i
        if index is not None and worst > tolerance:
            keep[index] = True
            stack.append((first, index))
            stack.append((index, last))
    return [p for p, k in zip(points, keep) if k]


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--input", required=True, type=Path)
    ap.add_argument("--size", type=float, default=24.0, help="viewBox size")
    ap.add_argument("--grid", type=int, default=256, help="trace resolution")
    ap.add_argument("--tolerance", type=float, default=0.6,
                    help="simplification tolerance, in grid cells")
    ap.add_argument("--padding", type=float, default=0.0,
                    help="breathing room around the glyph, in viewBox units")
    args = ap.parse_args()

    mask = load_mask(args.input, args.grid)
    contours = marching_squares(mask)
    print(f"{len(contours)} contours before simplification")

    scale = args.size / args.grid
    parts = []
    all_points = []
    for ring in sorted(contours, key=len, reverse=True):
        ring = simplify(ring + [ring[0]], args.tolerance)
        if len(ring) < 4:
            continue
        pts = [((x - 1) * scale, (y - 1) * scale) for x, y in ring]
        all_points.extend(pts)
        d = "M" + " ".join(f"{x:.2f},{y:.2f}" for x, y in pts) + "Z"
        parts.append(d)
        print(f"  ring: {len(pts)} points")

    # A viewBox of 0 0 size size would leave whatever dead space the source PNG
    # had around the shape. Crop to the glyph's own bounds instead, kept square
    # so it cannot stretch, so it fills its box like the other icons do.
    xs = [p[0] for p in all_points]
    ys = [p[1] for p in all_points]
    width, height = max(xs) - min(xs), max(ys) - min(ys)
    side = max(width, height) + 2 * args.padding
    vx = min(xs) - (side - width) / 2
    vy = min(ys) - (side - height) / 2
    print(f"\nglyph bounds: {width:.2f} x {height:.2f} -> viewBox side {side:.2f}")

    path = "".join(parts)
    print(f"path length: {len(path)} chars\n")
    print(f'<symbol id="icon-bufo" viewBox="{vx:.2f} {vy:.2f} {side:.2f} {side:.2f}" '
          f'fill="currentColor" fill-rule="evenodd">')
    print(f'    <path d="{path}"/>')
    print("  </symbol>")


if __name__ == "__main__":
    main()
