import type { PhotoShape, PhotoSlot, TemplateCanvas } from "@/lib/templates";

export type PhotoTransform = {
  scale: number;
  offsetX: number;
  offsetY: number;
};

const templateImageCache = new Map<string, HTMLImageElement>();

export function loadTemplateImage(src: string): Promise<HTMLImageElement> {
  const cached = templateImageCache.get(src);
  if (cached?.complete && cached.naturalWidth > 0) {
    return Promise.resolve(cached);
  }

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      templateImageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => reject(new Error(`Failed to load template: ${src}`));
    img.src = src;
  });
}

/** Same cover-fit used to draw template art onto the export canvas */
export function coverLayout(
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number
) {
  const imgRatio = imgW / imgH;
  const canvasRatio = canvasW / canvasH;
  let dw: number;
  let dh: number;
  if (imgRatio > canvasRatio) {
    dh = canvasH;
    dw = dh * imgRatio;
  } else {
    dw = canvasW;
    dh = dw / imgRatio;
  }
  return {
    dw,
    dh,
    ox: (canvasW - dw) / 2,
    oy: (canvasH - dh) / 2,
  };
}

/** Map a photo slot (fractions of the PNG) onto canvas pixels */
export function slotToCanvasRect(
  slot: PhotoSlot,
  imgW: number,
  imgH: number,
  canvasW: number,
  canvasH: number
) {
  const { dw, dh, ox, oy } = coverLayout(imgW, imgH, canvasW, canvasH);
  return {
    x: ox + slot.x * imgW * (dw / imgW),
    y: oy + slot.y * imgH * (dh / imgH),
    w: slot.w * dw,
    h: slot.h * dh,
  };
}

function drawCoverImage(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  rect: { x: number; y: number; w: number; h: number },
  transform: PhotoTransform,
  shape: PhotoShape
) {
  const { scale, offsetX, offsetY } = transform;
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const rectRatio = rect.w / rect.h;

  let drawW: number;
  let drawH: number;

  if (imgRatio > rectRatio) {
    drawH = rect.h * scale;
    drawW = drawH * imgRatio;
  } else {
    drawW = rect.w * scale;
    drawH = drawW / imgRatio;
  }

  const cx = rect.x + rect.w / 2 + offsetX;
  const cy = rect.y + rect.h / 2 + offsetY;

  ctx.save();
  ctx.beginPath();
  if (shape === "circle") {
    const r = Math.min(rect.w, rect.h) / 2;
    ctx.arc(rect.x + rect.w / 2, rect.y + rect.h / 2, r, 0, Math.PI * 2);
  } else if (shape === "ellipse") {
    ctx.ellipse(
      rect.x + rect.w / 2,
      rect.y + rect.h / 2,
      rect.w / 2,
      rect.h / 2,
      0,
      0,
      Math.PI * 2
    );
  } else {
    roundRect(ctx, rect.x, rect.y, rect.w, rect.h, Math.min(24, rect.w * 0.06));
  }
  ctx.clip();
  ctx.drawImage(img, cx - drawW / 2, cy - drawH / 2, drawW, drawH);
  ctx.restore();
}

export function composeCanvas(
  canvas: HTMLCanvasElement,
  template: TemplateCanvas,
  photo: HTMLImageElement | null,
  transform: PhotoTransform,
  templateArt: HTMLImageElement | null
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const { width: w, height: h, photo: slot, photoShape } = template;
  canvas.width = w;
  canvas.height = h;

  ctx.fillStyle = "#fdfbf7";
  ctx.fillRect(0, 0, w, h);

  if (templateArt) {
    const { dw, dh, ox, oy } = coverLayout(
      templateArt.naturalWidth,
      templateArt.naturalHeight,
      w,
      h
    );
    ctx.drawImage(templateArt, ox, oy, dw, dh);

    if (photo) {
      const rect = slotToCanvasRect(
        slot,
        templateArt.naturalWidth,
        templateArt.naturalHeight,
        w,
        h
      );
      drawCoverImage(ctx, photo, rect, transform, photoShape);
    }
  } else if (photo) {
    // Fallback before art loads
    const rect = {
      x: slot.x * w,
      y: slot.y * h,
      w: slot.w * w,
      h: slot.h * h,
    };
    drawCoverImage(ctx, photo, rect, transform, photoShape);
  }
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

export function canvasToPngBlob(
  canvas: HTMLCanvasElement
): Promise<Blob | null> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), "image/png");
  });
}
