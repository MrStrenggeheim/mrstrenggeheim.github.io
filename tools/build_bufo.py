#!/usr/bin/env python3
"""
Bufo catalog pipeline.

Vendors the all-the-bufo collection into assets/bufo/, generates WebP
thumbnails and builds the search catalog consumed by /bufo/.

This runs OFFLINE and its output is committed. The GitHub Actions workflow
does not install Pillow, so build.py never touches image processing.

Usage:
    python tools/build_bufo.py --source /path/to/all-the-bufo/all-the-bufo \
                               --tags   /path/to/bufo-data.json
"""

import argparse
import json
import re
import shutil
import unicodedata
from pathlib import Path

from PIL import Image

REPO = Path(__file__).resolve().parent.parent
OUT_DIR = REPO / "assets" / "bufo"
FULL_DIR = OUT_DIR / "full"
THUMB_DIR = OUT_DIR / "thumb"
CATALOG = OUT_DIR / "catalog.json"
GENERATED_TAGS = OUT_DIR / "tags-generated.json"

THUMB_SIZE = 128
THUMB_QUALITY = 82
ANIM_QUALITY = 70
# Long animations blow up the thumbnail for no visible gain in a 100px cell.
MAX_ANIM_FRAMES = 80

EXT_CODES = {".png": 0, ".gif": 1, ".jpg": 2, ".jpeg": 2}
EXT_NAMES = ["png", "gif", "jpg"]

# Words that carry no search signal once you are already searching bufos.
STOPWORDS = {
    "bufo", "bufos", "froge", "frog", "the", "a", "an", "of", "is", "are",
    "to", "and", "in", "on", "it", "its", "with", "for", "you", "your",
}

