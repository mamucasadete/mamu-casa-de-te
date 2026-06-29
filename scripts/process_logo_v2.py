"""
Process the new MAMU logo from the 3-options image.
1. Crop the LEFT card (the violet one the user wants)
2. Find the central emblem (circle with M, crown, volutas)
3. Remove the violet background -> transparent
4. Save multiple variants for different use cases
"""
from PIL import Image, ImageOps
import numpy as np
import os

SRC = "/home/z/my-project/upload/WhatsApp Image 2026-06-29 at 7.56.13 PM.jpeg"
PUBLIC = "/home/z/my-project/public/images"

# Open and fix orientation
img = Image.open(SRC)
img = ImageOps.exif_transpose(img)
print(f"Original: {img.size}")

arr = np.array(img.convert("RGBA"))
h, w, _ = arr.shape

# Each card is ~526px wide. The LEFT card spans x=0..526
# But there might be a small gap between cards. Let's find the actual card bounds
# by detecting the violet background.
# Violet background is roughly R in [200, 245], G in [195, 230], B in [225, 255], with B > R
r, g, b = arr[:, :526, 0], arr[:, :526, 1], arr[:, :526, 2]
violet_mask = (r > 200) & (r < 250) & (g > 190) & (g < 240) & (b > 220) & (b < 255) & (b > r)

# Find columns and rows that have violet (card background)
cols_with_violet = violet_mask.any(axis=0)
rows_with_violet = violet_mask.any(axis=1)
left_cols = np.where(cols_with_violet)[0]
top_rows = np.where(rows_with_violet)[0]
print(f"Left card: x={left_cols.min()}-{left_cols.max()}, y={top_rows.min()}-{top_rows.max()}")

# Crop the left card with small padding
pad = 8
left = max(0, left_cols.min() - pad)
right = min(w, left_cols.max() + pad)
top = max(0, top_rows.min() - pad)
bottom = min(h, top_rows.max() + pad)
left_card = arr[top:bottom, left:right]
print(f"Left card cropped: {left_card.shape[1]}x{left_card.shape[0]}")

left_img = Image.fromarray(left_card, "RGBA")
left_img.save("/tmp/left_card_full.png")
print("Saved full left card to /tmp/left_card_full.png")

# Now find the central emblem within the left card.
# The emblem is the black ink (crown + circle + M + volutas).
# We want to crop just the emblem area, not the text "Casa de Comida", "MAMU", phone, etc.
# Strategy: find the largest contiguous block of dark pixels (the emblem) in the center.

# Detect "dark" pixels (the black logo ink)
r2, g2, b2 = left_card[:, :, 0], left_card[:, :, 1], left_card[:, :, 2]
dark_mask = (r2 < 80) & (g2 < 80) & (b2 < 80)
print(f"Dark pixels in left card: {dark_mask.sum()}")

# Find rows that contain dark pixels (logo ink)
rows_with_dark = np.where(dark_mask.any(axis=1))[0]
# Group consecutive rows into clusters (each cluster = a text line or the emblem)
# The emblem should be the LARGEST cluster
clusters = []
if len(rows_with_dark) > 0:
    start = rows_with_dark[0]
    prev = rows_with_dark[0]
    for r_val in rows_with_dark[1:]:
        if r_val - prev > 5:  # gap of 5+ rows = new cluster
            clusters.append((start, prev))
            start = r_val
        prev = r_val
    clusters.append((start, prev))

print(f"Found {len(clusters)} row clusters of dark pixels:")
for i, (s, e) in enumerate(clusters):
    height = e - s
    print(f"  Cluster {i}: rows {s}-{e} (height {height})")

