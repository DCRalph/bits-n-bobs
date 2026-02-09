"use client";

import { useEffect, useRef } from "react";
import { drawWaterfall } from "../lib/charts";
import type { WaterfallItem } from "../lib/charts";

interface WaterfallChartProps {
  items: WaterfallItem[];
}

export function WaterfallChart({ items }: WaterfallChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawWaterfall(canvasRef.current, items);
    }
  }, [items]);

  const unique = Array.from(
    new Map(items.map((item) => [item.color, item])).values()
  );

  return (
    <div>
      <canvas ref={canvasRef} width={700} height={300} className="max-w-full w-full" />
      <div className="flex flex-wrap gap-4 mt-4 text-xs justify-center">
        {unique.map((u, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: u.color }}
            />
            <span className="text-gray-300">{u.legendLabel ?? u.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