# Query term -> canonical tags. Covers English phrasings the tag vocabulary
# does not use verbatim, plus German equivalents.
SYNONYMS = {
    # --- English ---
    "approval": ["approve", "agree", "like"],
    "yes": ["approve", "agree"],
    "ok": ["approve", "acknowledgement"],
    "okay": ["approve", "acknowledgement"],
    "thumbsup": ["approve", "like"],
    "no": ["disagree", "dislike"],
    "nope": ["disagree", "dislike"],
    "reject": ["disagree", "dislike"],
    "thanks": ["gratitude"],
    "thank": ["gratitude"],
    "thankyou": ["gratitude"],
    "please": ["plead", "request"],
    "sorry": ["sad", "plead"],
    "hello": ["greetings", "arrival"],
    "hi": ["greetings"],
    "hey": ["greetings"],
    "welcome": ["greetings", "arrival"],
    "bye": ["farewell"],
    "goodbye": ["farewell"],
    "leaving": ["farewell"],
    "glad": ["happy"],
    "joy": ["happy", "excited"],
    "smile": ["happy"],
    "sadness": ["sad", "cry"],
    "crying": ["cry", "sad"],
    "tears": ["cry"],
    "depressed": ["sad"],
    "mad": ["angry", "anger", "rage"],
    "furious": ["rage", "anger"],
    "annoyed": ["upset", "angry"],
    "worried": ["worry", "anxiety", "concerned"],
    "concerned": ["worry", "anxiety", "discomfort"],
    "concern": ["worry", "anxiety"],
    "nervous": ["anxiety", "worry"],
    "scared": ["horror", "panic", "anxiety"],
    "afraid": ["horror", "panic"],
    "fear": ["horror", "panic", "anxiety"],
    "confusion": ["confused", "unsure"],
    "what": ["confused", "disbelief"],
    "huh": ["confused", "unsure"],
    "doubt": ["skepticism", "unsure"],
    "suspicious": ["sus", "skepticism"],
    "party": ["celebration", "dance"],
    "celebrate": ["celebration"],
    "congrats": ["celebration", "acknowledgement"],
    "congratulations": ["celebration"],
    "dancing": ["dance"],
    "laughing": ["laugh"],
    "lol": ["laugh"],
    "funny": ["laugh", "meme"],
    "heart": ["love", "like"],
    "hug": ["love", "cozy"],
    "sleepy": ["tired", "cozy"],
    "sleep": ["tired"],
    "exhausted": ["tired"],
    "eating": ["food"],
    "eat": ["food"],
    "hungry": ["food"],
    "coffee": ["drink"],
    "beer": ["drink"],
    "tea": ["drink", "boba"],
    "work": ["profession"],
    "job": ["profession"],
    "code": ["hacker", "software-reference"],
    "coding": ["hacker", "software-reference"],
    "computer": ["hacker", "software-reference", "ui"],
    "dev": ["hacker", "software-reference"],
    "cash": ["money", "stonks"],
    "rich": ["money", "stonks"],
    "wow": ["shock", "disbelief"],
    "omg": ["shock", "disbelief"],
    "surprised": ["shock"],
    "shocked": ["shock"],
    "help": ["emergency", "plead", "panic"],
    "sos": ["emergency", "panic"],
    "urgent": ["emergency"],
    "cheer": ["encouragement", "celebration"],
    "support": ["encouragement"],
    "goodluck": ["encouragement"],
    "getwell": ["feel-better"],
    "sick": ["feel-better", "covid"],
    "think": ["thinks-about", "smart"],
    "thinking": ["thinks-about"],
    "idea": ["smart", "thinks-about"],
    "clever": ["smart"],
    "stare": ["blank-stare", "judging"],
    "staring": ["blank-stare", "judging"],
    "judge": ["judging"],
    "side-eye": ["judging", "skepticism"],
    "cringe": ["awkward", "discomfort"],
    "uncomfortable": ["discomfort", "awkward"],
    "creepy": ["cursed", "horror", "evil"],
    "weird": ["cursed", "je-ne-sais-quoi"],
    "cute": ["cute", "baby"],
    "wholesome": ["cute", "love"],
    "warm": ["cozy"],
    "xmas": ["christmas", "holiday"],
    "santa": ["christmas"],
    "game": ["pokemon", "mario", "reference"],
    "gaming": ["pokemon", "mario", "reference"],
    "fat": ["chonker"],
    "big": ["chonker"],
    "stonk": ["stonks", "money"],
    "gif": ["animated"],
    "moving": ["animated"],
    # --- German ---
    "gluecklich": ["happy"],
    "glücklich": ["happy"],
    "freude": ["happy", "excited"],
    "froh": ["happy"],
    "lachen": ["laugh"],
    "traurig": ["sad", "cry"],
    "weinen": ["cry"],
    "wuetend": ["angry", "anger", "rage"],
    "wütend": ["angry", "anger", "rage"],
    "sauer": ["angry", "upset"],
    "aerger": ["anger", "upset"],
    "ärger": ["anger", "upset"],
    "besorgt": ["worry", "anxiety"],
    "sorge": ["worry", "anxiety"],
    "angst": ["anxiety", "horror", "panic"],
    "verwirrt": ["confused", "unsure"],
    "unsicher": ["unsure", "skepticism"],
    "zweifel": ["skepticism", "unsure"],
    "zustimmen": ["approve", "agree"],
    "zustimmung": ["approve", "agree"],
    "einverstanden": ["agree", "approve"],
    "ablehnen": ["disagree", "dislike"],
    "danke": ["gratitude"],
    "dankeschoen": ["gratitude"],
    "bitte": ["plead", "request"],
    "hallo": ["greetings"],
    "tschuess": ["farewell"],
    "tschüss": ["farewell"],
    "feiern": ["celebration", "dance"],
    "party": ["celebration", "dance"],
    "tanzen": ["dance"],
    "liebe": ["love"],
    "herz": ["love"],
    "muede": ["tired"],
    "müde": ["tired"],
    "schlafen": ["tired"],
    "essen": ["food"],
    "trinken": ["drink"],
    "geld": ["money", "stonks"],
    "arbeit": ["profession"],
    "hilfe": ["emergency", "plead"],
    "schock": ["shock", "disbelief"],
    "ueberrascht": ["shock"],
    "überrascht": ["shock"],
    "suess": ["cute"],
    "süß": ["cute"],
    "denken": ["thinks-about", "smart"],
    "peinlich": ["awkward", "discomfort"],
    "gruselig": ["cursed", "horror"],
    "weihnachten": ["christmas", "holiday"],
    "geburtstag": ["birthday"],
    "kaempfen": ["fight"],
    "kämpfen": ["fight"],
    "beten": ["pray", "religion"],
    "krank": ["feel-better"],
}


def norm_id(text: str) -> str:
    """Unicode-normalise an id so NFC/NFD spellings collapse together."""
    return unicodedata.normalize("NFC", text).strip().lower()


def humanise(stem: str) -> str:
    return re.sub(r"[-_]+", " ", stem).strip()


def tokenise(stem: str) -> list[str]:
    words = re.split(r"[-_\s]+", stem.lower())
    out = []
    for w in words:
        w = re.sub(r"[^a-z0-9äöüß]", "", w)
        if w and w not in STOPWORDS and not w.isdigit() and len(w) > 1:
            out.append(w)
    return list(dict.fromkeys(out))


def load_source_tags(path: Path) -> dict[str, list[str]]:
    data = json.loads(path.read_text(encoding="utf-8"))
    return {norm_id(b["id"]): b.get("tags", []) for b in data["bufos"]}


def load_generated_tags() -> dict[str, list[str]]:
    """Optional reviewable tag file produced by the vision pass."""
    if not GENERATED_TAGS.exists():
        return {}
    data = json.loads(GENERATED_TAGS.read_text(encoding="utf-8"))
    return {norm_id(k): v for k, v in data.get("tags", {}).items()}


def _target_size(width: int, height: int) -> tuple[int, int]:
    scale = min(THUMB_SIZE / width, THUMB_SIZE / height, 1.0)
    return max(1, round(width * scale)), max(1, round(height * scale))


