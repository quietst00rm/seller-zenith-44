import { cn } from "@/lib/utils";
import { Check, Clock, FileText, AlertCircle, Upload } from "lucide-react";

type StatusType = 'new' | 'awaiting-docs' | 'poa-submitted' | 'resolved' | 'escalated';

interface StatusChipProps {
  status: StatusType;
  className?: string;
  showIcon?: boolean;
}

const statusConfig = {
  'new': {
    label: 'New',
    icon: AlertCircle,
    className: 'bg-info-light text-info border-info/30',
  },
  'awaiting-docs': {
    label: 'Awaiting Client Docs',
    icon: FileText,
    className: 'bg-warning-light text-warning border-warning/30',
  },
  'poa-submitted': {
    label: 'POA Submitted',
    icon: Upload,
    className: 'bg-secondary-light text-secondary border-secondary/30',
  },
  'resolved': {
    label: 'Resolved',
    icon: Check,
    className: 'bg-success-light text-success border-success/30',
  },
  'escalated': {
    label: 'Escalated',
    icon: AlertCircle,
    className: 'bg-danger-light text-danger border-danger/30',
  },
} as const;

export function StatusChip({ status, className, showIcon = true }: StatusChipProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border transition-colors",
      config.className,
      className
    )}>
      {showIcon && <Icon className="h-3 w-3" />}
      {config.label}
    </span>
  );
}

// Helper function to convert legacy status strings to new status types
export function getStatusType(status: string): StatusType {
  switch (status) {
    case 'New':
      return 'new';
    case 'Awaiting Client Docs':
      return 'awaiting-docs';
    case 'POA Submitted':
      return 'poa-submitted';
    case 'Resolved':
      return 'resolved';
    default:
      return 'new';
  }
}