import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPIMetric {
  label: string;
  value: string;
  comparison: string;
  trend: "up" | "down" | "neutral";
  color?: "good" | "warning" | "danger" | "neutral";
  tooltip?: string;
}

interface KPIHeaderProps {
  activeCases: KPIMetric;
  avgResponseTime: KPIMetric;
  accountHealth: {
    score: number;
    status: "healthy" | "at-risk" | "unhealthy";
  };
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

const trendColors = {
  up: "text-success",
  down: "text-danger", 
  neutral: "text-muted-foreground",
};

const healthColors = {
  healthy: "bg-success text-success-foreground",
  "at-risk": "bg-warning text-warning-foreground",
  unhealthy: "bg-danger text-danger-foreground",
};

const healthLabels = {
  healthy: "Excellent",
  "at-risk": "At Risk", 
  unhealthy: "Needs Attention",
};

export function KPIHeader({ activeCases, avgResponseTime, accountHealth }: KPIHeaderProps) {
  const TrendIcon = trendIcons[activeCases.trend];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Active Cases */}
      <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-caption font-medium text-muted-foreground">{activeCases.label}</h3>
          <TrendIcon className={cn("h-4 w-4", trendColors[activeCases.trend])} />
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold font-tabular text-foreground">{activeCases.value}</p>
          <p className={cn("text-sm font-medium", trendColors[activeCases.trend])}>
            {activeCases.comparison}
          </p>
        </div>
      </div>

      {/* Average Response Time */}
      <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-caption font-medium text-muted-foreground">{avgResponseTime.label}</h3>
          {avgResponseTime.tooltip && (
            <div className="text-xs text-muted-foreground" title={avgResponseTime.tooltip}>
              ℹ️
            </div>
          )}
        </div>
        <div className="space-y-1">
          <p className="text-3xl font-bold font-tabular text-foreground">{avgResponseTime.value}</p>
          <p className="text-sm font-medium text-muted-foreground">
            {avgResponseTime.comparison}
          </p>
        </div>
      </div>

      {/* Account Health Score */}
      <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-caption font-medium text-muted-foreground">Account Health Score</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold",
            healthColors[accountHealth.status]
          )}>
            {accountHealth.score}
          </div>
          <div>
            <p className="text-2xl font-bold font-tabular text-foreground">{accountHealth.score}</p>
            <p className={cn(
              "text-sm font-medium",
              accountHealth.status === "healthy" ? "text-success" :
              accountHealth.status === "at-risk" ? "text-warning" : "text-danger"
            )}>
              {healthLabels[accountHealth.status]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}