"""Generate static Cinema / Cartoon / Anime Independence Day templates (no AI)."""
from __future__ import annotations

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

OUT = Path(r"E:\Workarea\ai_project\photo_editor\frontend\public\templates")
OUT.mkdir(parents=True, exist_ok=True)
W, H = 720, 900


def font(size: int, bold: bool = True):
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for p in candidates:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


def placeholder_circle(draw: ImageDraw.ImageDraw, cx, cy, r, label="YOUR PHOTO"):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(196, 196, 196))
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(120, 120, 120), width=3)
    # silhouette hint
    draw.ellipse([cx - r * 0.28, cy - r * 0.45, cx + r * 0.28, cy - r * 0.05], fill=(150, 150, 150))
    draw.ellipse([cx - r * 0.5, cy - r * 0.05, cx + r * 0.5, cy + r * 0.55], fill=(150, 150, 150))
    bbox = draw.textbbox((0, 0), label, font=font(18))
    tw = bbox[2] - bbox[0]
    draw.text((cx - tw / 2, cy + r * 0.55), label, fill=(80, 80, 80), font=font(18))


def cinema_night():
    im = Image.new("RGB", (W, H), (12, 18, 32))
    d = ImageDraw.Draw(im)
    # vignette-ish gradients via rectangles
    for i in range(H):
        t = i / H
        r = int(12 + 40 * t)
        g = int(18 + 20 * t)
        b = int(32 + 10 * (1 - t))
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # bokeh lights
    for x, y, rad, col in [
        (520, 180, 28, (255, 140, 60, 90)),
        (580, 260, 18, (80, 200, 255, 80)),
        (480, 320, 22, (255, 80, 120, 70)),
        (140, 200, 16, (255, 200, 80, 60)),
        (100, 400, 24, (100, 180, 255, 50)),
    ]:
        overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        od = ImageDraw.Draw(overlay)
        od.ellipse([x - rad, y - rad, x + rad, y + rad], fill=col)
        im = Image.alpha_composite(im.convert("RGBA"), overlay).convert("RGB")
        d = ImageDraw.Draw(im)

    # film bars
    d.rectangle([0, 0, W, 48], fill=(0, 0, 0))
    d.rectangle([0, H - 48, W, H], fill=(0, 0, 0))

    # photo frame
    fx, fy, fw, fh = 90, 120, 540, 620
    d.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=28, fill=(180, 180, 185))
    d.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=28, outline=(255, 153, 51), width=6)
    d.text((fx + 160, fy + 280), "YOUR PHOTO", fill=(90, 90, 95), font=font(28))
    d.text((fx + 175, fy + 320), "CINEMATIC", fill=(110, 110, 115), font=font(20, False))

    d.text((48, H - 120), "15 AUGUST 2026", fill=(255, 200, 120), font=font(22))
    d.text((48, H - 85), "INDEPENDENCE NIGHT", fill=(255, 255, 255), font=font(32))
    im.save(OUT / "cinema-01-night.png", optimize=True)
    print("cinema-01-night.png")


def cinema_golden():
    im = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        r = int(255 - 80 * t)
        g = int(160 - 40 * t)
        b = int(60 + 40 * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))
    # soft glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.ellipse([80, -80, 640, 420], fill=(255, 220, 120, 70))
    im = Image.alpha_composite(im.convert("RGBA"), glow).convert("RGB")
    d = ImageDraw.Draw(im)

    # portrait window
    fx, fy, fw, fh = 140, 150, 440, 560
    d.rounded_rectangle([fx - 8, fy - 8, fx + fw + 8, fy + fh + 8], radius=24, fill=(255, 255, 255, ))
    d.rounded_rectangle([fx, fy, fx + fw, fy + fh], radius=20, fill=(190, 185, 180))
    d.text((fx + 120, fy + 250), "YOUR PHOTO", fill=(90, 85, 80), font=font(26))
    d.text((fx + 130, fy + 290), "GOLDEN HOUR", fill=(120, 100, 80), font=font(18, False))

    d.rectangle([0, H - 140, W, H], fill=(20, 30, 50))
    d.text((40, H - 110), "JAI HIND", fill=(255, 153, 51), font=font(36))
    d.text((40, H - 65), "Cinematic Independence Day 2026", fill=(230, 230, 235), font=font(18, False))
    im.save(OUT / "cinema-02-golden.png", optimize=True)
    print("cinema-02-golden.png")


