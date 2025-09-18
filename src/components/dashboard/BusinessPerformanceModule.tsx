import { Package, TrendingUp, ShoppingCart, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PerformanceMetric {
  id: string;
  name: string;
  value: string;
  status?: "good" | "warning" | "danger" | "neutral";
  subtitle?: string;
  comparison?: string;
  comparisonTrend?: "up" | "down" | "neutral";
  actionLabel?: string;
  actionHref?: string;
  icon?: "package" | "trending" | "cart" | "clock";
}

interface BusinessPerformanceModuleProps {
  metrics: PerformanceMetric[];
}

const metricIcons = {
  package: Package,
  trending: TrendingUp,
  cart: ShoppingCart,
  clock: Clock,
};

const statusStyles = {
  good: "bg-success-light text-success border-success/20",
  warning: "bg-warning-light text-warning border-warning/20",
  danger: "bg-danger-light text-danger border-danger/20",
  neutral: "bg-muted text-muted-foreground border-border/50",
};

const trendColors = {
  up: "text-success",
  down: "text-danger",
  neutral: "text-muted-foreground",
};

export function BusinessPerformanceModule({ metrics }: BusinessPerformanceModuleProps) {
  return (
    <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50 h-fit">
      <h2 className="text-lg font-semibold text-foreground mb-6">Business Performance</h2>
      
      <div className="space-y-6">
        {metrics.map((metric) => {
          const IconComponent = metric.icon ? metricIcons[metric.icon] : null;
          
          return (
            <div key={metric.id} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {IconComponent && (
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      <IconComponent className="h-4 w-4" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-foreground">{metric.name}</h3>
                    {metric.subtitle && (
                      <p className="text-xs text-muted-foreground">{metric.subtitle}</p>
                    )}
                  </div>
                </div>
                {metric.status && (
                  <Badge 
                    variant="outline"
                    className={cn("text-xs", statusStyles[metric.status])}
                  >
                    {metric.status === "good" ? "Excellent" : 
                     metric.status === "warning" ? "At Risk" : 
                     metric.status === "danger" ? "Poor" : "Normal"}
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-2xl font-bold font-tabular text-foreground">
                    {metric.value}
                  </p>
                  {metric.comparison && (
                    <p className={cn(
                      "text-sm font-medium",
                      metric.comparisonTrend ? trendColors[metric.comparisonTrend] : "text-muted-foreground"
                    )}>
                      {metric.comparisonTrend === "up" && "↗ "}
                      {metric.comparisonTrend === "down" && "↘ "}
                      {metric.comparison}
                    </p>
                  )}
                </div>
                
                {metric.actionLabel && metric.actionHref && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary hover:text-primary-glow text-xs"
                    onClick={() => window.location.href = metric.actionHref}
                  >
                    {metric.actionLabel} →
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}