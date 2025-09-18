import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ChartData {
  date: string;
  casesOpened: number;
  casesResolved: number;
  avgResponseTime: number;
  odr: number;
  asinCount: number;
}

interface PerformanceTrendChartProps {
  data: ChartData[];
}

const dateRanges = [
  { label: "7D", value: 7 },
  { label: "30D", value: 30 },
  { label: "90D", value: 90 },
];

const metrics = [
  { 
    key: "casesOpened", 
    label: "Cases Opened", 
    color: "hsl(var(--warning))",
    axis: "right",
    formatter: (value: number) => value.toString()
  },
  { 
    key: "casesResolved", 
    label: "Cases Resolved", 
    color: "hsl(var(--success))",
    axis: "right",
    formatter: (value: number) => value.toString()
  },
  { 
    key: "avgResponseTime", 
    label: "Avg Response Time (hrs)", 
    color: "hsl(var(--info))",
    axis: "left",
    formatter: (value: number) => `${value}h`
  },
  { 
    key: "odr", 
    label: "ODR (%)", 
    color: "hsl(var(--primary))",
    axis: "left",
    formatter: (value: number) => `${value}%`
  },
  { 
    key: "asinCount", 
    label: "ASINs Monitored", 
    color: "hsl(var(--secondary))",
    axis: "right",
    formatter: (value: number) => value.toLocaleString()
  },
];

export function PerformanceTrendChart({ data }: PerformanceTrendChartProps) {
  const [selectedRange, setSelectedRange] = useState(30);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["casesOpened", "casesResolved"]);

  // Filter data based on selected date range
  const filteredData = data.slice(-selectedRange);

  const toggleMetric = (metricKey: string) => {
    setSelectedMetrics(prev => 
      prev.includes(metricKey) 
        ? prev.filter(m => m !== metricKey)
        : [...prev, metricKey]
    );
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload.map((entry: any, index: number) => {
            const metric = metrics.find(m => m.key === entry.dataKey);
            return (
              <p key={index} className="text-sm" style={{ color: entry.color }}>
                {metric?.label}: {metric?.formatter(entry.value)}
              </p>
            );
          })}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Performance Trend</h2>
        
        {/* Date Range Selector */}
        <div className="flex gap-2">
          {dateRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range.value)}
              className="text-xs"
            >
              {range.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Metric Toggles */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <Badge
            key={metric.key}
            variant={selectedMetrics.includes(metric.key) ? "default" : "outline"}
            className={cn(
              "cursor-pointer transition-all",
              selectedMetrics.includes(metric.key) 
                ? "opacity-100" 
                : "opacity-60 hover:opacity-80"
            )}
            onClick={() => toggleMetric(metric.key)}
            style={selectedMetrics.includes(metric.key) ? { 
              backgroundColor: metric.color, 
              borderColor: metric.color,
              color: "white"
            } : {}}
          >
            {metric.label}
          </Badge>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="date" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedMetrics.map((metricKey) => {
              const metric = metrics.find(m => m.key === metricKey);
              if (!metric) return null;
              
              return (
                <Line
                  key={metricKey}
                  yAxisId={metric.axis}
                  type="monotone"
                  dataKey={metricKey}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={{ fill: metric.color, strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, stroke: metric.color, strokeWidth: 2 }}
                  name={metric.label}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}