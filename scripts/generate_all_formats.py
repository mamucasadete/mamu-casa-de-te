"""
Generate AVIF and WebP versions for ALL existing photos so <picture> works everywhere.
- waffle-lavanda.jpg
- taza-te.jpg
- ramo-lavandas.jpg
- hero-campo-lavanda.jpg (already has them, skip)
- predio-panoramica.jpg (already has them, skip)
- panes-postres.jpg (already has them, skip)
"""
from PIL import Image, ImageOps
import os

PUBLIC = "/home/z/my-project/public/images"

# Photos that need AVIF + WebP versions
PHOTOS = [
    "waffle-lavanda.jpg",
    "taza-te.jpg",
    "ramo-lavandas.jpg",
]

for photo in PHOTOS:
    src = os.path.join(PUBLIC, photo)
    if not os.path.exists(src):
        print(f"  ⚠ {photo} not found, skipping")
        continue

    img = Image.open(src)
    img = ImageOps.exif_transpose(img).convert("RGB")
    print(f"\n{photo}: {img.size}")

    # WebP lossless
    webp_path = src.replace(".jpg", ".webp")
    img.save(webp_path, "WEBP", lossless=True, quality=100, method=6)
    print(f"  WebP lossless: {os.path.getsize(webp_path)//1024} KB")

    # AVIF
    avif_path = src.replace(".jpg", ".avif")
    try:
        img.save(avif_path, "AVIF", quality=95, method=6)
        print(f"  AVIF q95: {os.path.getsize(avif_path)//1024} KB")
    except Exception as e:
        print(f"  AVIF failed: {e}")

print("\n✅ All formats generated")
