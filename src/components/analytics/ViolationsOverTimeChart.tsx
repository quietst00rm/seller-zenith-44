import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jul", violations: 12, resolved: 8 },
  { month: "Aug", violations: 15, resolved: 11 },
  { month: "Sep", violations: 8, resolved: 13 },
  { month: "Oct", violations: 6, resolved: 9 },
  { month: "Nov", violations: 4, resolved: 7 },
  { month: "Dec", violations: 3, resolved: 5 },
];

const chartConfig = {
  violations: {
    label: "New Violations",
    color: "hsl(var(--destructive))",
  },
  resolved: {
    label: "Resolved Cases",
    color: "hsl(var(--primary))",
  },
};

export const ViolationsOverTimeChart = () => {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle>Violations Over Time (Last 6 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="month" 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <YAxis 
                tick={{ fill: "hsl(var(--muted-foreground))" }}
                axisLine={{ stroke: "hsl(var(--border))" }}
              />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                cursor={{ fill: "hsl(var(--muted) / 0.1)" }}
              />
              <Bar 
                dataKey="violations" 
                fill="var(--color-violations)" 
                radius={[2, 2, 0, 0]}
                name="New Violations"
              />
              <Bar 
                dataKey="resolved" 
                fill="var(--color-resolved)" 
                radius={[2, 2, 0, 0]}
                name="Resolved Cases"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};