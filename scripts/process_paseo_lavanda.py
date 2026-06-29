"""
Process the new 'mujer en campo de lavanda' photo for the Postales de MAMU gallery.
- Original: 1024x1820 PNG RGBA (vertical)
- Save in 3 formats: WebP lossless + AVIF q95 + JPG q95 4:4:4
"""
from PIL import Image, ImageOps
import os

SRC = "/home/z/my-project/upload/7-1-7946a65fa776bdee4517667532903992-1024-1024.png"
PUBLIC = "/home/z/my-project/public/images"
OUT_NAME = "paseo-lavanda"

img = Image.open(SRC)
img = ImageOps.exif_transpose(img).convert("RGB")
print(f"Original: {img.size}")

# WebP lossless
img.save(f"{PUBLIC}/{OUT_NAME}.webp", "WEBP", lossless=True, quality=100, method=6)
print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/' + OUT_NAME + '.webp')//1024} KB")

# AVIF
try:
    img.save(f"{PUBLIC}/{OUT_NAME}.avif", "AVIF", quality=95, method=6)
    print(f"  AVIF q95: {os.path.getsize(PUBLIC + '/' + OUT_NAME + '.avif')//1024} KB")
except Exception as e:
    print(f"  AVIF failed: {e}")

# JPG q95 4:4:4
img.save(f"{PUBLIC}/{OUT_NAME}.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
print(f"  JPG q95 (4:4:4): {os.path.getsize(PUBLIC + '/' + OUT_NAME + '.jpg')//1024} KB")

print(f"\n✅ Saved as: {OUT_NAME}.jpg/.webp/.avif")
