"use client";

type StabilityMeterProps = {
  stability: number; // 0 → 1
};

export default function StabilityMeter({ stability }: StabilityMeterProps) {
  const percentage = Math.round(stability * 100);

  return (
    <div className="w-full max-w-md">
      <h2 className="text-lg font-semibold mb-2">Coalition Stability</h2>

      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`h-4 ${
            percentage > 70
              ? "bg-green-500"
              : percentage > 40
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="mt-2 text-sm">
        Stability Score: <strong>{percentage}%</strong>
      </p>
    </div>
  );
}
