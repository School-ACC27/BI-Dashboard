import {
  BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

interface NPSChartProps {
  data: { customer: number; score: number }[];
}

export function NPSChart({ data }: NPSChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ bottom: 30 }}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis 
          dataKey="customer"
          label={{ 
            value: "Customer Number", 
            position: "bottom", 
            offset: 10 
          }}
        />

        <YAxis 
          domain={[0, 5]} 
          label={{ value: "Rating", angle: -90, position: "insideLeft" }}
        />

        <Tooltip formatter={(value) => [`${value}/5`, "Score"]} />

        <Bar 
          dataKey="score" 
          fill="#00C49F" 
          name="Customer Score" 
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
