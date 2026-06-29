"""
Restore predio-panoramica to vertical orientation (user said it was rotated wrong)
and process new bread image with max quality (multi-format).
"""
from PIL import Image, ImageOps
import os

PUBLIC = "/home/z/my-project/public/images"
UPLOADS = "/home/z/my-project/upload"

# ============================================================
# 1. RESTORE predio-panoramica to VERTICAL (original orientation)
# ============================================================
print("=" * 60)
print("1. RESTORING predio-panoramica to vertical")
print("=" * 60)

predio_src = os.path.join(UPLOADS, "WhatsApp Image 2026-06-29 at 5.06.03 PM (3).jpeg")
img = Image.open(predio_src)
img = ImageOps.exif_transpose(img)
print(f"Original: {img.size} (no rotation)")

# Save as vertical (original orientation) with max quality
# WebP lossless
img.convert("RGB").save(f"{PUBLIC}/predio-panoramica.webp", "WEBP", lossless=True, quality=100, method=6)
print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/predio-panoramica.webp')//1024} KB")
# JPG q95
img.convert("RGB").save(f"{PUBLIC}/predio-panoramica.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
print(f"  JPG q95: {os.path.getsize(PUBLIC + '/predio-panoramica.jpg')//1024} KB")

# ============================================================
# 2. PROCESS new bread image with max quality (multi-format)
# ============================================================
print("\n" + "=" * 60)
print("2. PROCESSING new bread image")
print("=" * 60)

bread_src = os.path.join(UPLOADS, "ChatGPT Image 30 jun 2026, 04_07_27 p.m..png")
bread = Image.open(bread_src)
bread = ImageOps.exif_transpose(bread).convert("RGB")
print(f"Original: {bread.size}")

# Save in multiple formats with max quality
# WebP lossless (best quality)
bread.save(f"{PUBLIC}/panes-postres.webp", "WEBP", lossless=True, quality=100, method=6)
print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/panes-postres.webp')//1024} KB")

# AVIF (modern format)
try:
    bread.save(f"{PUBLIC}/panes-postres.avif", "AVIF", quality=95, method=6)
    print(f"  AVIF q95: {os.path.getsize(PUBLIC + '/panes-postres.avif')//1024} KB")
except Exception as e:
    print(f"  AVIF failed: {e}")

# JPG q95 4:4:4 (fallback)
bread.save(f"{PUBLIC}/panes-postres.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
print(f"  JPG q95 (4:4:4): {os.path.getsize(PUBLIC + '/panes-postres.jpg')//1024} KB")

print("\n✅ Done!")
