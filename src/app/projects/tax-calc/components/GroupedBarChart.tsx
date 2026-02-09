"use client";

import { useEffect, useRef } from "react";
import { drawGroupedBar } from "../lib/charts";
import type { ChartDataset } from "../lib/charts";

interface GroupedBarChartProps {
  labels: string[];
  datasets: ChartDataset[];
}

export function GroupedBarChart({ labels, datasets }: GroupedBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawGroupedBar(canvasRef.current, labels, datasets);
    }
  }, [labels, datasets]);

  return (
    <div className="flex flex-col">
      <canvas ref={canvasRef} width={500} height={280} className="max-w-full" />
      <div className="flex gap-6 mt-4 text-sm justify-center">
        {datasets.map((ds, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: ds.color }}
            />
            <span className="text-gray-300">{ds.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
