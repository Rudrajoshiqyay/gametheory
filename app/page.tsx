'use client';

import { useState } from 'react';
import PayoffChart from '@/components/PayoffChart';
import StabilityMeter from '@/components/StabilityMeter';
import CoalitionGraph from '@/components/CoalitionGraph';

type Player = {
  name: string;
  weight: number;
};

type AnalysisResult = {
  shapley: Record<string, number>;
  nucleolus: Record<string, number>;
  stability_score: number;
  coalitions: string[][];
};

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    { name: 'A', weight: 1 },
    { name: 'B', weight: 1 },
    { name: 'C', weight: 1 },
  ]);

  const [threshold, setThreshold] = useState<number>(2);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const updatePlayer = (i: number, key: keyof Player, value: string | number) => {
    const copy = [...players];
    // @ts-ignore
    copy[i][key] = value;
    setPlayers(copy);
  };

  const addPlayer = () => {
    setPlayers([...players, { name: `P${players.length + 1}`, weight: 1 }]);
  };

  const analyzeCoalition = async () => {
    setLoading(true);
    setResult(null);

    const res = await fetch('https://YOUR-BACKEND-URL/analyze-coalition', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        players,
        threshold,
      }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Coalition Builder</h1>

      {/* Players Input */}
      <div className="space-y-3">
        <h2 className="font-semibold">Players</h2>
        {players.map((p, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="border px-2 py-1 w-16"
              value={p.name}
              onChange={(e) => updatePlayer(i, 'name', e.target.value)}
            />
            <input
              type="number"
              className="border px-2 py-1 w-24"
              value={p.weight}
              onChange={(e) => updatePlayer(i, 'weight', Number(e.target.value))}
            />
          </div>
        ))}
        <button
          onClick={addPlayer}
          className="px-3 py-1 border rounded"
        >
          + Add Player
        </button>
      </div>

      {/* Threshold */}
      <div className="space-y-2">
        <h2 className="font-semibold">Winning Threshold</h2>
        <input
          type="number"
          className="border px-2 py-1 w-32"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
      </div>

      {/* Analyze */}
      <button
        onClick={analyzeCoalition}
        disabled={loading}
        className="px-4 py-2 bg-black text-white rounded"
      >
        {loading ? 'Analyzing...' : 'Analyze Coalition'}
      </button>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          <PayoffChart
            shapley={result.shapley}
            nucleolus={result.nucleolus}
          />

          <StabilityMeter score={result.stability_score} />

          <CoalitionGraph coalitions={result.coalitions} />
        </div>
      )}
    </div>
  );
}
