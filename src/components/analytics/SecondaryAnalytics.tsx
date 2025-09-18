import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";

const pieData = [
  { name: "IP Complaint", value: 67, color: "hsl(var(--destructive))" },
  { name: "Safety Issue", value: 18, color: "hsl(var(--warning))" },
  { name: "Product Quality", value: 10, color: "hsl(var(--primary))" },
  { name: "Other", value: 5, color: "hsl(var(--muted-foreground))" },
];

const topOffendingAsins = [
  { asin: "B08X123ABC", product: "Wireless Headphones", violations: 3, status: "Active" },
  { asin: "B09Y456DEF", product: "Phone Case", violations: 2, status: "Resolved" },
  { asin: "B07Z789GHI", product: "Bluetooth Speaker", violations: 2, status: "In Progress" },
  { asin: "B06W234JKL", product: "Screen Protector", violations: 1, status: "Active" },
];

const chartConfig = {
  value: {
    label: "Percentage",
  },
};

export const SecondaryAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* Violation Breakdown Pie Chart */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Violation Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip 
                  content={<ChartTooltipContent />}
                />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
          <div className="flex flex-wrap gap-2 mt-4">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Offending ASINs */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Top Offending ASINs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topOffendingAsins.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{item.asin}</p>
                  <p className="text-xs text-muted-foreground truncate">{item.product}</p>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm font-medium">{item.violations}</span>
                  <Badge 
                    variant={item.status === "Active" ? "destructive" : item.status === "Resolved" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};