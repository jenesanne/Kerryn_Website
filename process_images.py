import json
import re
from pathlib import Path

from PIL import Image

BASE_DIR = Path(__file__).resolve().parent
CROCHET_DIR = BASE_DIR / "images" / "Raw_Products" / "Labelled_Crochet_Cardis"
MACRAME_DIR = BASE_DIR / "images" / "Raw_Products" / "Macrame_Images"
GALLERY_DIR = BASE_DIR / "images" / "gallery"
GALLERY_DIR.mkdir(exist_ok=True)

MAX_SIZE = 800

# Profanity censoring for display names
CENSOR_MAP = {
    "Fuckery": "F**kery",
    "Fuck": "F**k",
}


def censor(name):
    for word, replacement in CENSOR_MAP.items():
        name = re.sub(re.escape(word), replacement, name, flags=re.IGNORECASE)
    return name


def slugify(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")


def resize_and_save(src_path, out_path):
    img = Image.open(src_path)
    w, h = img.size
    ratio = w / h

    # Detect screenshots / extreme aspect ratios and center-crop to 3:4
    # before resizing so they display well in the square gallery grid
    if ratio < 0.55 or ratio > 1.5:
        target_ratio = 3 / 4  # portrait-friendly crop
        if ratio > 1.5:
            # Very wide image — crop to 4:3 landscape
            target_ratio = 4 / 3
        if w / h < target_ratio:
            # Too tall — crop height
            new_h = int(w / target_ratio)
            top = (h - new_h) // 2
            img = img.crop((0, top, w, top + new_h))
        else:
            # Too wide — crop width
            new_w = int(h * target_ratio)
            left = (w - new_w) // 2
            img = img.crop((left, 0, left + new_w, h))
        w, h = img.size
        print(f"    ↳ Cropped screenshot to {w}x{h} (ratio {ratio:.2f} → {w/h:.2f})")

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


if not CROCHET_DIR.exists() or not MACRAME_DIR.exists():
    raise FileNotFoundError(
        "Expected raw image directories were not found. Check the repository structure."
    )

# ── Crochet subfolders ──
crochet_categories = sorted(
    [d for d in CROCHET_DIR.iterdir() if d.is_dir() and not d.name.startswith(".")]
)

manifest = []  # [{category, category_slug, name, display_name, filename, type}]
counter = 0

for cat in crochet_categories:
    cat_path = cat
    images = sorted(
        [
            f
            for f in cat_path.iterdir()
            if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png"}
        ]
    )
    print(f"\n📂 {cat.name} ({len(images)} images)")
    for image_path in images:
        counter += 1
        name = image_path.stem
        display_name = censor(name)
        out_name = f"{slugify(cat.name)}-{slugify(name)}.jpg"
        out_path = GALLERY_DIR / out_name
        w, h = resize_and_save(image_path, out_path)
        manifest.append(
            {
                "category": cat.name,
                "category_slug": slugify(cat.name),
                "name": display_name,
                "filename": out_name,
                "type": "crochet",
            }
        )
        print(f"  {counter:02d}. {display_name:40s} -> {out_name} ({w}x{h})")

# ── Macramé ──
macrame_images = sorted(
    [
        f
        for f in MACRAME_DIR.iterdir()
        if f.is_file() and f.suffix.lower() in {".jpg", ".jpeg", ".png"}
    ]
)

print(f"\n📂 Macramé ({len(macrame_images)} images)")
for image_path in macrame_images:
    counter += 1
    name = image_path.stem
    display_name = censor(name)
    out_name = f"macrame-{slugify(name)}.jpg"
    out_path = GALLERY_DIR / out_name
    w, h = resize_and_save(image_path, out_path)
    manifest.append(
        {
            "category": "Macramé",
            "category_slug": "macrame",
            "name": display_name,
            "filename": out_name,
            "type": "macrame",
        }
    )
    print(f"  {counter:02d}. {display_name:40s} -> {out_name} ({w}x{h})")

# Save manifest for HTML generation
manifest_path = BASE_DIR / "gallery_manifest.json"
with manifest_path.open("w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print(f"\n✅ Done! {counter} images processed to images/gallery/")
print("📋 Manifest saved to gallery_manifest.json")
