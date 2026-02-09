"use client";

import { useEffect, useRef } from "react";
import { drawHorizontalBar } from "../lib/charts";
import type { ChartSegment } from "../lib/charts";

interface HorizontalBarChartProps {
  items: ChartSegment[];
}

export function HorizontalBarChart({ items }: HorizontalBarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawHorizontalBar(canvasRef.current, items);
    }
  }, [items]);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={Math.max(100, items.length * 40 + 30)}
      className="max-w-full w-full"
    />
  );
}
