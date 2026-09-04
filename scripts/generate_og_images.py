#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 1200, 630

# Luxury Color Palette
BG_COLOR = (250, 248, 244)       # Warm luxury parchment
NAVY_INK = (11, 59, 114)          # Royal Navy #0B3B72
NAVY_DEEP = (6, 41, 79)           # Deep Navy #06294F
GOLD_ACCENT = (197, 160, 89)      # Antique Gold #C5A059
GOLD_LINE = (212, 175, 55)        # Fine Metallic Gold #D4AF37
TEXT_MUTED = (95, 115, 135)       # Elegant Slate

# Load Fonts
FONT_CINZEL = 'fonts_cache/Cinzel.ttf'
FONT_PLAYFAIR = 'fonts_cache/PlayfairDisplay.ttf'
FONT_SCRIPT = 'fonts_cache/GreatVibes-Regular.ttf'

font_cinzel_lg = ImageFont.truetype(FONT_CINZEL, 40)
font_cinzel_md = ImageFont.truetype(FONT_CINZEL, 24)
font_cinzel_sm = ImageFont.truetype(FONT_CINZEL, 13)
font_cinzel_xs = ImageFont.truetype(FONT_CINZEL, 11)
font_script = ImageFont.truetype(FONT_SCRIPT, 40)
font_playfair = ImageFont.truetype(FONT_PLAYFAIR, 16)
font_url = ImageFont.truetype(FONT_PLAYFAIR, 15)

