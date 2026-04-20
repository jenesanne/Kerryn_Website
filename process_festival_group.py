"""Process the MecrameFestivalGroup images into the gallery."""

import json
import os
import re

from PIL import Image

BASE = "/Users/jasoncole/Python/Github/Kerryn_Website"
GALLERY_DIR = os.path.join(BASE, "images/gallery")
MANIFEST_PATH = os.path.join(BASE, "gallery_manifest.json")
SRC_BASE = os.path.join(BASE, "images/Macrame/MecrameFestivalGroup")
MAX_SIZE = 800


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def resize_and_save(src_path, out_path):
    img = Image.open(src_path)
    w, h = img.size
    ratio = w / h

    if ratio < 0.55 or ratio > 1.5:
        target_ratio = 3 / 4
        if ratio > 1.5:
            target_ratio = 4 / 3
        if w / h < target_ratio:
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        else:
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        w, h = img.size
        print(f"    ↳ Cropped to {w}x{h} (ratio {ratio:.2f} → {w/h:.2f})")

    if w > h:
        new_w, new_h = MAX_SIZE, int(h * MAX_SIZE / w)
    else:
        new_h, new_w = MAX_SIZE, int(w * MAX_SIZE / h)
    img = img.resize((new_w, new_h), Image.LANCZOS)
    if img.mode == "RGBA":
        bg = Image.new("RGB", img.size, (253, 246, 236))
        bg.paste(img, mask=img.split()[3])
        img = bg
    elif img.mode != "RGB":
        img = img.convert("RGB")
    img.save(out_path, "JPEG", quality=85, optimize=True)
    return new_w, new_h


# Map: (folder, source_filename) -> fun name
NEW_IMAGES = [
    # DesertVibes1 — Black fringe halter body piece
    ("DesertVibes1", "PHOTO-2026-04-20-10-15-04.jpg", "Midnight Fringe Frenzy"),
    ("DesertVibes1", "PHOTO-2026-04-20-10-15-04 2.jpg", "Sunset Slay and Fray"),
    # DesertVibes2 — Natural/beige diamond-pattern halter dress
    ("DesertVibes2", "PHOTO-2026-04-20-10-15-04 3.jpg", "Desert Diamond Delirium"),
    ("DesertVibes2", "PHOTO-2026-04-20-10-15-05 3.jpg", "Knot My First Rodeo"),
    ("DesertVibes2", "PHOTO-2026-04-20-10-16-58.jpg", "Sahara Knot Couture"),
    ("DesertVibes2", "PHOTO-2026-04-20-10-16-59.jpg", "Dune Drape Drama"),
    # DesertVibes3 — Teal/petrol blue choker body piece
    ("DesertVibes3", "PHOTO-2026-04-20-10-15-05 2.jpg", "Teal the Deal Breaker"),
    ("DesertVibes3", "PHOTO-2026-04-20-10-15-05.jpg", "Ocean Knot Overdose"),
]

# Load existing manifest
with open(MANIFEST_PATH) as f:
    manifest = json.load(f)

print(f"📋 Existing manifest: {len(manifest)} items")
print(f"\n📂 Processing MecrameFestivalGroup ({len(NEW_IMAGES)} images)\n")

for folder, src_fname, name in NEW_IMAGES:
    out_name = f"macrame-{slugify(name)}.jpg"
    src = os.path.join(SRC_BASE, folder, src_fname)
    out = os.path.join(GALLERY_DIR, out_name)

    w, h = resize_and_save(src, out)
    manifest.append(
        {
            "category": "Macramé",
            "category_slug": "macrame",
            "name": name,
            "filename": out_name,
            "type": "macrame",
        }
    )
    print(f"  ✅ {name:30s} -> {out_name} ({w}x{h})")

# Save updated manifest
with open(MANIFEST_PATH, "w") as f:
    json.dump(manifest, f, indent=2)

print(f"\n✅ Done! Manifest now has {len(manifest)} items.")
