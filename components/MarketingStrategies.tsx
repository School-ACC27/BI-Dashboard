import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle2 } from "lucide-react";

interface MarketingStrategy {
  id: number;
  strategy: string;
}

interface MarketingStrategiesProps {
  strategies: MarketingStrategy[];
}

export function MarketingStrategies({ strategies }: MarketingStrategiesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Marketing Strategies</CardTitle>
        <CardDescription>DaBest Bank's active marketing initiatives</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {strategies.map((strategy) => (
            <div
              key={strategy.id}
              className="flex items-start gap-2 p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{strategy.strategy}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
