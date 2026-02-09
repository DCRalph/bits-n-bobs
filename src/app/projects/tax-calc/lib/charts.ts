import { money } from "./utils";
import { CHART_COLORS } from "./constants";

export interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface ChartDataset {
  label: string;
  color: string;
  values: number[];
}

export interface WaterfallItem {
  label: string;
  value: number;
  color: string;
  type: "start" | "subtract" | "end";
  legendLabel?: string;
  _top?: number;
}

export function hiDpiCanvas(canvas: HTMLCanvasElement): {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
} {
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.width;
  const h = canvas.height;
  canvas.width = w * dpr;
  canvas.height = h * dpr;
  canvas.style.width = w + "px";
  canvas.style.height = h + "px";
  const ctx = canvas.getContext("2d")!;
  ctx.scale(dpr, dpr);
  return { ctx, w, h };
}

export function drawDonut(
  canvas: HTMLCanvasElement,
  segments: ChartSegment[],
  centerLines?: [string, string]
): void {
  const origW = 280,
    origH = 280;
  canvas.width = origW;
  canvas.height = origH;
  const { ctx, w, h } = hiDpiCanvas(canvas);

  const cx = w / 2,
    cy = h / 2;
  const outerR = Math.min(w, h) / 2 - 10;
  const innerR = outerR * 0.58;
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  if (total <= 0) return;

  let startAngle = -Math.PI / 2;
  segments.forEach((seg) => {
    const sliceAngle = (seg.value / total) * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
    ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = seg.color;
    ctx.fill();
    startAngle += sliceAngle;
  });

  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  if (centerLines) {
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.fillText(centerLines[0], cx, cy - 6);
    ctx.font = "13px system-ui, sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText(centerLines[1], cx, cy + 16);
  }
}

