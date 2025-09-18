import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  status?: "good" | "warning" | "danger" | "neutral";
  subtitle?: string;
  target?: string;
  delta?: string;
  deltaDirection?: "up" | "down" | "neutral";
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
  icon?: React.ReactNode;
}

const statusStyles = {
  good: "text-success",
  warning: "text-warning", 
  danger: "text-danger",
  neutral: "text-muted-foreground"
};

const statusBadgeStyles = {
  good: "bg-success-light text-success",
  warning: "bg-warning-light text-warning",
  danger: "bg-danger-light text-danger", 
  neutral: "bg-muted text-muted-foreground"
};

const deltaStyles = {
  up: "text-success",
  down: "text-danger",
  neutral: "text-muted-foreground"
};

export function MetricCard({ 
  title, 
  value, 
  status = "neutral", 
  subtitle, 
  target, 
  delta,
  deltaDirection = "neutral",
  primaryAction,
  className,
  icon 
}: MetricCardProps) {
  return (
    <div className={cn(
      "bg-gradient-card p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 border border-border/50",
      className
    )}>
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-caption font-medium text-muted-foreground">{title}</h3>
        {icon && (
          <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-3 mb-2">
        <p className={cn("text-3xl font-bold font-tabular", statusStyles[status])}>
          {value}
        </p>
        {subtitle && (
          <span className={cn(
            "px-2 py-1 text-xs font-medium rounded-full",
            statusBadgeStyles[status]
          )}>
            {subtitle}
          </span>
        )}
      </div>

      <div className="space-y-1">
        {delta && (
          <p className={cn("text-caption font-medium", deltaStyles[deltaDirection])}>
            {deltaDirection === "up" && "↗ "}
            {deltaDirection === "down" && "↘ "}
            {delta}
          </p>
        )}
        
        {target && (
          <p className="text-caption text-muted-foreground">{target}</p>
        )}
      </div>

      {primaryAction && (
        <div className="mt-4 pt-3 border-t border-border/30">
          <button
            onClick={primaryAction.onClick}
            className="text-caption font-medium text-primary hover:text-primary-glow transition-colors"
          >
            {primaryAction.label} →
          </button>
        </div>
      )}
    </div>
  );
}