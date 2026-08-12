"""Crop clean hero + vibe photos from the landing mockup."""
from pathlib import Path
from PIL import Image

src = Path(
    r"C:\Users\ADMIN\.cursor\projects\e-Workarea-ai-project-photo-editor-frontend\assets\c__Users_ADMIN_AppData_Roaming_Cursor_User_workspaceStorage_72ee21b497f128d6347dd0436c6c597a_images_image-b7dcd3dc-ced8-4069-9a3e-7a15a65089f0.png"
)
out = Path(r"E:\Workarea\ai_project\photo_editor\frontend\public\home")
out.mkdir(parents=True, exist_ok=True)

im = Image.open(src).convert("RGB")

# Hero: photo inside the rounded card (skip outer cream page)
# Vibe: only the photo tiles (not the title row under each card)
crops = {
    # slightly inset to avoid white card chrome
    "hero-preview.png": (318, 34, 568, 348),
    # vibe images only — cut before the label strip
    "vibe-hero.png": (32, 394, 154, 520),
    "vibe-cinema.png": (172, 394, 294, 520),
    "vibe-cartoon.png": (312, 394, 434, 520),
    "vibe-anime.png": (452, 394, 574, 520),
}

for name, box in crops.items():
    crop = im.crop(box)
    scale = 4
    crop = crop.resize((crop.width * scale, crop.height * scale), Image.Resampling.LANCZOS)
    crop.save(out / name, optimize=True, quality=92)
    print("saved", name, crop.size)
