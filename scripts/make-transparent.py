#!/usr/bin/env python3
"""Remove baked checkerboard from PNGs. Uses flood-fill for artwork layers, color-key for frame/ornaments."""

from collections import deque
from pathlib import Path
from PIL import Image

TOLERANCE = 28

def color_dist(c1, c2):
    return max(abs(c1[i] - c2[i]) for i in range(3))

def is_checkerboard_pixel(r, g, b):
    """White or light-gray checkerboard squares — low saturation, bright."""
    if abs(r - g) < 14 and abs(g - b) < 14 and min(r, g, b) >= 168:
        return True
    return False

def is_gold_pixel(r, g, b):
    """Keep gold frame lines — warm hue, not gray."""
    return r > 140 and g > 100 and b < 140 and (r - b) > 40

def flood_transparent(img: Image.Image) -> Image.Image:
    img = img.convert('RGBA')
    w, h = img.size
    pixels = img.load()
    seeds = [
        (0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1),
        (w // 2, 0), (0, h // 2), (w - 1, h // 2), (w // 2, h - 1),
    ]
    seed_colors = [pixels[x, y][:3] for x, y in seeds]
    visited = [[False] * w for _ in range(h)]
    queue = deque(seeds)

    while queue:
        x, y = queue.popleft()
        if x < 0 or x >= w or y < 0 or y >= h or visited[y][x]:
            continue
        r, g, b, _ = pixels[x, y]
        if not (is_checkerboard_pixel(r, g, b) or color_dist((r, g, b), seed_colors[0]) <= TOLERANCE):
            continue
        visited[y][x] = True
        pixels[x, y] = (r, g, b, 0)
        queue.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])
    return img

def checkerboard_key(img: Image.Image, keep_gold: bool = False) -> Image.Image:
    """Strip ALL checkerboard pixels globally (for frame overlays)."""
    img = img.convert('RGBA')
    pixels = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = pixels[x, y]
            if keep_gold and is_gold_pixel(r, g, b):
                continue
            if is_checkerboard_pixel(r, g, b):
                pixels[x, y] = (r, g, b, 0)
    return img

def process(path: Path):
    name = path.name
    if name == 'hero-layer-sky-water.png':
        return
    img = Image.open(path)
    if name == 'hero-layer-gold-frame.png':
        result = checkerboard_key(img, keep_gold=True)
    elif name.startswith('ornament-') or name in ('heart-gold.png', 'corner-flourish.png'):
        result = checkerboard_key(img, keep_gold=True)
    else:
        result = flood_transparent(img)
    result.save(path, 'PNG', optimize=True)
    px = result.load()
    w, h = result.size
    trans = sum(1 for y in range(h) for x in range(w) if px[x, y][3] < 128)
    print(f'  ✓ {name} — {100*trans/(w*h):.0f}% transparent')

def main():
    base = Path(__file__).resolve().parent.parent / 'public' / 'assets'
    for folder in ('hero-layers', 'decorations'):
        d = base / folder
        if not d.exists():
            continue
        print(f'Processing {d.name}/...')
        for p in sorted(d.glob('*.png')):
            if p.name == 'parchment-texture.png':
                continue
            process(p)

if __name__ == '__main__':
    main()
