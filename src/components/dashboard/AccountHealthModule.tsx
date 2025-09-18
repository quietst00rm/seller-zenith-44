import { AlertTriangle, FileText, Users, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HealthAlert {
  id: string;
  type: "critical" | "warning" | "info";
  message: string;
  count?: number;
  actionLabel: string;
  actionHref: string;
  icon: "complaint" | "suspension" | "response" | "clock";
}

interface HealthMetric {
  name: string;
  value: string;
  status: "good" | "warning" | "danger";
  target: string;
  actionLabel: string;
  actionHref: string;
  description?: string;
}

interface AccountHealthModuleProps {
  alerts: HealthAlert[];
  metrics: HealthMetric[];
}

const alertIcons = {
  complaint: AlertTriangle,
  suspension: FileText,
  response: Users,
  clock: Clock,
};

const alertColors = {
  critical: "text-danger bg-danger-light border-danger/20",
  warning: "text-warning bg-warning-light border-warning/20", 
  info: "text-info bg-info-light border-info/20",
};

const statusStyles = {
  good: "bg-success-light text-success border-success/20",
  warning: "bg-warning-light text-warning border-warning/20",
  danger: "bg-danger-light text-danger border-danger/20",
};

export function AccountHealthModule({ alerts, metrics }: AccountHealthModuleProps) {
  return (
    <div className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50 h-fit">
      <h2 className="text-lg font-semibold text-foreground mb-6">Account Health & Alerts</h2>
      
      {/* Urgent Alerts Section */}
      {alerts.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Urgent Alerts</h3>
          <div className="space-y-3">
            {alerts.map((alert) => {
              const IconComponent = alertIcons[alert.icon];
              return (
                <div 
                  key={alert.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg border",
                    alertColors[alert.type]
                  )}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium">
                      {alert.count && `${alert.count} `}{alert.message}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-current hover:bg-current/10"
                    onClick={() => window.location.href = alert.actionHref}
                  >
                    {alert.actionLabel} →
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Health Metrics */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground">Health Metrics</h3>
        {metrics.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{metric.name}</span>
                {metric.description && (
                  <div 
                    className="text-xs text-muted-foreground cursor-help"
                    title={metric.description}
                  >
                    ℹ️
                  </div>
                )}
              </div>
              <Badge 
                variant="outline"
                className={cn("text-xs", statusStyles[metric.status])}
              >
                {metric.status === "good" ? "Good" : 
                 metric.status === "warning" ? "At Risk" : "Poor"}
              </Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="space-x-2">
                <span className="font-tabular text-foreground">{metric.value}</span>
                <span className="text-muted-foreground">{metric.target}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-primary hover:text-primary-glow text-xs"
                onClick={() => window.location.href = metric.actionHref}
              >
                {metric.actionLabel} →
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}