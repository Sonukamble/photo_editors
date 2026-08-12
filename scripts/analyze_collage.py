from PIL import Image
import numpy as np
from pathlib import Path

src = Path(
    r"C:\Users\ADMIN\.cursor\projects\e-Workarea-ai-project-photo-editor-frontend\assets\c__Users_ADMIN_AppData_Roaming_Cursor_User_workspaceStorage_72ee21b497f128d6347dd0436c6c597a_images_Gemini_Generated_Image_3bqogj3bqogj3bqo-63298725-e9cb-42bc-8dc7-35f162648358.png"
)
im = Image.open(src).convert("RGB")
arr = np.asarray(im)
h, w = arr.shape[:2]
print("size", w, h)

white = (arr[:, :, 0] > 245) & (arr[:, :, 1] > 245) & (arr[:, :, 2] > 245)
print("white_ratio", float(white.mean()))

col_white = white.mean(axis=0)
row_white = white.mean(axis=1)
v_gutter = col_white > 0.85
h_gutter = row_white > 0.85


def runs(mask):
    segs = []
    start = None
    for i, v in enumerate(mask):
        if v and start is None:
            start = i
        if (not v) and start is not None:
            segs.append((start, i - 1))
            start = None
    if start is not None:
        segs.append((start, len(mask) - 1))
    return segs


print("v_gutter_runs", runs(v_gutter))
print("h_gutter_runs", runs(h_gutter))
print("content_col_runs", runs(~v_gutter))
print("content_row_runs", runs(~h_gutter))

# Save a debug visualization of white mask
dbg = (white.astype(np.uint8) * 255)
Image.fromarray(dbg).save(r"E:\Workarea\ai_project\photo_editor\frontend\public\templates\_debug_white.png")
print("wrote debug white mask")
