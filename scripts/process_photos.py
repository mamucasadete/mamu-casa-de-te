"""
Copy and optimize the 4 user-provided photos for the website.
- Resize to web-appropriate sizes
- Save with descriptive names
- The "predio" photo is portrait orientation but contains a panoramic landscape
  when rotated 90° (user took it vertically). We rotate it to make it a true horizontal panorama.
"""
from PIL import Image, ImageOps
import os

UPLOADS = "/home/z/my-project/upload"
PUBLIC = "/home/z/my-project/public/images"

# Mapping: source -> (output name, max width, quality, rotate_deg)
PHOTOS = [
    # Predio: original is 900x1600 (portrait), but content is a panoramic landscape -> rotate -90 to make it horizontal
    ("WhatsApp Image 2026-06-29 at 5.06.03 PM (3).jpeg", "predio-panoramica.jpg", 1920, 85, -90),
    ("WhatsApp Image 2026-06-29 at 5.06.03 PM (1).jpeg", "waffle-lavanda.jpg", 1200, 88, 0),
    ("WhatsApp Image 2026-06-29 at 5.06.03 PM (2).jpeg", "ramo-lavandas.jpg", 1200, 88, 0),
    ("WhatsApp Image 2026-06-29 at 5.06.03 PM.jpeg", "taza-te.jpg", 1200, 88, 0),
]

for src_name, out_name, max_w, quality, rotate_deg in PHOTOS:
    src = os.path.join(UPLOADS, src_name)
    out = os.path.join(PUBLIC, out_name)
    img = Image.open(src)
    img = ImageOps.exif_transpose(img)  # Fix EXIF orientation
    print(f"\n{src_name}: original {img.size} {img.format}")

    # Rotate if needed
    if rotate_deg != 0:
        img = img.rotate(rotate_deg, expand=True)
        print(f"  Rotated {rotate_deg}° -> {img.size}")

    # Convert to RGB if needed
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Resize if wider than max_w (maintain aspect)
    if img.width > max_w:
        new_h = int(img.height * max_w / img.width)
        img = img.resize((max_w, new_h), Image.LANCZOS)
        print(f"  Resized to {img.size}")

    # Save as JPEG with quality
    img.save(out, "JPEG", quality=quality, optimize=True, progressive=True)
    size_kb = os.path.getsize(out) / 1024
    print(f"  Saved: {out} ({size_kb:.1f} KB)")

print("\n✅ All photos processed")

