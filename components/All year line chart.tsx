import {
  LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

import { useState } from "react";

interface NPSLineChartProps {
  data: { year: string; average: number }[];
}

export function NPSLineChart({ data }: NPSLineChartProps) {
  const [selectedRound, setSelectedRound] = useState<number | "all">("all");
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="year" />

        <YAxis domain={[0, 5]} />

        <Tooltip formatter={(value) => [`${value}/5`, "Average NPS"]} />

        <Line
          type="monotone"
          dataKey="average"
          stroke="#3b82f6"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}