"""
Process the MAMU logo:
1. Remove the gray background (make it transparent)
2. Crop to the circular logo
3. Save as PNG with transparency
4. Also create a favicon version
"""
from PIL import Image, ImageDraw
import numpy as np
import os

SRC = "/home/z/my-project/upload/WhatsApp Image 2026-06-29 at 5.08.47 PM.jpeg"
OUT_PNG = "/home/z/my-project/public/images/logo-mamu.png"
OUT_FAVICON = "/home/z/my-project/public/favicon.svg"
OUT_FAVICON_PNG = "/home/z/my-project/public/images/favicon.png"

# Open and convert to RGBA
img = Image.open(SRC).convert("RGBA")
arr = np.array(img)
print(f"Original size: {img.size}")
print(f"Channels: {arr.shape}")

# The background is gray ~#5A5A5A. We'll detect "background-like" pixels.
# Strategy: pixels that are gray (R≈G≈B) AND not pure white (interior of logo) AND not pure black (logo elements).
r, g, b = arr[:, :, 0], arr[:, :, 1], arr[:, :, 2]

# Gray detection: R, G, B all close to each other (within 15 units)
gray_match = (np.abs(r.astype(int) - g.astype(int)) < 15) & \
             (np.abs(g.astype(int) - b.astype(int)) < 15) & \
             (np.abs(r.astype(int) - b.astype(int)) < 15)

# Also: gray values in range ~[40, 200] (exclude pure white = 255 and pure black = 0 which are part of logo)
gray_value_in_range = (r > 30) & (r < 230)

# Final background mask
bg_mask = gray_match & gray_value_in_range
print(f"Background pixels: {bg_mask.sum()} / {bg_mask.size} ({100*bg_mask.sum()/bg_mask.size:.1f}%)")

# Set alpha to 0 where background
alpha = arr[:, :, 3].copy()
alpha[bg_mask] = 0
# For edge pixels (near background), use partial transparency for smoother edges
# Use a soft alpha for pixels that are gray-ish but not fully background
soft_gray = gray_match & ~bg_mask & (r > 30) & (r < 245)
alpha[soft_gray] = 128

arr[:, :, 3] = alpha
result = Image.fromarray(arr, "RGBA")

# Crop to bounding box of non-transparent pixels
bbox = result.getbbox()
print(f"Bounding box: {bbox}")
if bbox:
    # Add small padding
    pad = 10
    left = max(0, bbox[0] - pad)
    top = max(0, bbox[1] - pad)
    right = min(result.width, bbox[2] + pad)
    bottom = min(result.height, bbox[3] + pad)
    result = result.crop((left, top, right, bottom))
print(f"Cropped size: {result.size}")

# Save full logo
result.save(OUT_PNG, "PNG")
print(f"Saved: {OUT_PNG}")

# Create a square version (for favicon, social, etc.)
side = max(result.size)
square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
offset = ((side - result.width) // 2, (side - result.height) // 2)
square.paste(result, offset, result)
# Save a 512x512 version
square_512 = square.resize((512, 512), Image.LANCZOS)
square_512.save(OUT_FAVICON_PNG, "PNG")
print(f"Saved favicon PNG: {OUT_FAVICON_PNG}")

# Create an SVG favicon that just references the PNG (simple approach)
svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <image href="/images/favicon.png" x="0" y="0" width="100" height="100"/>
</svg>'''
with open(OUT_FAVICON, "w", encoding="utf-8") as f:
    f.write(svg_content)
print(f"Saved favicon SVG: {OUT_FAVICON}")

print("\n✅ Logo processed successfully")
