import { Search, Command } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface FilterState {
  dateRange: string;
  marketplaces: string[];
  brands: string[];
  severities: string[];
  statuses: string[];
  search: string;
}

interface ViolationsFilterControlsProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export function ViolationsFilterControls({ filters, onFilterChange }: ViolationsFilterControlsProps) {
  const handleSearchChange = (value: string) => {
    onFilterChange({ search: value });
  };

  const handleDateRangeChange = (value: string) => {
    onFilterChange({ dateRange: value });
  };

  const toggleArrayFilter = (filterKey: keyof Pick<FilterState, 'marketplaces' | 'brands' | 'severities' | 'statuses'>, value: string) => {
    const currentArray = filters[filterKey];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    onFilterChange({ [filterKey]: newArray });
  };

  const clearFilters = () => {
    onFilterChange({
      dateRange: "Last 30d",
      marketplaces: [],
      brands: [],
      severities: [],
      statuses: [],
      search: ""
    });
  };

  const activeFilterCount = 
    filters.marketplaces.length + 
    filters.brands.length + 
    filters.severities.length + 
    filters.statuses.length + 
    (filters.search ? 1 : 0) +
    (filters.dateRange !== "Last 30d" ? 1 : 0);

  return (
    <div className="bg-card rounded-lg border border-border/50 p-4 shadow-card">
      {/* Top row: Main filters */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Date Range */}
        <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Last 7d">Last 7d</SelectItem>
            <SelectItem value="Last 30d">Last 30d</SelectItem>
            <SelectItem value="Last 90d">Last 90d</SelectItem>
            <SelectItem value="Custom">Custom</SelectItem>
          </SelectContent>
        </Select>

        {/* Marketplace Filter */}
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Marketplace" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us" onClick={() => toggleArrayFilter('marketplaces', 'US')}>
              United States
            </SelectItem>
            <SelectItem value="ca" onClick={() => toggleArrayFilter('marketplaces', 'CA')}>
              Canada
            </SelectItem>
            <SelectItem value="uk" onClick={() => toggleArrayFilter('marketplaces', 'UK')}>
              United Kingdom
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Brand Filter */}
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Brand" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="brand1" onClick={() => toggleArrayFilter('brands', 'TechCorp')}>
              TechCorp
            </SelectItem>
            <SelectItem value="brand2" onClick={() => toggleArrayFilter('brands', 'GreenTea Co')}>
              GreenTea Co
            </SelectItem>
            <SelectItem value="brand3" onClick={() => toggleArrayFilter('brands', 'PhotoPro')}>
              PhotoPro
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Severity Filter */}
        <Select>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="high" onClick={() => toggleArrayFilter('severities', 'High')}>
              High
            </SelectItem>
            <SelectItem value="medium" onClick={() => toggleArrayFilter('severities', 'Medium')}>
              Medium
            </SelectItem>
            <SelectItem value="low" onClick={() => toggleArrayFilter('severities', 'Low')}>
              Low
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="new" onClick={() => toggleArrayFilter('statuses', 'New')}>
              New
            </SelectItem>
            <SelectItem value="awaiting" onClick={() => toggleArrayFilter('statuses', 'Awaiting Client Docs')}>
              Awaiting Client Docs
            </SelectItem>
            <SelectItem value="submitted" onClick={() => toggleArrayFilter('statuses', 'POA Submitted')}>
              POA Submitted
            </SelectItem>
            <SelectItem value="resolved" onClick={() => toggleArrayFilter('statuses', 'Resolved')}>
              Resolved
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search violations..."
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-9 pr-16"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-xs text-muted-foreground">
            <Command className="h-3 w-3" />
            <span>K</span>
          </div>
        </div>

        {/* Clear filters button */}
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Active filters display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border/50">
          {filters.marketplaces.map(marketplace => (
            <Badge 
              key={marketplace} 
              variant="secondary" 
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleArrayFilter('marketplaces', marketplace)}
            >
              Marketplace: {marketplace} ×
            </Badge>
          ))}
          {filters.brands.map(brand => (
            <Badge 
              key={brand} 
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleArrayFilter('brands', brand)}
            >
              Brand: {brand} ×
            </Badge>
          ))}
          {filters.severities.map(severity => (
            <Badge 
              key={severity} 
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleArrayFilter('severities', severity)}
            >
              Severity: {severity} ×
            </Badge>
          ))}
          {filters.statuses.map(status => (
            <Badge 
              key={status} 
              variant="secondary"
              className="cursor-pointer hover:bg-secondary/80"
              onClick={() => toggleArrayFilter('statuses', status)}
            >
              Status: {status} ×
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}