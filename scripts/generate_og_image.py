"""
Generate Open Graph image (1200x630) for social media sharing.
Uses the real logo + predio photo + brand colors.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

PUBLIC = "/home/z/my-project/public/images"
OUT = os.path.join(PUBLIC, "og-image.png")

# Canvas
W, H = 1200, 630
img = Image.new("RGBA", (W, H), (251, 246, 238, 255))  # cream

# === Background: predio panoramica (left half) with gradient overlay ===
predio = Image.open(os.path.join(PUBLIC, "predio-panoramica.jpg")).convert("RGBA")
# Resize to cover left side
predio_w = 580
predio_ratio = predio.height / predio.width
predio_h = int(predio_w * predio_ratio)
if predio_h < H:
    # Scale to cover height
    predio_h = H
    predio_w = int(H / predio_ratio)
predio = predio.resize((predio_w, predio_h), Image.LANCZOS)
# Center crop to fit left 580px
left_offset = (predio_w - 580) // 2 if predio_w > 580 else 0
top_offset = (predio_h - H) // 2 if predio_h > H else 0
predio_crop = predio.crop((left_offset, top_offset, left_offset + 580, top_offset + H))
img.paste(predio_crop, (0, 0))

# Gradient overlay on predio (left side: violet tint at right edge for blending)
gradient_left = Image.new("L", (580, H), 0)
for x in range(580):
    # Fade from 0 (transparent) at left to 255 (opaque cream) at right
    alpha = min(255, int(x * 0.6))
    for y in range(H):
        gradient_left.putpixel((x, y), alpha)
cream_overlay = Image.new("RGBA", (580, H), (251, 246, 238, 255))
img.paste(cream_overlay, (0, 0), gradient_left)

# === Right side: brand area ===
draw = ImageDraw.Draw(img)

# Try to load fonts
font_paths = [
    "/usr/share/fonts/truetype/noto-serif-sc/NotoSerifSC-Bold.otf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf",
]
font_regular_paths = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
]
font_italic_paths = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSerif-Italic.ttf",
]

def load_font(paths, size):
    for p in paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except:
                pass
    return ImageFont.load_default()

font_title = load_font(font_paths, 84)
font_subtitle = load_font(font_paths, 36)
font_tagline = load_font(font_italic_paths, 28)
font_small = load_font(font_regular_paths, 22)

# Logo (top right area)
logo = Image.open(os.path.join(PUBLIC, "logo-mamu.png")).convert("RGBA")
# Resize logo to ~140px tall
logo_h = 140
logo_w = int(logo.width * logo_h / logo.height)
logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
# Place logo at top right
logo_x = W - logo_w - 60
logo_y = 60
img.paste(logo, (logo_x, logo_y), logo)

# Brand name "MAMU"
draw.text((640, 80), "MAMU", fill=(109, 93, 138, 255), font=font_title)
draw.text((640, 175), "Casa de Té", fill=(61, 53, 48, 255), font=font_subtitle)

# Tagline (italic)
draw.text((640, 230), "Meriendas de campo con lavanda", fill=(143, 125, 168, 255), font=font_tagline)

# Location + hours block
draw.text((640, 320), "📍 Calmayo · Calamuchita · Córdoba", fill=(61, 53, 48, 255), font=font_small)
draw.text((640, 360), "🕒 Vie · Sáb · Dom — desde las 17 h", fill=(61, 53, 48, 255), font=font_small)
draw.text((640, 400), "🌿 Waffles de lavanda · Té artesanal", fill=(95, 117, 88, 255), font=font_small)

# CTA bar at bottom
draw.rectangle([(0, H - 80), (W, H)], fill=(109, 93, 138, 255))
draw.text((640, H - 60), "Reservá tu merienda →", fill=(251, 246, 238, 255), font=font_subtitle)

# Decorative line
draw.line([(640, 290), (1100, 290)], fill=(143, 125, 168, 255), width=2)

# Save
img.convert("RGB").save(OUT, "PNG", optimize=True)
print(f"✅ OG image saved: {OUT}")
print(f"   Size: {img.size}")
print(f"   File: {os.path.getsize(OUT) // 1024} KB")
