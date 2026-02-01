"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type PayoffChartProps = {
  shapley: Record<string, number>;
  nucleolus: Record<string, number>;
};

export default function PayoffChart({ shapley, nucleolus }: PayoffChartProps) {
  const data = Object.keys(shapley).map((player) => ({
    player,
    Shapley: shapley[player],
    Nucleolus: nucleolus[player],
  }));

  return (
    <div className="w-full h-80">
      <h2 className="text-lg font-semibold mb-2">Payoff Distribution</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="player" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Shapley" />
          <Bar dataKey="Nucleolus" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
