import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface Metric {
  id: number;
  name: string;
  description: string;
}

interface CRMMetricsInfoProps {
  metrics: Metric[];
}

export function CRMMetricsInfo({ metrics }: CRMMetricsInfoProps) {
  const colors = ["bg-teal-600", "bg-teal-500", "bg-teal-400", "bg-teal-300"];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>CRM Metrics</CardTitle>
        <CardDescription>Key performance indicators for customer relationship management</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <div
              key={metric.id}
              className={`${colors[index]} text-white p-4 rounded-lg flex items-start gap-4`}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 flex-shrink-0">
                <span className="text-lg font-bold">0{metric.id}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1">{metric.name}</h4>
                <p className="text-sm text-white/90">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
