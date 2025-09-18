import { AlertTriangle, AlertCircle, Clock, Target, DollarSign, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface KPIMetrics {
  openViolations: number;
  openCritical: number;
  slaAtRisk: number;
  meanTimeToResolution: number;
  atRiskSales: number;
  repeatViolationRate: number;
}

interface ViolationsKPIGridProps {
  metrics: KPIMetrics;
}

interface KPICardData {
  icon: React.ReactNode;
  title: string;
  value: string;
  trend: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    color: 'success' | 'danger' | 'warning' | 'neutral';
  };
}

export function ViolationsKPIGrid({ metrics }: ViolationsKPIGridProps) {
  const kpiCards: KPICardData[] = [
    {
      icon: <AlertTriangle className="h-5 w-5 text-warning" />,
      title: "Open Violations",
      value: metrics.openViolations.toString(),
      trend: {
        value: "+20%",
        direction: "up",
        color: "success"
      }
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-danger" />,
      title: "Open Critical",
      value: metrics.openCritical.toString(),
      trend: {
        value: "+100%",
        direction: "up", 
        color: "danger"
      }
    },
    {
      icon: <Clock className="h-5 w-5 text-info" />,
      title: "SLA at Risk (<12h)",
      value: metrics.slaAtRisk.toString(),
      trend: {
        value: "0%",
        direction: "neutral",
        color: "neutral"
      }
    },
    {
      icon: <Target className="h-5 w-5 text-secondary" />,
      title: "Mean Time to Resolution",
      value: `${metrics.meanTimeToResolution}d`,
      trend: {
        value: "+18%",
        direction: "up",
        color: "success"
      }
    },
    {
      icon: <DollarSign className="h-5 w-5 text-success" />,
      title: "At-Risk Sales (Open)",
      value: `$${(metrics.atRiskSales / 1000).toFixed(0)}K`,
      trend: {
        value: "+7.6%",
        direction: "up",
        color: "danger"
      }
    },
    {
      icon: <RotateCcw className="h-5 w-5 text-warning" />,
      title: "Repeat Violation Rate", 
      value: `${metrics.repeatViolationRate}%`,
      trend: {
        value: "+16%",
        direction: "up",
        color: "danger"
      }
    }
  ];

  const getTrendColorClass = (color: string, direction: string) => {
    if (direction === 'neutral') return 'text-muted-foreground';
    
    switch (color) {
      case 'success':
        return 'text-success';
      case 'danger':
        return 'text-danger';
      case 'warning':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up':
        return '↗';
      case 'down':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiCards.map((card, index) => (
        <Card key={index} className="border-border/50 shadow-card hover:shadow-card-hover transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {card.icon}
                  <h3 className="text-sm font-medium text-muted-foreground leading-tight">
                    {card.title}
                  </h3>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-foreground font-tabular">
                    {card.value}
                  </p>
                  <p className={cn(
                    "text-xs font-medium flex items-center gap-1",
                    getTrendColorClass(card.trend.color, card.trend.direction)
                  )}>
                    <span>{getTrendIcon(card.trend.direction)}</span>
                    {card.trend.value}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}