"use client";

import React from "react";

type Props = {
  shapley: Record<string, number>;
  nucleolus: Record<string, number>;
};

export default function PayoffChart({ shapley, nucleolus }: Props) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">Payoff Comparison</h3>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <h4 className="text-sm font-medium">Shapley</h4>
          <ul>
            {Object.entries(shapley).map(([k, v]) => (
              <li key={k}>{k}: {v.toFixed(3)}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-medium">Nucleolus</h4>
          <ul>
            {Object.entries(nucleolus).map(([k, v]) => (
              <li key={k}>{k}: {v.toFixed(3)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
