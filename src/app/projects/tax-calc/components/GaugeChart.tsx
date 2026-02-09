"use client";

import { useEffect, useRef } from "react";
import { drawGauge } from "../lib/charts";
import { money } from "../lib/utils";
import type { ChartSegment } from "../lib/charts";

interface GaugeChartProps {
  segments: ChartSegment[];
  total: number;
}

export function GaugeChart({ segments, total }: GaugeChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawGauge(canvasRef.current, segments, total);
    }
  }, [segments, total]);

  return (
    <div>
      <canvas ref={canvasRef} width={700} height={100} className="max-w-full w-full" />
      <div className="flex flex-wrap gap-4 mt-4 text-xs justify-center">
        {segments.map((seg, i) => {
          const pct = total > 0 ? ((seg.value / total) * 100).toFixed(1) : "0";
          return (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm"
                style={{ background: seg.color }}
              />
              <span className="text-gray-300">{seg.label}</span>
              <span className="text-gray-500">
                {money(seg.value)} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
