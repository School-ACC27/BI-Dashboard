import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ProductDistributionChartProps {
  data: { name: string; count: number }[];
}

export function ProductDistributionChart({ data }: ProductDistributionChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#0088FE" name="Customers" />
      </BarChart>
    </ResponsiveContainer>
  );
}