# The emblem is the cluster with the largest height (it's the biggest element)
if clusters:
    emblem_cluster = max(clusters, key=lambda c: c[1] - c[0])
    print(f"\nEmblem cluster (largest): rows {emblem_cluster[0]}-{emblem_cluster[1]} (height {emblem_cluster[1]-emblem_cluster[0]})")

    # Now find horizontal extent of the emblem in those rows
    emblem_rows = dark_mask[emblem_cluster[0]:emblem_cluster[1]+1]
    cols_with_dark = np.where(emblem_rows.any(axis=0))[0]
    if len(cols_with_dark) > 0:
        emblem_left = cols_with_dark.min()
        emblem_right = cols_with_dark.max()
        print(f"Emblem cols: {emblem_left}-{emblem_right} (width {emblem_right-emblem_left})")

        # Add padding around the emblem
        epad = 15
        crop_top = max(0, emblem_cluster[0] - epad)
        crop_bottom = min(left_card.shape[0], emblem_cluster[1] + epad)
        crop_left = max(0, emblem_left - epad)
        crop_right = min(left_card.shape[1], emblem_right + epad)

        emblem_crop = left_card[crop_top:crop_bottom, crop_left:crop_right]
        print(f"Emblem cropped: {emblem_crop.shape[1]}x{emblem_crop.shape[0]}")

        # Save raw emblem (with violet background)
        Image.fromarray(emblem_crop, "RGBA").save("/tmp/emblem_raw.png")

        # NOW remove the violet background — be more aggressive
        # Violet background ranges from light (236,207,255) to slightly darker
        er, eg, eb = emblem_crop[:, :, 0], emblem_crop[:, :, 1], emblem_crop[:, :, 2]

        # Background = violet (B >= R - 5, all channels mid-to-high, B noticeably high)
        # More permissive: catch all violet shades
        bg_mask = (
            (er > 170) & (er <= 255) &
            (eg > 160) & (eg <= 255) &
            (eb > 200) & (eb <= 255) &
            (eb.astype(int) >= er.astype(int) - 10)  # B is at least close to R
        )

        # Pixels that are CLEARLY part of the logo (black ink): R,G,B all low
        black_mask = (er < 100) & (eg < 100) & (eb < 100)

        # Pixels that are clearly white (interior of circle): all high, no violet tint
        white_mask = (er > 240) & (eg > 240) & (eb > 240) & (np.abs(er.astype(int) - eb.astype(int)) < 10)

        # Everything else = transition/edge — keep opaque unless it's clearly violet
        # Set alpha: 0 for background, 255 for everything else
        alpha = np.full(emblem_crop.shape[:2], 255, dtype=np.uint8)
        alpha[bg_mask] = 0  # transparent violet background

        # For semi-transparent edges: pixels that are violet-ish but not full background
        # Use distance from pure violet to determine alpha
        violetness = np.clip(eb.astype(int) - er.astype(int), 0, 255).astype(float)
        # Strong violetness (>30) and not black/white = still background-ish
        extra_bg = (~bg_mask) & (~black_mask) & (~white_mask) & (violetness > 25) & (er > 150)
        alpha[extra_bg] = 0

        # Mild violet tint (15-25) = edge anti-aliasing, make semi-transparent
        edge = (~bg_mask) & (~extra_bg) & (~black_mask) & (~white_mask) & (violetness > 12) & (violetness <= 25) & (er > 150)
        alpha[edge] = 128

        emblem_crop[:, :, 3] = alpha

        transparent_pct = 100 * (alpha == 0).sum() / alpha.size
        opaque_pct = 100 * (alpha == 255).sum() / alpha.size
        semi_pct = 100 * ((alpha > 0) & (alpha < 255)).sum() / alpha.size
        print(f"  Alpha stats: {transparent_pct:.1f}% transparent, {opaque_pct:.1f}% opaque, {semi_pct:.1f}% semi")

        # Save emblem with transparent background
        emblem_img = Image.fromarray(emblem_crop, "RGBA")
        emblem_img.save(os.path.join(PUBLIC, "logo-mamu.png"), "PNG")
        print(f"\n✅ Saved emblem (transparent): {PUBLIC}/logo-mamu.png")
        print(f"   Size: {emblem_img.size}")

        # Also create a version with the FULL card (emblem + text "MAMU" + tagline)
        # in case we want to use it as a more complete logo somewhere
        # Keep only the emblem + "MAMU" text (skip "Casa de Comida" which is wrong, and phone/location)
        # Find the "MAMU" text cluster (second largest dark cluster, below the emblem)
        if len(clusters) >= 2:
            # Sort clusters by height, take 2nd largest
            sorted_clusters = sorted(clusters, key=lambda c: c[1] - c[0], reverse=True)
            if len(sorted_clusters) >= 2:
                mamu_cluster = sorted_clusters[1]
                # Make sure it's below the emblem
                if mamu_cluster[0] > emblem_cluster[1]:
                    full_bottom = mamu_cluster[1] + epad
                    full_crop = left_card[crop_top:full_bottom, crop_left:crop_right]
                    # Remove background
                    fr, fg, fb = full_crop[:, :, 0], full_crop[:, :, 1], full_crop[:, :, 2]
                    fbg_mask = (fr > 180) & (fr < 255) & (fg > 170) & (fg < 250) & (fb > 210) & (fb < 255) & (fb >= fr - 10)
                    falpha = full_crop[:, :, 3].copy()
                    falpha[fbg_mask] = 0
                    fsoft = (~fbg_mask) & (np.clip(fb.astype(int) - fr.astype(int), 0, 255) > 10) & (np.clip(fb.astype(int) - fr.astype(int), 0, 255) < 40) & (fr > 150)
                    falpha[fsoft] = 128
                    full_crop[:, :, 3] = falpha
                    full_img = Image.fromarray(full_crop, "RGBA")
                    full_img.save(os.path.join(PUBLIC, "logo-mamu-full.png"), "PNG")
                    print(f"✅ Saved full version (emblem + MAMU text): {PUBLIC}/logo-mamu-full.png")

        # Update favicon (square version of emblem)
        side = max(emblem_img.size)
        square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
        offset = ((side - emblem_img.width) // 2, (side - emblem_img.height) // 2)
        square.paste(emblem_img, offset, emblem_img)
        square_512 = square.resize((512, 512), Image.LANCZOS)
        square_512.save(os.path.join(PUBLIC, "favicon.png"), "PNG")
        print(f"✅ Updated favicon: {PUBLIC}/favicon.png")

print("\nDone!")
