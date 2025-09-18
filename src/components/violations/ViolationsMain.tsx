import { useState, useMemo } from "react";
import { ViolationsPageHeader } from "./ViolationsPageHeader";
import { ViolationsFilterControls } from "./ViolationsFilterControls";
import { ViolationsKPIGrid } from "./ViolationsKPIGrid";
import { IssueTable, Issue } from "@/components/issues/IssueTable";
import { mockIssues } from "@/data/mockData";

interface ViolationsMainProps {
  onViewCase?: (issue: Issue) => void;
}

interface FilterState {
  dateRange: string;
  marketplaces: string[];
  brands: string[];
  severities: string[];
  statuses: string[];
  search: string;
}

export function ViolationsMain({ onViewCase }: ViolationsMainProps) {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "Last 30d",
    marketplaces: [],
    brands: [],
    severities: [],
    statuses: [],
    search: ""
  });

  // Filter the issues based on current filters
  const filteredIssues = useMemo(() => {
    return mockIssues.filter(issue => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchMatch = 
          issue.asin.toLowerCase().includes(searchLower) ||
          issue.product.toLowerCase().includes(searchLower) ||
          issue.type.toLowerCase().includes(searchLower) ||
          issue.id.toLowerCase().includes(searchLower);
        if (!searchMatch) return false;
      }

      // Status filter
      if (filters.statuses.length > 0) {
        if (!filters.statuses.includes(issue.status)) return false;
      }

      // Severity filter (using impact as severity)
      if (filters.severities.length > 0) {
        if (!filters.severities.includes(issue.impact)) return false;
      }

      return true;
    });
  }, [filters]);

  // Calculate KPI metrics from filtered data
  const kpiMetrics = useMemo(() => {
    const openViolations = filteredIssues.filter(issue => String(issue.status) !== 'Resolved');
    const criticalViolations = filteredIssues.filter(issue => issue.impact === 'High' && String(issue.status) !== 'Resolved');
    const slaAtRisk = filteredIssues.filter(issue => {
      if (String(issue.status) === 'Resolved') return false;
      const daysSinceOpened = Math.floor((new Date().getTime() - new Date(issue.opened).getTime()) / (1000 * 60 * 60 * 24));
      return daysSinceOpened >= 10; // Assuming 12h is approximately same day, 10+ days is at risk
    });
    
    // Calculate mean resolution time for resolved cases
    const resolvedCases = mockIssues.filter(issue => String(issue.status) === 'Resolved');
    const avgResolutionTime = resolvedCases.length > 0 ? 2.3 : 0; // Mock calculation
    
    // Calculate at-risk sales for open violations
    const atRiskSales = openViolations.reduce((sum, issue) => sum + issue.atRiskSales, 0);
    
    // Calculate repeat violation rate (mock calculation)
    const repeatViolationRate = 29; // Mock percentage

    return {
      openViolations: openViolations.length,
      openCritical: criticalViolations.length,
      slaAtRisk: slaAtRisk.length,
      meanTimeToResolution: avgResolutionTime,
      atRiskSales,
      repeatViolationRate
    };
  }, [filteredIssues]);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <ViolationsPageHeader />
      
      {/* Filter Controls */}
      <ViolationsFilterControls 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      {/* KPI Grid */}
      <ViolationsKPIGrid metrics={kpiMetrics} />
      
      {/* Enhanced Table */}
      <div className="bg-card rounded-lg border border-border/50 shadow-card">
        <IssueTable 
          issues={filteredIssues} 
          onViewCase={onViewCase}
        />
      </div>
    </div>
  );
}