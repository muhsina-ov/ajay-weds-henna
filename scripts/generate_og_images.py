#!/usr/bin/env python3
import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageOps

os.makedirs('invitation/public/assets', exist_ok=True)
os.makedirs('invitation/public', exist_ok=True)

OG_WIDTH = 1200
OG_HEIGHT = 630

# Luxury Color Palette
COLOR_CREAM = (253, 248, 241)        # #FDF8F1
COLOR_CREAM_CARD = (255, 253, 249)   # #FFFAF4
COLOR_NAVY = (26, 54, 93)            # #1A365D
COLOR_NAVY_DEEP = (15, 36, 64)       # #0F2440
COLOR_GOLD = (184, 134, 11)          # #B8860B
COLOR_GOLD_LIGHT = (197, 160, 89)    # #C5A059
COLOR_GOLD_PALE = (212, 175, 55)     # #D4AF37
COLOR_GOLD_ACCENT = (218, 165, 32)
COLOR_TEXT_MUTED = (90, 102, 118)

FONT_DIDOT_BOLD = '/System/Library/Fonts/Supplemental/Didot.ttc'
FONT_BASKERVILLE_BOLD = '/System/Library/Fonts/Supplemental/Baskerville.ttc'
FONT_GEORGIA_BOLD = '/System/Library/Fonts/Supplemental/Georgia Bold.ttf'
FONT_GEORGIA_ITALIC = '/System/Library/Fonts/Supplemental/Georgia Italic.ttf'
FONT_GEORGIA = '/System/Library/Fonts/Supplemental/Georgia.ttf'
FONT_OPTIMA_BOLD = '/System/Library/Fonts/Optima.ttc'
FONT_SNELL = '/System/Library/Fonts/Supplemental/SnellRoundhand.ttc'

def get_font(path, size, index=0):
    try:
        return ImageFont.truetype(path, size, index=index)
    except Exception:
        return ImageFont.load_default()

def draw_tracked_text(draw, y, text, font, fill, letter_spacing=2, width=OG_WIDTH, x_offset=0):
    """Draw text with custom letter spacing centered within a container."""
    # Measure each character and spacing
    chars = list(text)
    total_w = 0
    char_widths = []
    for c in chars:
        bbox = draw.textbbox((0, 0), c, font=font)
        cw = bbox[2] - bbox[0]
        char_widths.append(cw)
        total_w += cw
    total_w += letter_spacing * (len(chars) - 1)
    
    start_x = x_offset + (width - total_w) / 2
    cur_x = start_x
    for i, c in enumerate(chars):
        draw.text((cur_x, y), c, font=font, fill=fill)
        cur_x += char_widths[i] + letter_spacing
    return y

def draw_text_centered(draw, y, text, font, fill, width=OG_WIDTH, x_offset=0):
    bbox = draw.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = x_offset + (width - w) / 2
    draw.text((x, y), text, font=font, fill=fill)
    return y + h

def draw_gold_frame(draw, x0, y0, x1, y1, radius=20):
    # Outer gold line
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, outline=COLOR_GOLD_LIGHT, width=2)
    # Inner thin line
    draw.rounded_rectangle([x0 + 4, y0 + 4, x1 - 4, y1 - 4], radius=max(0, radius - 3), outline=COLOR_GOLD_PALE, width=1)

