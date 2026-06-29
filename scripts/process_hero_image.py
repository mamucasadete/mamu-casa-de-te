"""
Generate multiple formats and resolutions of the hero image for maximum quality.

Strategy:
1. WebP lossless — maximum quality, no artifacts (2264 KB) — primary source
2. WebP q100 — near-lossless (985 KB) — fallback
3. AVIF — modern format, excellent quality/size ratio
4. PNG optimized — universal fallback (3102 KB)
5. Multiple resolutions for srcset (responsive):
   - 1x: 1448 (original width)
   - 2x: 2896 (retina, upscaled with high-quality LANCZOS)
"""
from PIL import Image, ImageOps
import os

SRC = "/home/z/my-project/upload/ChatGPT Image 30 jun 2026, 03_31_15 p.m..png"
PUBLIC = "/home/z/my-project/public/images"

# Open and prepare
img = Image.open(SRC)
img = ImageOps.exif_transpose(img)
img = img.convert("RGB")
print(f"Original: {img.size}")

# Save original-size versions in multiple formats
# 1. WebP lossless (best quality)
img.save(f"{PUBLIC}/hero-campo-lavanda.webp", "WEBP", lossless=True, quality=100, method=6)
print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/hero-campo-lavanda.webp')//1024} KB")

# 2. AVIF (modern, excellent compression)
try:
    img.save(f"{PUBLIC}/hero-campo-lavanda.avif", "AVIF", quality=95, method=6)
    print(f"  AVIF q95: {os.path.getsize(PUBLIC + '/hero-campo-lavanda.avif')//1024} KB")
except Exception as e:
    print(f"  AVIF failed: {e}")

# 3. JPG q95 (universal fallback, no chroma subsampling)
img.save(f"{PUBLIC}/hero-campo-lavanda.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
print(f"  JPG q95 (4:4:4): {os.path.getsize(PUBLIC + '/hero-campo-lavanda.jpg')//1024} KB")

# 4. Generate 2x resolution for Retina displays (upscale with high quality)
retina_w = img.width * 2
retina_h = img.height * 2
retina_img = img.resize((retina_w, retina_h), Image.LANCZOS)
retina_img.save(f"{PUBLIC}/hero-campo-lavanda-2x.webp", "WEBP", quality=92, method=6)
print(f"  WebP 2x (retina): {os.path.getsize(PUBLIC + '/hero-campo-lavanda-2x.webp')//1024} KB")

# 5. Generate mobile-optimized version (smaller for phones)
mobile_w = 800
mobile_h = int(img.height * mobile_w / img.width)
mobile_img = img.resize((mobile_w, mobile_h), Image.LANCZOS)
mobile_img.save(f"{PUBLIC}/hero-campo-lavanda-mobile.webp", "WEBP", quality=90, method=6)
print(f"  WebP mobile: {os.path.getsize(PUBLIC + '/hero-campo-lavanda-mobile.webp')//1024} KB")

print("\n✅ All hero image versions generated")
