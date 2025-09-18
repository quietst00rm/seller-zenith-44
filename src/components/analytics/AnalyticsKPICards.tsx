import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
}

const KPICard = ({ title, value, subtitle, change, trend, icon }: KPICardProps) => {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUpIcon className="h-4 w-4 text-green-500" />;
      case "down":
        return <ArrowDownIcon className="h-4 w-4 text-red-500" />;
      default:
        return <MinusIcon className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case "up":
        return "text-green-500";
      case "down":
        return "text-red-500";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <Card className="border-border/50 hover:border-border transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <p className="text-2xl font-bold text-foreground">{value}</p>
              {icon && <div className="text-muted-foreground">{icon}</div>}
            </div>
            {subtitle && (
              <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
        {change && (
          <div className={`flex items-center gap-1 mt-3 text-sm ${getTrendColor()}`}>
            {getTrendIcon()}
            <span>{change}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const AnalyticsKPICards = () => {
  const kpiData = [
    {
      title: "Issues Resolved",
      value: "32",
      subtitle: "Last 30 Days",
      change: "+15% vs. Previous 30 Days",
      trend: "up" as const,
    },
    {
      title: "Average Resolution Time",
      value: "2.1",
      subtitle: "Days",
      change: "-12% vs. Previous Period",
      trend: "up" as const,
    },
    {
      title: "Top Violation Category",
      value: "IP Complaint",
      subtitle: "67% of cases",
      change: "+5% vs. Last Month",
      trend: "down" as const,
    },
    {
      title: "Protected Revenue",
      value: "$127K",
      subtitle: "Last 30 Days",
      change: "+23% vs. Previous 30 Days",
      trend: "up" as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi, index) => (
        <KPICard key={index} {...kpi} />
      ))}
    </div>
  );
};