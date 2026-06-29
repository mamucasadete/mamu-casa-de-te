"""
Process two images with CORRECT mapping:
- 04_42_09 p.m..png = VISTA AÉREA de paisaje rural -> crop to vertical 4/5 -> panoramica-rural
- 04_37_06 p.m..png = PATIO NOCTURNO con mesas y luces -> keep as is -> patio-nocturno
"""
from PIL import Image, ImageOps
import os

PUBLIC = "/home/z/my-project/public/images"
UPLOADS = "/home/z/my-project/upload"

def save_multi_format(img, name):
    img = img.convert("RGB")
    img.save(f"{PUBLIC}/{name}.webp", "WEBP", lossless=True, quality=100, method=6)
    print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/' + name + '.webp')//1024} KB")
    try:
        img.save(f"{PUBLIC}/{name}.avif", "AVIF", quality=95, method=6)
        print(f"  AVIF q95: {os.path.getsize(PUBLIC + '/' + name + '.avif')//1024} KB")
    except Exception as e:
        print(f"  AVIF failed: {e}")
    img.save(f"{PUBLIC}/{name}.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
    print(f"  JPG q95 (4:4:4): {os.path.getsize(PUBLIC + '/' + name + '.jpg')//1024} KB")

# ============================================================
# 1. PANORÁMICA RURAL (from 04_42_09) -> crop to vertical 4/5
# ============================================================
print("=" * 60)
print("1. PANORÁMICA RURAL (from 04_42_09) -> vertical 4/5")
print("=" * 60)

img1 = Image.open(os.path.join(UPLOADS, "ChatGPT Image 30 jun 2026, 04_42_09 p.m..png"))
img1 = ImageOps.exif_transpose(img1).convert("RGB")
print(f"Original: {img1.size}")

# Crop to vertical 4/5 aspect (width:height = 4:5)
target_ratio = 4 / 5
current_ratio = img1.width / img1.height

if current_ratio > target_ratio:
    new_width = int(img1.height * target_ratio)
    left = (img1.width - new_width) // 2
    img1_cropped = img1.crop((left, 0, left + new_width, img1.height))
else:
    new_height = int(img1.width / target_ratio)
    top = (img1.height - new_height) // 2
    img1_cropped = img1.crop((0, top, img1.width, top + new_height))

print(f"Cropped to: {img1_cropped.size} (4/5 vertical)")
save_multi_format(img1_cropped, "panoramica-rural")

# ============================================================
# 2. PATIO NOCTURNO (from 04_37_06) -> keep vertical
# ============================================================
print("\n" + "=" * 60)
print("2. PATIO NOCTURNO (from 04_37_06) -> keep as is")
print("=" * 60)

img2 = Image.open(os.path.join(UPLOADS, "ChatGPT Image 30 jun 2026, 04_37_06 p.m..png"))
img2 = ImageOps.exif_transpose(img2).convert("RGB")
print(f"Original: {img2.size}")
save_multi_format(img2, "patio-nocturno")

print("\n✅ Both images processed correctly!")
