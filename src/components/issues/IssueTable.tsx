import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatusChip, getStatusType } from "@/components/ui/status-chip";
import { ImpactBadge, getImpactLevel } from "@/components/ui/impact-badge";
import { cn } from "@/lib/utils";
import { ArrowUpDown, DollarSign, Calendar } from "lucide-react";

export interface Issue {
  id: string;
  asin: string;
  product: string;
  type: string;
  status: 'New' | 'Awaiting Client Docs' | 'POA Submitted' | 'Resolved';
  opened: string;
  atRiskSales: number;
  impact: 'Low' | 'Medium' | 'High';
  log: Array<{ ts: string; event: string }>;
}

interface IssueTableProps {
  issues: Issue[];
  onViewCase: (issue: Issue) => void;
}

type SortField = 'impact' | 'atRiskSales' | 'opened' | 'product';
type SortDirection = 'asc' | 'desc';

interface SortState {
  field: SortField;
  direction: SortDirection;
}

export function IssueTable({ issues, onViewCase }: IssueTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortState, setSortState] = useState<SortState>({ 
    field: 'impact', 
    direction: 'desc' 
  });

  const handleSort = (field: SortField) => {
    setSortState(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = issues.filter(issue => {
      const matchesSearch = 
        issue.asin.toLowerCase().includes(search.toLowerCase()) ||
        issue.product.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "all" || issue.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort by priority: Impact -> At Risk Sales -> Date Opened
    return filtered.sort((a, b) => {
      const impactPriority = { 'High': 3, 'Medium': 2, 'Low': 1 };
      
      if (sortState.field === 'impact') {
        const diff = impactPriority[b.impact] - impactPriority[a.impact];
        return sortState.direction === 'desc' ? diff : -diff;
      }
      
      if (sortState.field === 'atRiskSales') {
        const diff = b.atRiskSales - a.atRiskSales;
        return sortState.direction === 'desc' ? diff : -diff;
      }
      
      if (sortState.field === 'opened') {
        const diff = new Date(b.opened).getTime() - new Date(a.opened).getTime();
        return sortState.direction === 'desc' ? diff : -diff;
      }
      
      if (sortState.field === 'product') {
        const diff = a.product.localeCompare(b.product);
        return sortState.direction === 'desc' ? -diff : diff;
      }
      
      return 0;
    });
  }, [issues, search, statusFilter, sortState]);

  const SortButton = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <button
      onClick={() => handleSort(field)}
      className="flex items-center gap-1 text-left hover:text-foreground transition-colors group"
      aria-label={`Sort by ${field}`}
    >
      {children}
      <ArrowUpDown className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
    </button>
  );

  return (
    <main className="bg-gradient-card p-6 rounded-2xl shadow-card border border-border/50">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-h2 font-bold text-foreground">Violation Tracker</h1>
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 w-full md:w-auto">
          <label htmlFor="search-input" className="sr-only">Search issues</label>
          <Input
            id="search-input"
            placeholder="Search by ASIN or Product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64"
            aria-describedby="search-help"
          />
          <span id="search-help" className="sr-only">
            Search for issues by product name or ASIN code
          </span>
          
          <label htmlFor="status-filter" className="sr-only">Filter by status</label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger id="status-filter" className="w-full md:w-48">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Awaiting Client Docs">Awaiting Client Docs</SelectItem>
              <SelectItem value="POA Submitted">POA Submitted</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="overflow-x-auto" id="main-content">
        <table className="w-full" role="table" aria-label="ASIN Issues">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="sticky left-0 bg-background text-left py-4 px-3 text-caption font-medium text-muted-foreground">
                <SortButton field="product">Product</SortButton>
              </th>
              <th scope="col" className="text-left py-4 px-3 text-caption font-medium text-muted-foreground min-w-[120px]">
                Issue Type
              </th>
              <th scope="col" className="text-left py-4 px-3 text-caption font-medium text-muted-foreground min-w-[130px]">
                <SortButton field="atRiskSales">
                  <DollarSign className="h-3 w-3 inline mr-1" />
                  At Risk Sales
                </SortButton>
              </th>
              <th scope="col" className="text-left py-4 px-3 text-caption font-medium text-muted-foreground">
                <SortButton field="impact">Impact</SortButton>
              </th>
              <th scope="col" className="text-left py-4 px-3 text-caption font-medium text-muted-foreground">
                Status
              </th>
              <th scope="col" className="text-left py-4 px-3 text-caption font-medium text-muted-foreground">
                <SortButton field="opened">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Date Opened
                </SortButton>
              </th>
              <th scope="col" className="sticky right-0 bg-background text-left py-4 px-3 text-caption font-medium text-muted-foreground">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedIssues.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-16 text-muted-foreground">
                  <div className="space-y-2">
                    <p className="text-body font-medium">No issues found matching your criteria.</p>
                    <p className="text-caption">Try adjusting your search or filter settings.</p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredAndSortedIssues.map((issue) => (
                <tr 
                  key={issue.id} 
                  className="border-b border-border/50 hover:bg-muted/50 transition-colors cursor-pointer group"
                  onClick={() => onViewCase(issue)}
                  role="row"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewCase(issue);
                    }
                  }}
                  aria-label={`View case for ${issue.product}, ${issue.impact} impact, ${issue.status}`}
                >
                  <td className="sticky left-0 bg-background py-4 px-3 min-h-[56px]">
                    <div>
                      <div className="font-medium text-foreground text-body group-hover:text-primary transition-colors">
                        {issue.product}
                      </div>
                      <div className="text-caption text-muted-foreground font-mono">{issue.asin}</div>
                    </div>
                  </td>
                  <td className="py-4 px-3 text-body text-foreground">{issue.type}</td>
                  <td className="py-4 px-3 font-tabular text-body text-foreground font-semibold">
                    ${issue.atRiskSales.toLocaleString()}
                  </td>
                  <td className="py-4 px-3">
                    <ImpactBadge impact={getImpactLevel(issue.impact)} />
                  </td>
                  <td className="py-4 px-3">
                    <StatusChip status={getStatusType(issue.status)} />
                  </td>
                  <td className="py-4 px-3 text-body text-muted-foreground">{issue.opened}</td>
                  <td className="sticky right-0 bg-background py-4 px-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewCase(issue);
                      }}
                      className="text-primary hover:text-primary-glow hover:bg-primary/10 transition-all duration-200 hover:scale-105"
                      aria-label={`View case details for ${issue.product}`}
                    >
                      View Case
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}