def cartoon_body(name: str, shirt: tuple, bg_top, bg_bot, flag_hand: bool, out_name: str):
    im = Image.new("RGB", (W, H), bg_top)
    d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        r = int(bg_top[0] * (1 - t) + bg_bot[0] * t)
        g = int(bg_top[1] * (1 - t) + bg_bot[1] * t)
        b = int(bg_top[2] * (1 - t) + bg_bot[2] * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))

    # soft clouds
    for cx, cy, rad in [(120, 120, 50), (200, 100, 40), (560, 140, 55)]:
        d.ellipse([cx - rad, cy - rad // 2, cx + rad, cy + rad // 2], fill=(255, 255, 255, ))

    # body
    body_cx, body_cy = W // 2, 620
    # legs
    d.rounded_rectangle([body_cx - 70, 700, body_cx - 20, 860], radius=18, fill=(70, 90, 140))
    d.rounded_rectangle([body_cx + 20, 700, body_cx + 70, 860], radius=18, fill=(70, 90, 140))
    # shoes
    d.ellipse([body_cx - 85, 840, body_cx - 10, 880], fill=(90, 55, 40))
    d.ellipse([body_cx + 10, 840, body_cx + 85, 880], fill=(90, 55, 40))
    # torso
    d.rounded_rectangle([body_cx - 110, 480, body_cx + 110, 720], radius=50, fill=shirt)
    # arms
    d.rounded_rectangle([body_cx - 170, 500, body_cx - 100, 650], radius=30, fill=shirt)
    d.rounded_rectangle([body_cx + 100, 500, body_cx + 170, 650], radius=30, fill=shirt)
    # hands
    d.ellipse([body_cx - 175, 630, body_cx - 115, 690], fill=(255, 210, 170))
    d.ellipse([body_cx + 115, 630, body_cx + 175, 690], fill=(255, 210, 170))

    if flag_hand:
        # tiny flag in left hand
        d.rectangle([body_cx - 210, 520, body_cx - 205, 640], fill=(80, 60, 40))
        d.rectangle([body_cx - 205, 520, body_cx - 145, 540], fill=(255, 153, 51))
        d.rectangle([body_cx - 205, 540, body_cx - 145, 560], fill=(255, 255, 255))
        d.rectangle([body_cx - 205, 560, body_cx - 145, 580], fill=(19, 136, 8))

    # neck
    d.rectangle([body_cx - 28, 430, body_cx + 28, 490], fill=(255, 210, 170))

    # face hole (gray circle) — user photo goes here
    r = 110
    cx, cy = body_cx, 360
    # frame ring
    d.ellipse([cx - r - 14, cy - r - 14, cx + r + 14, cy + r + 14], fill=(255, 153, 51))
    d.ellipse([cx - r - 8, cy - r - 8, cx + r + 8, cy + r + 8], fill=(19, 136, 8))
    placeholder_circle(d, cx, cy, r, "FACE")

    # banner
    d.rounded_rectangle([60, 40, W - 60, 100], radius=20, fill=(255, 255, 255))
    d.text((150, 55), "HAPPY 15 AUGUST 2026", fill=(20, 40, 80), font=font(26))
    d.text((180, H - 50), name, fill=(30, 40, 70), font=font(22))

    im.save(OUT / out_name, optimize=True)
    print(out_name)


def anime_scene(out_name: str, sky_top, sky_bot, title: str):
    im = Image.new("RGB", (W, H))
    d = ImageDraw.Draw(im)
    for i in range(H):
        t = i / H
        r = int(sky_top[0] * (1 - t) + sky_bot[0] * t)
        g = int(sky_top[1] * (1 - t) + sky_bot[1] * t)
        b = int(sky_top[2] * (1 - t) + sky_bot[2] * t)
        d.line([(0, i), (W, i)], fill=(r, g, b))

    # sun
    d.ellipse([420, 80, 560, 220], fill=(255, 220, 140))
    # city silhouettes
    for x0, ht in [(0, 180), (80, 240), (160, 160), (240, 280), (340, 200), (420, 260), (520, 170), (600, 220)]:
        d.rectangle([x0, H - 120 - ht, x0 + 90, H - 80], fill=(40, 30, 60))
    # roof ledge
    d.rectangle([0, H - 90, W, H], fill=(55, 45, 75))
    d.rectangle([40, H - 160, W - 40, H - 90], fill=(70, 55, 95))

    # kites
    for kx, ky, col in [(180, 160, (255, 100, 80)), (280, 120, (80, 200, 120)), (500, 150, (255, 180, 60))]:
        d.polygon([(kx, ky), (kx + 30, ky + 20), (kx, ky + 40), (kx - 10, ky + 20)], fill=col)
        d.line([(kx, ky + 40), (kx + 20, ky + 90)], fill=(255, 255, 255), width=2)

    # character body (simple anime-ish)
    body_cx = 360
    d.rounded_rectangle([body_cx - 70, 520, body_cx + 70, 720], radius=30, fill=(245, 245, 250))  # shirt
    d.rounded_rectangle([body_cx - 55, 700, body_cx - 15, 820], radius=12, fill=(40, 45, 70))
    d.rounded_rectangle([body_cx + 15, 700, body_cx + 55, 820], radius=12, fill=(40, 45, 70))
    d.ellipse([body_cx - 90, 820, body_cx - 20, 860], fill=(200, 50, 50))
    d.ellipse([body_cx + 20, 820, body_cx + 90, 860], fill=(200, 50, 50))
    # backpack
    d.rounded_rectangle([body_cx + 55, 540, body_cx + 110, 680], radius=20, fill=(60, 120, 200))
    # neck
    d.rectangle([body_cx - 22, 470, body_cx + 22, 530], fill=(255, 210, 180))

    # face oval hole
    r = 95
    cx, cy = body_cx, 400
    d.ellipse([cx - r - 10, cy - r - 10, cx + r + 10, cy + r + 10], fill=(255, 255, 255))
    placeholder_circle(d, cx, cy, r, "FACE")

    # title
    d.text((40, 36), title, fill=(255, 255, 255), font=font(28))
    d.text((40, 72), "15 AUGUST 2026", fill=(255, 230, 180), font=font(20, False))

    im.save(OUT / out_name, optimize=True)
    print(out_name)


def main():
    cinema_night()
    cinema_golden()
    cartoon_body(
        "CARTOON PRIDE",
        shirt=(255, 210, 120),
        bg_top=(255, 220, 180),
        bg_bot=(180, 230, 170),
        flag_hand=True,
        out_name="cartoon-01-pride.png",
    )
    cartoon_body(
        "LITTLE PATRIOT",
        shirt=(120, 190, 255),
        bg_top=(255, 200, 160),
        bg_bot=(255, 230, 200),
        flag_hand=True,
        out_name="cartoon-02-patriot.png",
    )
    anime_scene(
        "anime-01-rooftop.png",
        sky_top=(255, 140, 90),
        sky_bot=(120, 60, 140),
        title="AZADI SUNSET",
    )
    anime_scene(
        "anime-02-kites.png",
        sky_top=(255, 170, 110),
        sky_bot=(80, 50, 120),
        title="KITES OF FREEDOM",
    )
    print("done")


if __name__ == "__main__":
    main()
