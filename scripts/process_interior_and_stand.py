"""
Process 3 new images:
1. Calmayo gastronomico.webp (1080x1080 square) -> stand photo for Eventos card 2
2. Gemini_Generated_Image_ryzwzdryzwzdryzw.png (2752x1536) -> interior 1 for Galería
3. Gemini_Generated_Image_kaiamakaiamakaia.png (2752x1536) -> interior 2 for Galería

Save in 3 formats: WebP lossless + AVIF q95 + JPG q95 4:4:4
Resize large interior photos to ~1600px wide for web performance.
"""
from PIL import Image, ImageOps
import os

PUBLIC = "/home/z/my-project/public/images"
UPLOADS = "/home/z/my-project/upload"

def save_multi_format(img, name, max_width=1600):
    """Save image in 3 formats with max quality. Resize if wider than max_width."""
    img = ImageOps.exif_transpose(img).convert("RGB")
    # Resize if too wide (for web performance)
    if img.width > max_width:
        new_h = int(img.height * max_width / img.width)
        img = img.resize((max_width, new_h), Image.LANCZOS)
        print(f"  Resized to: {img.size}")

    # WebP lossless
    img.save(f"{PUBLIC}/{name}.webp", "WEBP", lossless=True, quality=100, method=6)
    print(f"  WebP lossless: {os.path.getsize(PUBLIC + '/' + name + '.webp')//1024} KB")
    # AVIF
    try:
        img.save(f"{PUBLIC}/{name}.avif", "AVIF", quality=95, method=6)
        print(f"  AVIF q95: {os.path.getsize(PUBLIC + '/' + name + '.avif')//1024} KB")
    except Exception as e:
        print(f"  AVIF failed: {e}")
    # JPG q95 4:4:4
    img.save(f"{PUBLIC}/{name}.jpg", "JPEG", quality=95, subsampling=0, optimize=True, progressive=True)
    print(f"  JPG q95 (4:4:4): {os.path.getsize(PUBLIC + '/' + name + '.jpg')//1024} KB")

# 1. Calmayo Gastronómico stand (square, keep size)
print("=" * 60)
print("1. CALMAYO GASTRONÓMICO STAND")
print("=" * 60)
img1 = Image.open(os.path.join(UPLOADS, "Calmayo gastronomico.webp"))
print(f"Original: {img1.size}")
save_multi_format(img1, "calmayo-gastronomico-stand", max_width=1200)

# 2. Interior 1 (large, resize to 1600)
print("\n" + "=" * 60)
print("2. INTERIOR 1 (con estantería)")
print("=" * 60)
img2 = Image.open(os.path.join(UPLOADS, "Gemini_Generated_Image_ryzwzdryzwzdryzw.png"))
print(f"Original: {img2.size}")
save_multi_format(img2, "interior-1", max_width=1600)

# 3. Interior 2 (large, resize to 1600)
print("\n" + "=" * 60)
print("3. INTERIOR 2 (con sofá turquesa)")
print("=" * 60)
img3 = Image.open(os.path.join(UPLOADS, "Gemini_Generated_Image_kaiamakaiamakaia.png"))
print(f"Original: {img3.size}")
save_multi_format(img3, "interior-2", max_width=1600)

print("\n✅ All 3 images processed!")