def generate_primary_og_image():
    # Base canvas
    canvas = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), COLOR_CREAM)
    
    # Parchment background texture
    parchment_path = 'invitation/public/assets/decorations/parchment-texture.png'
    if os.path.exists(parchment_path):
        parch = Image.open(parchment_path).convert('RGBA')
        parch = parch.resize((OG_WIDTH, OG_HEIGHT), Image.Resampling.LANCZOS)
        canvas = Image.blend(canvas, parch, 0.28)
    
    # Outer frame
    frame_draw = ImageDraw.Draw(canvas)
    draw_gold_frame(frame_draw, 16, 16, OG_WIDTH - 16, OG_HEIGHT - 16, radius=12)
    
    # Left & Right floral flourishes
    floral_tl_path = 'invitation/public/assets/decorations/floral-top-left.png'
    floral_br_path = 'invitation/public/assets/decorations/floral-bottom-right.png'
    if os.path.exists(floral_tl_path):
        ftl = Image.open(floral_tl_path).convert('RGBA')
        # Corner flourish top-left
        ftl1 = ftl.resize((210, 210), Image.Resampling.LANCZOS)
        canvas.paste(ftl1, (10, 10), ftl1)
        # Corner flourish top-right
        ftr = ftl.transpose(Image.Transpose.FLIP_LEFT_RIGHT).resize((240, 240), Image.Resampling.LANCZOS)
        canvas.paste(ftr, (OG_WIDTH - 230, 8), ftr)
        
    if os.path.exists(floral_br_path):
        fbr = Image.open(floral_br_path).convert('RGBA').resize((230, 230), Image.Resampling.LANCZOS)
        canvas.paste(fbr, (OG_WIDTH - 220, OG_HEIGHT - 220), fbr)

    # 1. Left Couple Photo Panel
    photo_w, photo_h = 475, 540
    photo_x, photo_y = 44, 45
    
    couple_path = 'invitation/public/assets/hero-couple.jpg'
    if not os.path.exists(couple_path):
        couple_path = '00000042-DSC07832.jpg'
    
    couple_raw = Image.open(couple_path).convert('RGB')
    cw, ch = couple_raw.size
    
    # Crop centered with ideal couple framing
    target_aspect = photo_w / photo_h
    crop_w = int(ch * target_aspect)
    crop_h = ch
    crop_x = int((cw - crop_w) * 0.5)
    crop_y = 0
    
    cropped_couple = couple_raw.crop((crop_x, crop_y, crop_x + crop_w, crop_y + crop_h))
    photo_resized = cropped_couple.resize((photo_w, photo_h), Image.Resampling.LANCZOS).convert('RGBA')
    
    # Soft rounded arch mask
    mask = Image.new('L', (photo_w, photo_h), 0)
    m_draw = ImageDraw.Draw(mask)
    m_draw.rounded_rectangle([0, 0, photo_w, photo_h], radius=24, fill=255)
    
    # Add subtle soft shadow behind photo
    shadow = Image.new('RGBA', (photo_w + 20, photo_h + 20), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([6, 6, photo_w + 14, photo_h + 14], radius=24, fill=(30, 20, 10, 45))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    canvas.paste(shadow, (photo_x - 10, photo_y - 8), shadow)
    
    # Paste Photo
    canvas.paste(photo_resized, (photo_x, photo_y), mask)
    
    # Gold border on photo
    draw = ImageDraw.Draw(canvas)
    draw_gold_frame(draw, photo_x, photo_y, photo_x + photo_w, photo_y + photo_h, radius=24)
    
    # 2. Right Content Panel
    content_x = 550
    content_w = 610
    
    # Header ornament
    orn_h_path = 'invitation/public/assets/decorations/ornament-header.png'
    if os.path.exists(orn_h_path):
        orn = Image.open(orn_h_path).convert('RGBA').resize((160, 48), Image.Resampling.LANCZOS)
        canvas.paste(orn, (int(content_x + (content_w - 160) / 2), 48), orn)
        
    font_eyebrow = get_font(FONT_OPTIMA_BOLD, 13)
    font_groom_bride = get_font(FONT_DIDOT_BOLD, 44)
    font_connector = get_font(FONT_GEORGIA_ITALIC, 22)
    font_date_main = get_font(FONT_DIDOT_BOLD, 25)
    font_details = get_font(FONT_OPTIMA_BOLD, 15)
    font_details_sub = get_font(FONT_GEORGIA, 14)
    font_url = get_font(FONT_GEORGIA_BOLD, 13)
    
    # Eyebrow
    draw_tracked_text(draw, 102, "WEDDING  INVITATION", font_eyebrow, COLOR_GOLD, letter_spacing=5, width=content_w, x_offset=content_x)
    
    # Groom Name
    draw_tracked_text(draw, 136, "AJAY  BABU", font_groom_bride, COLOR_NAVY_DEEP, letter_spacing=3, width=content_w, x_offset=content_x)
    
    # Connector
    draw_text_centered(draw, 196, "unites in heart and soul with", font_connector, COLOR_GOLD_LIGHT, width=content_w, x_offset=content_x)
    
    # Bride Name
    draw_tracked_text(draw, 230, "HENNA  PRATHAP", font_groom_bride, COLOR_NAVY_DEEP, letter_spacing=3, width=content_w, x_offset=content_x)
    
    # Divider
    orn_div_path = 'invitation/public/assets/decorations/ornament-divider.png'
    if os.path.exists(orn_div_path):
        div = Image.open(orn_div_path).convert('RGBA').resize((210, 22), Image.Resampling.LANCZOS)
        canvas.paste(div, (int(content_x + (content_w - 210) / 2), 296), div)
        
    # Date & Venue Card
    card_w = 460
    card_h = 120
    card_x = int(content_x + (content_w - card_w) / 2)
    card_y = 332
    
    # Card soft shadow
    card_shadow = Image.new('RGBA', (card_w + 16, card_h + 16), (0, 0, 0, 0))
    cs_draw = ImageDraw.Draw(card_shadow)
    cs_draw.rounded_rectangle([4, 4, card_w + 12, card_h + 12], radius=14, fill=(40, 25, 15, 30))
    card_shadow = card_shadow.filter(ImageFilter.GaussianBlur(6))
    canvas.paste(card_shadow, (card_x - 8, card_y - 6), card_shadow)
    
    # Card surface
    draw.rounded_rectangle([card_x, card_y, card_x + card_w, card_y + card_h], radius=14, fill=COLOR_CREAM_CARD)
    draw_gold_frame(draw, card_x, card_y, card_x + card_w, card_y + card_h, radius=14)
    
    # Date text inside card
    draw_tracked_text(draw, card_y + 16, "SUNDAY  •  04  OCTOBER  2026", font_date_main, COLOR_NAVY, letter_spacing=2, width=card_w, x_offset=card_x)
    draw_tracked_text(draw, card_y + 54, "6:30 PM  ONWARDS  •  RECEPTION", font_details, COLOR_GOLD, letter_spacing=3, width=card_w, x_offset=card_x)
    draw_text_centered(draw, card_y + 82, "Adlux International Convention Center, Angamaly", font_details_sub, COLOR_TEXT_MUTED, width=card_w, x_offset=card_x)
    
    # Production Link Badge
    url_pill_w = 320
    url_pill_h = 32
    url_pill_x = int(content_x + (content_w - url_pill_w) / 2)
    url_pill_y = 485
    
    draw.rounded_rectangle([url_pill_x, url_pill_y, url_pill_x + url_pill_w, url_pill_y + url_pill_h], radius=16, fill=(26, 54, 93, 240))
    draw_tracked_text(draw, url_pill_y + 8, "ajay-henna.vercel.app", font_url, (253, 248, 241), letter_spacing=2, width=url_pill_w, x_offset=url_pill_x)
    
    return canvas.convert('RGB')

if __name__ == '__main__':
    img = generate_primary_og_image()
    img.save('invitation/public/og-image.jpg', quality=95)
    img.save('invitation/public/og-image.png')
    img.save('invitation/public/assets/og-image.jpg', quality=95)
    print('Generated primary high-fidelity couple OG image successfully!')
