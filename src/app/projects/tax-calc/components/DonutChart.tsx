"use client";

import { useEffect, useRef } from "react";
import { drawDonut } from "../lib/charts";
import type { ChartSegment } from "../lib/charts";

interface DonutChartProps {
  segments: ChartSegment[];
  centerLines?: [string, string];
}

export function DonutChart({ segments, centerLines }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawDonut(canvasRef.current, segments, centerLines);
    }
  }, [segments, centerLines]);

  const total = segments.reduce((s, seg) => s + seg.value, 0);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={280}
        height={280}
        className="max-w-full"
      />
      <div className="flex flex-wrap gap-x-5 gap-y-1 mt-4 text-sm justify-center">
        {segments.map((seg, i) => {
          const pct = total > 0 ? ((seg.value / total) * 100).toFixed(1) : "0";
          return (
            <div key={i} className="flex items-center gap-1.5">
              <span
                className="inline-block w-3 h-3 rounded-sm shrink-0"
                style={{ background: seg.color }}
              />
              <span className="text-gray-300">{seg.label}</span>
              <span className="text-gray-500">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
