"use client";

import dynamic from "next/dynamic";

const ForceGraph2D = dynamic(
  () => import("react-force-graph-2d"),
  { ssr: false }
);

type Coalition = {
  members: string[];
  value: number;
};

type CoalitionGraphProps = {
  players: string[];
  coalitions: Coalition[];
};

export default function CoalitionGraph({
  players,
  coalitions,
}: CoalitionGraphProps) {
  const nodes = players.map((p) => ({ id: p }));

  const links = coalitions.flatMap((c) =>
    c.members.slice(1).map((m) => ({
      source: c.members[0],
      target: m,
      value: c.value,
    }))
  );

  return (
    <div className="w-full h-96">
      <h2 className="text-lg font-semibold mb-2">Coalition Structure</h2>

      <ForceGraph2D
        graphData={{ nodes, links }}
        nodeAutoColorBy="id"
        linkWidth={(link: any) => Math.max(1, link.value / 20)}
        linkLabel={(link: any) => `Value: ${link.value}`}
      />
    </div>
  );
}