def build_og_image(photo_path, crop_box, output_path):
    canvas = Image.new('RGBA', (W, H), BG_COLOR)
    
    # 1. Parchment texture overlay
    parch_path = 'invitation/public/assets/decorations/parchment-texture.png'
    if os.path.exists(parch_path):
        parch = Image.open(parch_path).convert('RGBA').resize((W, H), Image.Resampling.LANCZOS)
        canvas = Image.blend(canvas, parch, 0.22)

    draw = ImageDraw.Draw(canvas)

    # 2. Double Gold Outer Border
    draw.rounded_rectangle([18, 18, W - 18, H - 18], radius=14, outline=GOLD_ACCENT, width=2)
    draw.rounded_rectangle([24, 24, W - 24, H - 24], radius=10, outline=GOLD_LINE, width=1)

    # 3. Navy & White Watercolor Florals in corners
    ftl_path = 'invitation/public/assets/decorations/floral-top-left.png'
    fbr_path = 'invitation/public/assets/decorations/floral-bottom-right.png'
    if os.path.exists(ftl_path):
        ftl = Image.open(ftl_path).convert('RGBA').resize((215, 215), Image.Resampling.LANCZOS)
        canvas.paste(ftl, (12, 12), ftl)
        # Top-right mirrored floral
        ftr = ftl.transpose(Image.Transpose.FLIP_LEFT_RIGHT).resize((220, 220), Image.Resampling.LANCZOS)
        canvas.paste(ftr, (W - 225, 12), ftr)

    if os.path.exists(fbr_path):
        fbr = Image.open(fbr_path).convert('RGBA').resize((215, 215), Image.Resampling.LANCZOS)
        canvas.paste(fbr, (W - 215, H - 215), fbr)

    # 4. Couple Photo Framed Arch (Left Panel)
    photo_w, photo_h = 470, 530
    photo_x, photo_y = 52, 50

    raw_photo = Image.open(photo_path).convert('RGB')
    cropped = raw_photo.crop(crop_box)
    resized_photo = cropped.resize((photo_w, photo_h), Image.Resampling.LANCZOS).convert('RGBA')

    # Mask with rounded corners
    mask = Image.new('L', (photo_w, photo_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, photo_w, photo_h], radius=22, fill=255)

    # Soft ambient drop shadow
    shadow = Image.new('RGBA', (photo_w + 24, photo_h + 24), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([8, 8, photo_w + 16, photo_h + 16], radius=22, fill=(20, 30, 45, 55))
    shadow = shadow.filter(ImageFilter.GaussianBlur(10))
    canvas.paste(shadow, (photo_x - 12, photo_y - 10), shadow)

    # Paste Couple Photo
    canvas.paste(resized_photo, (photo_x, photo_y), mask)

    # Double Gold Arch Border around photo
    draw.rounded_rectangle([photo_x, photo_y, photo_x + photo_w, photo_y + photo_h], radius=22, outline=GOLD_ACCENT, width=2)
    draw.rounded_rectangle([photo_x + 4, photo_y + 4, photo_x + photo_w - 4, photo_y + photo_h - 4], radius=18, outline=GOLD_LINE, width=1)

    # 5. Right Content Area
    cx = 555
    cw = 595

    # Crest / Monogram at top
    crest_path = 'invitation/public/assets/florals/crest-monogram.png'
    if os.path.exists(crest_path):
        crest = Image.open(crest_path).convert('RGBA').resize((66, 66), Image.Resampling.LANCZOS)
        canvas.paste(crest, (int(cx + (cw - 66) / 2), 44), crest)

    def text_center(y, text, font, fill):
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = int(cx + (cw - tw) / 2)
        draw.text((x, y), text, font=font, fill=fill)
        return y + (bbox[3] - bbox[1])

    # Eyebrow
    text_center(116, "W E D D I N G   I N V I T A T I O N", font_cinzel_xs, GOLD_ACCENT)

    # Couple Names
    text_center(144, "AJAY BABU", font_cinzel_lg, NAVY_DEEP)
    text_center(196, "and", font_script, GOLD_ACCENT)
    text_center(232, "HENNA PRATHAP", font_cinzel_lg, NAVY_DEEP)

    # Gold ornamental divider
    orn_div = 'invitation/public/assets/decorations/ornament-divider.png'
    if os.path.exists(orn_div):
        od = Image.open(orn_div).convert('RGBA').resize((180, 18), Image.Resampling.LANCZOS)
        canvas.paste(od, (int(cx + (cw - 180) / 2), 296), od)

    # Date & Occasion Card
    card_w = 460
    card_h = 135
    card_x = int(cx + (cw - card_w) / 2)
    card_y = 330

    card_shadow = Image.new('RGBA', (card_w + 16, card_h + 16), (0, 0, 0, 0))
    cs_draw = ImageDraw.Draw(card_shadow)
    cs_draw.rounded_rectangle([4, 4, card_w + 12, card_h + 12], radius=14, fill=(15, 30, 50, 25))
    card_shadow = card_shadow.filter(ImageFilter.GaussianBlur(6))
    canvas.paste(card_shadow, (card_x - 8, card_y - 6), card_shadow)

    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=14, fill=(255, 253, 250, 245), outline=GOLD_ACCENT, width=1)
    draw.rounded_rectangle([card_x + 3, card_y + 3, card_x + card_w - 3, card_y + card_h - 3], radius=11, outline=GOLD_LINE, width=1)

    def card_center(y, text, font, fill):
        bbox = draw.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        x = int(card_x + (card_w - tw) / 2)
        draw.text((x, y), text, font=font, fill=fill)

    card_center(card_y + 14, "SUNDAY  •  04 OCTOBER 2026", font_cinzel_md, NAVY_INK)
    card_center(card_y + 50, "SACRAMENT OF MATRIMONY  &  RECEPTION", font_cinzel_xs, GOLD_ACCENT)
    card_center(card_y + 74, "Little Flower Church, Kurumassery • 3:00 PM", font_playfair, TEXT_MUTED)
    card_center(card_y + 98, "Adlux Convention Centre, Angamaly • 6:30 PM", font_playfair, TEXT_MUTED)

    # Production Link Pill
    pill_w = 340
    pill_h = 36
    pill_x = int(cx + (cw - pill_w) / 2)
    pill_y = 488

    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=18, fill=NAVY_DEEP)
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=18, outline=GOLD_LINE, width=1)

    url_str = "ajay-weds-henna.vercel.app"
    bbox = draw.textbbox((0, 0), url_str, font=font_url)
    tw = bbox[2] - bbox[0]
    draw.text((int(pill_x + (pill_w - tw) / 2), pill_y + 8), url_str, font=font_url, fill=(255, 255, 255))

    final_rgb = canvas.convert('RGB')
    final_rgb.save(output_path, quality=96)
    print(f"Generated {output_path}")
    return final_rgb

if __name__ == '__main__':
    # Primary: Joyful walking couple (gallery-5)
    im5 = Image.open('invitation/public/assets/gallery-5.jpg')
    w5, h5 = im5.size
    crop_walk = (int(w5 * 0.05), int(h5 * 0.22), int(w5 * 0.88), int(h5 * 0.88))
    
    img = build_og_image('invitation/public/assets/gallery-5.jpg', crop_walk, 'invitation/public/og-image.jpg')
    img.save('invitation/public/og-image.png')
    img.save('invitation/public/assets/og-image.jpg', quality=96)
    
    # Secondary variations for choice:
    im2 = Image.open('invitation/public/assets/gallery-2.jpg')
    w2, h2 = im2.size
    crop_candid = (int(w2 * 0.02), int(h2 * 0.12), int(w2 * 0.95), int(h2 * 0.85))
    build_og_image('invitation/public/assets/gallery-2.jpg', crop_candid, 'invitation/public/og-image-candid.jpg')

    print("All couple-focused OG images generated successfully!")