def make_thumb(src: Path, dst: Path) -> tuple[int, int, bool]:
    """
    Write a WebP thumbnail. Animated sources become animated WebP so the grid
    plays them directly. Returns (width, height, is_animated) of the source.
    """
    dst.parent.mkdir(parents=True, exist_ok=True)

    with Image.open(src) as im:
        animated = getattr(im, "n_frames", 1) > 1
        width, height = im.size
        target = _target_size(width, height)

        if not animated:
            frame = im.convert("RGBA").resize(target, Image.LANCZOS)
            frame.save(dst, "WEBP", quality=THUMB_QUALITY, method=6)
            return width, height, False

        # Seeking forward lets Pillow composite GIF disposal for us, so each
        # frame arrives fully painted rather than as a partial diff.
        step = max(1, im.n_frames // MAX_ANIM_FRAMES)
        frames, durations = [], []
        for i in range(0, im.n_frames, step):
            im.seek(i)
            frames.append(im.convert("RGBA").resize(target, Image.LANCZOS))
            # Browsers clamp very short frame delays; keep them sane.
            durations.append(max(int(im.info.get("duration", 80)) * step, 20))

        frames[0].save(
            dst,
            "WEBP",
            save_all=True,
            append_images=frames[1:],
            duration=durations,
            loop=0,
            quality=ANIM_QUALITY,
            method=4,
        )

    return width, height, True


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--source", required=True, type=Path,
                    help="directory holding the original bufo files")
    ap.add_argument("--tags", required=True, type=Path,
                    help="bufo.fun bufo-data.json")
    ap.add_argument("--skip-existing", action="store_true",
                    help="do not regenerate thumbnails that already exist")
    args = ap.parse_args()

    source_tags = load_source_tags(args.tags)
    vocabulary = sorted(
        set(json.loads(args.tags.read_text(encoding="utf-8"))["tags"])
    )
    generated = load_generated_tags()

    files = sorted(
        p for p in args.source.iterdir()
        if p.suffix.lower() in EXT_CODES and p.is_file()
    )
    print(f"📦 {len(files)} source files")

    FULL_DIR.mkdir(parents=True, exist_ok=True)
    THUMB_DIR.mkdir(parents=True, exist_ok=True)

    tag_index = {t: i for i, t in enumerate(vocabulary)}
    entries = []
    stats = {"animated": 0, "tagged": 0, "generated": 0, "untagged": 0, "failed": 0}

    for n, src in enumerate(files, 1):
        stem = norm_id(src.stem)
        ext = ".jpg" if src.suffix.lower() == ".jpeg" else src.suffix.lower()
        # A handful of motifs ship as both .png and .gif, so the thumbnail
        # name has to carry the extension or the pair collides.
        dest_full = FULL_DIR / f"{stem}{ext}"
        dest_thumb = THUMB_DIR / f"{stem}-{EXT_NAMES[EXT_CODES[ext]]}.webp"

        try:
            if not (args.skip_existing and dest_thumb.exists()):
                width, height, animated = make_thumb(src, dest_thumb)
            else:
                with Image.open(src) as im:
                    width, height = im.size
                    animated = getattr(im, "n_frames", 1) > 1
        except Exception as exc:  # corrupt or unsupported file
            print(f"  ⚠️  {src.name}: {exc}")
            stats["failed"] += 1
            continue

        if not dest_full.exists() or dest_full.stat().st_size != src.stat().st_size:
            shutil.copy2(src, dest_full)

        tags = source_tags.get(stem) or []
        if tags:
            stats["tagged"] += 1
        elif generated.get(stem):
            tags = generated[stem]
            stats["generated"] += 1
        else:
            stats["untagged"] += 1

        # "animated" is a real tag in the vocabulary; keep it truthful.
        if animated and "animated" not in tags:
            tags = tags + ["animated"]
        if animated:
            stats["animated"] += 1

        tag_ids = sorted({tag_index[t] for t in tags if t in tag_index})

        entries.append([
            stem,
            EXT_CODES[ext],
            1 if animated else 0,
            width,
            height,
            tag_ids,
            tokenise(stem),
        ])

        if n % 250 == 0:
            print(f"  … {n}/{len(files)}")

    # Only ship synonyms that actually resolve to a known tag.
    synonyms = {
        term: [t for t in targets if t in tag_index]
        for term, targets in SYNONYMS.items()
    }
    synonyms = {k: v for k, v in synonyms.items() if v}

    catalog = {
        "version": 1,
        "count": len(entries),
        "extensions": EXT_NAMES,
        "tags": vocabulary,
        "synonyms": synonyms,
        "bufos": entries,
    }
    CATALOG.parent.mkdir(parents=True, exist_ok=True)
    CATALOG.write_text(
        json.dumps(catalog, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )

    size_kb = CATALOG.stat().st_size / 1024
    print(f"\n✅ catalog.json  {len(entries)} bufos, {size_kb:.0f} KB")
    print(f"   animated: {stats['animated']}   static: {len(entries) - stats['animated']}")
    print(f"   tags from bufo.fun: {stats['tagged']}")
    print(f"   tags generated:     {stats['generated']}")
    print(f"   still untagged:     {stats['untagged']}")
    if stats["failed"]:
        print(f"   ⚠️ failed: {stats['failed']}")


if __name__ == "__main__":
    main()
