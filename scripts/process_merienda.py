"""
Process the new 'merienda' photo (tea + bread) with maximum quality.
Generate WebP lossless, AVIF q95, JPG q95 4:4:4.
"""
from PIL import Image, ImageOps
import os

SRC = "/home/z/my-project/upload/ChatGPT Image 30 jun 2026, 04_12_32 p.m..png"
PUBLIC = "/home/z/my-project/public/images"
OUT_NAME = "merienda-campo"

img = Image.open(SRC)
img = ImageOps.exif_transpose(img).convert("RGB")
print(f"Original: {img.size}")

# WebP lossless
img.save(f"{PUBLIC}/{OUT_NAME}.webp", "WEBP", lossless=True, quality=100, method=6)
print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/' + OUT_NAME + '.webp')//1024} KB")

# AVIF q95
try:
    img.save(f"{PUBLIC}/{OUT_NAME}.avif", "AVIF", quality=95, method=6)
    print(f"  AVIF q95: {os.path.getsize(PUBLIC + '/' + OUT_NAME + '.avif')//1024} KB")
except Exception as e:
    print(f"  AVIF failed: {e}")

# JPG q95 4:4:4
img.save(f"{PUBLIC}/{OUT_NAME}.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
print(f"  JPG q95 (4:4:4): {os.path.getsize(PUBLIC + '/' + OUT_NAME + '.jpg')//1024} KB")

print(f"\n✅ Saved as: {OUT_NAME}.jpg/.webp/.avif")
