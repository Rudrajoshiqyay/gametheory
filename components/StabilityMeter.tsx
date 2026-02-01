"use client";

import React from "react";

type Props = {
  score: number;
};

export default function StabilityMeter({ score }: Props) {
  const pct = Math.max(0, Math.min(1, score)) * 100;
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">Stability</h3>
      <div className="mt-2">
        <div className="w-full bg-gray-200 h-4 rounded">
          <div className="bg-green-600 h-4 rounded" style={{ width: `${pct}%` }} />
        </div>
        <div className="text-sm mt-1">Score: {score.toFixed(3)}</div>
      </div>
    </div>
  );
}
