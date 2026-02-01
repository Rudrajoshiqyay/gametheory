"use client";

import React from "react";

type Props = {
  coalitions: string[][];
};

export default function CoalitionGraph({ coalitions }: Props) {
  return (
    <div className="p-4 border rounded">
      <h3 className="font-semibold">Coalitions</h3>
      <ul className="mt-2 space-y-1">
        {coalitions.map((c, i) => (
          <li key={i}>• {c.join(' + ')}</li>
        ))}
      </ul>
    </div>
  );
}
