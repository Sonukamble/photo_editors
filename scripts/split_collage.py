"""Split the Independence Day collage into 11 template PNGs."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

SRC = Path(
    r"C:\Users\ADMIN\.cursor\projects\e-Workarea-ai-project-photo-editor-frontend\assets\c__Users_ADMIN_AppData_Roaming_Cursor_User_workspaceStorage_72ee21b497f128d6347dd0436c6c597a_images_Gemini_Generated_Image_3bqogj3bqogj3bqo-63298725-e9cb-42bc-8dc7-35f162648358.png"
)
OUT = Path(r"E:\Workarea\ai_project\photo_editor\frontend\public\templates")
OUT.mkdir(parents=True, exist_ok=True)

COLS = [(5, 203), (208, 407), (412, 611), (616, 815), (820, 1018)]

# Human-readable ids matching the collage (left→right, top→bottom per column)
NAMES = [
    "heritage-oval",  # 79 years / Jai Hind oval
    "moment-ribbon",  # ADD YOUR MOMENT ribbon card
    "vande-mataram",  # Youth Power / Vande Mataram
    "heroes-tribute",  # Remembering Our Heroes
    "tiranga-waves",  # India Independence Day wavy flag
    "united-80th",  # 80th Independence Day circle
    "swatantrata",  # Swatantrata Diwas dark
    "paint-80th",  # Paint splash 80th
    "ribbon-compact-a",  # small Happy Independence ribbon
    "ribbon-compact-b",  # small Happy Independence ribbon variant
    "global-pride",  # Global Indian Pride oval
]


def connected_components(mask: np.ndarray) -> list[tuple[int, int, int, int]]:
    """4-connected components → bounding boxes (x0,y0,x1,y1) inclusive."""
    h, w = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    boxes: list[tuple[int, int, int, int]] = []

    for y in range(h):
        for x in range(w):
            if not mask[y, x] or visited[y, x]:
                continue
            # BFS
            stack = [(y, x)]
            visited[y, x] = True
            minx = maxx = x
            miny = maxy = y
            count = 0
            while stack:
                cy, cx = stack.pop()
                count += 1
                minx = min(minx, cx)
                maxx = max(maxx, cx)
                miny = min(miny, cy)
                maxy = max(maxy, cy)
                for ny, nx in (
                    (cy - 1, cx),
                    (cy + 1, cx),
                    (cy, cx - 1),
                    (cy, cx + 1),
                ):
                    if 0 <= ny < h and 0 <= nx < w and mask[ny, nx] and not visited[ny, nx]:
                        visited[ny, nx] = True
                        stack.append((ny, nx))
            if count >= 800:  # ignore dust
                boxes.append((minx, miny, maxx, maxy))
    return boxes


def main() -> None:
    im = Image.open(SRC).convert("RGB")
    arr = np.asarray(im)

    # Content = not near-white collage background
    white = (
        (arr[:, :, 0] > 248)
        & (arr[:, :, 1] > 248)
        & (arr[:, :, 2] > 248)
    )
    content = ~white

    # Close small white holes inside templates (bridge white middles)
    content_img = Image.fromarray(content.astype(np.uint8) * 255)
    # Strong vertical close so ribbon+photo with white middle stay one blob
    content_img = content_img.filter(ImageFilter.MaxFilter(9))
    content_img = content_img.filter(ImageFilter.MinFilter(5))
    closed = np.asarray(content_img) > 127

    # Restrict closing to each column separately to avoid merging across gutters
    all_boxes: list[tuple[int, int, int, int, int]] = []  # x0,y0,x1,y1,col
    for ci, (x0, x1) in enumerate(COLS):
        col_mask = np.zeros_like(closed)
        col_mask[:, x0 : x1 + 1] = closed[:, x0 : x1 + 1]
        # Also require original content OR closed within column
        boxes = connected_components(col_mask)
        # Sort top-to-bottom
        boxes.sort(key=lambda b: b[1])
        print(f"col {ci}: {len(boxes)} components")
        for b in boxes:
            bx0, by0, bx1, by1 = b
            # Clamp to column + slight pad inward from gutters
            bx0 = max(bx0, x0)
            bx1 = min(bx1, x1)
            hgt = by1 - by0 + 1
            wid = bx1 - bx0 + 1
            if hgt < 60 or wid < 80:
                print(f"  skip small {wid}x{hgt} at y={by0}")
                continue
            all_boxes.append((bx0, by0, bx1, by1, ci))

    # Sort reading order: by approximate row band then column
    all_boxes.sort(key=lambda b: (b[1] // 40, b[4], b[1]))
    print("kept", len(all_boxes))

    # Clean previous raw/debug outputs
    for p in OUT.glob("_raw_*.png"):
        p.unlink()
    for p in OUT.glob("template-*.png"):
        p.unlink()

    # If we didn't get exactly 11, fall back to manual boxes tuned from analysis
    if len(all_boxes) != 11:
        print("auto count != 11, using manual crop map")
        # Manual boxes carefully tuned from 5-col layout + visual inspection
        # Format: (left, top, right, bottom) in PIL crop coords
        manual = [
            (5, 4, 204, 278),  # 1 heritage oval
            (5, 300, 204, 555),  # 2 moment ribbon (merge ribbon+photo)
            (208, 5, 408, 278),  # 3 vande mataram
            (208, 282, 408, 555),  # 4 heroes
            (412, 6, 612, 210),  # 5 tiranga waves (merged top+photo)
            (412, 208, 612, 555),  # 6 united 80th
            (616, 5, 816, 278),  # 7 swatantrata
            (616, 290, 816, 540),  # 8 paint 80th
            (820, 5, 1019, 200),  # 9 ribbon compact a (merge small tops)
            (820, 200, 1019, 370),  # 10 ribbon compact b
            (820, 370, 1019, 555),  # 11 global pride
        ]
        all_boxes = [(a, b, c - 1, d - 1, i) for i, (a, b, c, d) in enumerate(manual)]

    saved = []
    for i, box in enumerate(all_boxes, start=1):
        x0, y0, x1, y1, _ci = box
        # pad 1px away from pure white gutters if possible
        crop = im.crop((x0, y0, x1 + 1, y1 + 1))
        # Trim outer near-white margins lightly
        crop = trim_white_border(crop, threshold=248, pad=2)
        name = NAMES[i - 1] if i - 1 < len(NAMES) else f"extra-{i}"
        filename = f"template-{i:02d}-{name}.png"
        path = OUT / filename
        # Upscale to nicer preview size (4:5-ish) with high-quality resample
        crop = upscale_for_use(crop)
        crop.save(path, optimize=True)
        saved.append((filename, crop.size))
        print("saved", filename, crop.size)

    # Overview contact sheet of the 11
    make_contact_sheet(saved)
    print("done", len(saved))


def trim_white_border(img: Image.Image, threshold: int = 248, pad: int = 2) -> Image.Image:
    arr = np.asarray(img.convert("RGB"))
    white = (
        (arr[:, :, 0] >= threshold)
        & (arr[:, :, 1] >= threshold)
        & (arr[:, :, 2] >= threshold)
    )
    content = ~white
    if not content.any():
        return img
    ys, xs = np.where(content)
    y0, y1 = max(0, ys.min() - pad), min(arr.shape[0], ys.max() + 1 + pad)
    x0, x1 = max(0, xs.min() - pad), min(arr.shape[1], xs.max() + 1 + pad)
    return img.crop((x0, y0, x1, y1))


def upscale_for_use(img: Image.Image, target_w: int = 720) -> Image.Image:
    w, h = img.size
    if w >= target_w:
        return img
    scale = target_w / w
    return img.resize((target_w, max(1, int(h * scale))), Image.Resampling.LANCZOS)


def make_contact_sheet(saved: list[tuple[str, tuple[int, int]]]) -> None:
    thumbs = []
    for name, _ in saved:
        im = Image.open(OUT / name).convert("RGB")
        im.thumbnail((160, 200), Image.Resampling.LANCZOS)
        thumbs.append(im)
    cols = 6
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 170, rows * 210), (255, 255, 255))
    for i, th in enumerate(thumbs):
        r, c = divmod(i, cols)
        sheet.paste(th, (c * 170 + 5, r * 210 + 5))
    sheet.save(OUT / "_contact_sheet.png")


if __name__ == "__main__":
    main()
