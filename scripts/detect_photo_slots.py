"""Detect gray photo-placeholder regions in each template PNG."""
from __future__ import annotations

import json
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(r"E:\Workarea\ai_project\photo_editor\frontend\public\templates")
CANVAS_W, CANVAS_H = 1080, 1350


def largest_gray_bbox(arr: np.ndarray) -> tuple[int, int, int, int] | None:
    r, g, b = arr[:, :, 0].astype(int), arr[:, :, 1].astype(int), arr[:, :, 2].astype(int)
    # Gray-ish placeholder fill (silhouette areas, "ADD PHOTO" boxes)
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    mean = (r + g + b) / 3.0
    gray = (mx - mn < 28) & (mean > 140) & (mean < 220)

    # Also catch slightly blue-gray / warm-gray placeholders
    soft = (mx - mn < 45) & (mean > 155) & (mean < 210)
    mask = gray | soft

    if mask.mean() < 0.01:
        return None

    # Morphological close via max/min
    from PIL import ImageFilter

    m = Image.fromarray(mask.astype(np.uint8) * 255)
    m = m.filter(ImageFilter.MaxFilter(7))
    m = m.filter(ImageFilter.MinFilter(5))
    mask = np.asarray(m) > 127

    # Connected components — keep largest
    h, w = mask.shape
    visited = np.zeros_like(mask, dtype=bool)
    best = None
    best_count = 0

    for y in range(h):
        for x in range(w):
            if not mask[y, x] or visited[y, x]:
                continue
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
            if count > best_count:
                best_count = count
                best = (minx, miny, maxx, maxy)

    return best


def shape_for(name: str, w: int, h: int) -> str:
    ratio = w / max(h, 1)
    if "heritage" in name or "global" in name:
        return "ellipse"
    if "united" in name:
        return "circle"
    if "paint" in name:
        return "ellipse"
    if abs(ratio - 1.0) < 0.12 and min(w, h) > 80:
        return "circle"
    if ratio < 0.75:
        return "ellipse"
    return "rect"


def main() -> None:
    results = {}
    for path in sorted(ROOT.glob("template-*.png")):
        im = Image.open(path).convert("RGB")
        arr = np.asarray(im)
        h, w = arr.shape[:2]
        box = largest_gray_bbox(arr)
        if not box:
            print("NO_BOX", path.name)
            continue
        x0, y0, x1, y1 = box
        # inset slightly so we sit inside frame borders
        pad_x = max(2, int((x1 - x0) * 0.03))
        pad_y = max(2, int((y1 - y0) * 0.03))
        x0 += pad_x
        y0 += pad_y
        x1 -= pad_x
        y1 -= pad_y

        # Scale to canvas while using cover-fit of template art
        # Template is drawn with coverDraw onto 1080x1350 — compute same transform
        img_ratio = w / h
        canvas_ratio = CANVAS_W / CANVAS_H
        if img_ratio > canvas_ratio:
            dh = CANVAS_H
            dw = dh * img_ratio
        else:
            dw = CANVAS_W
            dh = dw / img_ratio
        ox = (CANVAS_W - dw) / 2
        oy = (CANVAS_H - dh) / 2
        sx = dw / w
        sy = dh / h

        cx0 = int(ox + x0 * sx)
        cy0 = int(oy + y0 * sy)
        cw = int((x1 - x0 + 1) * sx)
        ch = int((y1 - y0 + 1) * sy)

        shape = shape_for(path.name, x1 - x0, y1 - y0)
        results[path.name] = {
            "src_box": [int(x0), int(y0), int(x1), int(y1)],
            "canvas": {"x": cx0, "y": cy0, "w": cw, "h": ch},
            "shape": shape,
            "src_size": [w, h],
        }
        print(
            f"{path.name}: src=({x0},{y0},{x1},{y1}) canvas=({cx0},{cy0},{cw},{ch}) {shape}"
        )

        # debug overlay
        dbg = im.copy()
        from PIL import ImageDraw

        d = ImageDraw.Draw(dbg)
        d.rectangle([x0, y0, x1, y1], outline=(255, 0, 0), width=3)
        dbg.save(ROOT / f"_slot_{path.stem}.png")

    out = ROOT.parent.parent / "lib" / "templates" / "photo-slots.json"
    out.write_text(json.dumps(results, indent=2), encoding="utf-8")
    print("wrote", out)


if __name__ == "__main__":
    main()