export function drawGroupedBar(
  canvas: HTMLCanvasElement,
  labels: string[],
  datasets: ChartDataset[]
): void {
  const origW = 500,
    origH = 280;
  canvas.width = origW;
  canvas.height = origH;
  const { ctx, w, h } = hiDpiCanvas(canvas);

  const pad = { top: 20, right: 20, bottom: 40, left: 65 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const allVals = datasets.flatMap((d) => d.values);
  const maxVal = Math.max(...allVals, 1);

  const groupW = chartW / labels.length;
  const barW = groupW / (datasets.length + 1);

  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 0.5;
  ctx.fillStyle = "#9ca3af";
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + chartH - (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    const val = (maxVal * i) / 4;
    ctx.fillText(
      "$" + Math.round(val).toLocaleString(),
      pad.left - 8,
      y + 4
    );
  }

  datasets.forEach((ds, di) => {
    ds.values.forEach((val, vi) => {
      const x = pad.left + vi * groupW + (di + 0.5) * barW;
      const barH = (val / maxVal) * chartH;
      const y = pad.top + chartH - barH;
      ctx.fillStyle = ds.color;
      ctx.beginPath();
      roundedRect(ctx, x, y, barW * 0.85, barH, 3);
      ctx.fill();
    });
  });

  ctx.fillStyle = "#9ca3af";
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "center";
  labels.forEach((l, i) => {
    const x = pad.left + i * groupW + groupW / 2;
    ctx.fillText(l, x, h - pad.bottom + 18);
  });
}

export function drawHorizontalBar(
  canvas: HTMLCanvasElement,
  items: ChartSegment[]
): void {
  const barH = 32;
  const gap = 8;
  const origH = Math.max(100, items.length * (barH + gap) + 30);
  const origW = 700;
  canvas.width = origW;
  canvas.height = origH;
  const { ctx, w } = hiDpiCanvas(canvas);

  const pad = { left: 120, right: 80 };
  const chartW = w - pad.left - pad.right;
  const maxVal = Math.max(...items.map((i) => i.value), 1);

  items.forEach((item, i) => {
    const y = i * (barH + gap) + 10;
    const bw = (item.value / maxVal) * chartW;

    ctx.fillStyle = item.color ?? CHART_COLORS[i % CHART_COLORS.length]!;
    ctx.beginPath();
    roundedRect(ctx, pad.left, y, Math.max(bw, 4), barH, 4);
    ctx.fill();

    ctx.fillStyle = "#d1d5db";
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(
      truncate(item.label, 16),
      pad.left - 8,
      y + barH / 2 + 4
    );

    ctx.fillStyle = "#9ca3af";
    ctx.textAlign = "left";
    ctx.fillText(money(item.value), pad.left + bw + 8, y + barH / 2 + 4);
  });
}

export function drawWaterfall(
  canvas: HTMLCanvasElement,
  items: WaterfallItem[]
): void {
  const origW = 700,
    origH = 300;
  canvas.width = origW;
  canvas.height = origH;
  const { ctx, w, h } = hiDpiCanvas(canvas);

  const pad = { top: 30, right: 20, bottom: 60, left: 65 };
  const chartW = w - pad.left - pad.right;
  const chartH = h - pad.top - pad.bottom;

  const maxVal = Math.max(...items.map((i) => i._top ?? i.value), 1);
  const barW = Math.min((chartW / items.length) * 0.65, 60);
  const groupW = chartW / items.length;

  ctx.strokeStyle = "#374151";
  ctx.lineWidth = 0.5;
  ctx.fillStyle = "#9ca3af";
  ctx.font = "11px system-ui, sans-serif";
  ctx.textAlign = "right";
  for (let i = 0; i <= 4; i++) {
    const y = pad.top + chartH - (i / 4) * chartH;
    ctx.beginPath();
    ctx.moveTo(pad.left, y);
    ctx.lineTo(w - pad.right, y);
    ctx.stroke();
    ctx.fillText(
      "$" + Math.round((maxVal * i) / 4).toLocaleString(),
      pad.left - 8,
      y + 4
    );
  }

  let running = 0;
  items.forEach((item, i) => {
    const x = pad.left + i * groupW + (groupW - barW) / 2;

    let barBottom, barHeight;
    if (item.type === "start") {
      running = item.value;
      barBottom = 0;
      barHeight = (item.value / maxVal) * chartH;
    } else if (item.type === "subtract") {
      running -= item.value;
      barBottom = (running / maxVal) * chartH;
      barHeight = (item.value / maxVal) * chartH;
    } else {
      barBottom = 0;
      barHeight = (item.value / maxVal) * chartH;
    }

    const y = pad.top + chartH - barBottom - barHeight;

    ctx.fillStyle = item.color;
    ctx.beginPath();
    roundedRect(ctx, x, y, barW, barHeight, 3);
    ctx.fill();

    if (i > 0 && i < items.length - 1 && item.type === "subtract") {
      const prevX =
        pad.left + (i - 1) * groupW + (groupW - barW) / 2 + barW;
      const lineY = y + barHeight;
      ctx.strokeStyle = "#4b5563";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(prevX, lineY);
      ctx.lineTo(x, lineY);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = "#d1d5db";
    ctx.font = "10px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(money(item.value), x + barW / 2, y - 6);
  });

  ctx.fillStyle = "#9ca3af";
  ctx.font = "10px system-ui, sans-serif";
  ctx.textAlign = "center";
  items.forEach((item, i) => {
    const x = pad.left + i * groupW + groupW / 2;
    const lines = wrapText(item.label, 10);
    lines.forEach((line, li) => {
      ctx.fillText(line, x, h - pad.bottom + 14 + li * 13);
    });
  });
}

export function drawGauge(
  canvas: HTMLCanvasElement,
  segments: ChartSegment[],
  total: number
): void {
  const origW = 700,
    origH = 100;
  canvas.width = origW;
  canvas.height = origH;
  const { ctx, w } = hiDpiCanvas(canvas);

  const pad = { left: 20, right: 20, top: 25, bottom: 35 };
  const barW = w - pad.left - pad.right;
  const barH = 36;
  const barY = pad.top;

  ctx.fillStyle = "#1f2937";
  ctx.beginPath();
  roundedRect(ctx, pad.left, barY, barW, barH, 8);
  ctx.fill();

  let x = pad.left;
  segments.forEach((seg, i) => {
    const sw = (seg.value / total) * barW;
    if (sw < 1) return;
    ctx.fillStyle = seg.color;
    ctx.beginPath();
    if (i === 0) {
      roundedRectLeft(ctx, x, barY, sw, barH, 8);
    } else if (i === segments.length - 1 || x + sw >= pad.left + barW - 1) {
      roundedRectRight(ctx, x, barY, sw, barH, 8);
    } else {
      ctx.rect(x, barY, sw, barH);
    }
    ctx.fill();

    if (sw > 55) {
      ctx.fillStyle = "#fff";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(money(seg.value), x + sw / 2, barY + barH / 2 + 4);
    }
    x += sw;
  });

  ctx.font = "10px system-ui, sans-serif";
  ctx.textAlign = "center";
  x = pad.left;
  segments.forEach((seg) => {
    const sw = (seg.value / total) * barW;
    if (sw > 40) {
      ctx.fillStyle = "#9ca3af";
      const pct = ((seg.value / total) * 100).toFixed(0);
      ctx.fillText(seg.label + " " + pct + "%", x + sw / 2, barY + barH + 16);
    }
    x += sw;
  });
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  if (h < 0) {
    y += h;
    h = -h;
  }
  r = Math.min(r, h / 2, w / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
}

function roundedRectLeft(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  r = Math.min(r, h / 2, w / 2);
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
}

function roundedRectRight(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  r = Math.min(r, h / 2, w / 2);
  ctx.moveTo(x, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x, y);
}

function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max - 1) + "…" : str;
}

function wrapText(str: string, max: number): string[] {
  if (str.length <= max) return [str];
  const mid = str.lastIndexOf(" ", max);
  if (mid > 0) return [str.slice(0, mid), str.slice(mid + 1)];
  return [str.slice(0, max), str.slice(max)];
}
