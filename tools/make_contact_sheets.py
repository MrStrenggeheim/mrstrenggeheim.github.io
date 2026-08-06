#!/usr/bin/env python3
"""
Render labelled contact sheets of every bufo that still has no tags, so they
can be reviewed visually in batches and tagged.

Writes sheet-NN.png plus sheets.json (sheet -> cell index -> bufo id) into the
chosen output directory.

Usage:
    python tools/make_contact_sheets.py --out /tmp/bufo-sheets [--per-sheet 48]
"""

import argparse
import json
from pathlib import Path

from PIL import Image, ImageDraw

REPO = Path(__file__).resolve().parent.parent
CATALOG = REPO / "assets" / "bufo" / "catalog.json"
THUMB_DIR = REPO / "assets" / "bufo" / "thumb"

CELL = 104
LABEL_H = 22
PAD = 4
BG = (154, 154, 154)          # mid grey so white and dark bufos both read
GRID = (120, 120, 120)
TEXT = (20, 20, 20)


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--out", required=True, type=Path)
    ap.add_argument("--per-sheet", type=int, default=48)
    ap.add_argument("--columns", type=int, default=8)
    args = ap.parse_args()

    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    extensions = catalog["extensions"]

    untagged = []
    for row in catalog["bufos"]:
        tags = [catalog["tags"][i] for i in row[5]]
        meaningful = [t for t in tags if t != "animated"]
        if not meaningful:
            untagged.append((row[0], extensions[row[1]]))

    print(f"{len(untagged)} bufos without tags")
    args.out.mkdir(parents=True, exist_ok=True)

    cols = args.columns
    rows = (args.per_sheet + cols - 1) // cols
    sheet_w = cols * (CELL + PAD) + PAD
    sheet_h = rows * (CELL + LABEL_H + PAD) + PAD

    index = {}
    for sheet_no, start in enumerate(range(0, len(untagged), args.per_sheet), 1):
        batch = untagged[start:start + args.per_sheet]
        sheet = Image.new("RGB", (sheet_w, sheet_h), BG)
        draw = ImageDraw.Draw(sheet)
        mapping = {}

        for cell, (bufo_id, ext) in enumerate(batch):
            col = cell % cols
            row = cell // cols
            x = PAD + col * (CELL + PAD)
            y = PAD + row * (CELL + LABEL_H + PAD)

            draw.rectangle([x, y, x + CELL, y + CELL], outline=GRID)
            thumb_path = THUMB_DIR / f"{bufo_id}-{ext}.webp"
            if thumb_path.exists():
                with Image.open(thumb_path) as im:
                    im = im.convert("RGBA")
                    im.thumbnail((CELL - 8, CELL - 8), Image.LANCZOS)
                    sheet.paste(
                        im,
                        (x + (CELL - im.width) // 2, y + (CELL - im.height) // 2),
                        im,
                    )

            draw.text((x + 2, y + CELL + 4), str(cell), fill=TEXT)
            mapping[str(cell)] = bufo_id

        path = args.out / f"sheet-{sheet_no:02d}.png"
        sheet.save(path)
        index[path.name] = mapping
        print(f"  {path.name}: {len(batch)} bufos")

    (args.out / "sheets.json").write_text(
        json.dumps(index, indent=1, ensure_ascii=False), encoding="utf-8"
    )
    print(f"\n✅ {len(index)} sheets -> {args.out}")


if __name__ == "__main__":
    main()
