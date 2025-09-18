import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CalendarIcon, DownloadIcon, SearchIcon } from "lucide-react";

interface ViolationData {
  id: string;
  asin: string;
  product: string;
  violationType: string;
  status: "Active" | "Resolved" | "In Progress";
  dateReported: string;
  dateResolved?: string;
  protectedRevenue: number;
  priority: "High" | "Medium" | "Low";
}

const mockViolations: ViolationData[] = [
  {
    id: "V001",
    asin: "B08X123ABC", 
    product: "Wireless Bluetooth Headphones",
    violationType: "IP Complaint",
    status: "Resolved",
    dateReported: "2024-11-15",
    dateResolved: "2024-11-20",
    protectedRevenue: 15400,
    priority: "High",
  },
  {
    id: "V002",
    asin: "B09Y456DEF",
    product: "Premium Phone Case Set",
    violationType: "Safety Issue", 
    status: "In Progress",
    dateReported: "2024-11-18",
    protectedRevenue: 8200,
    priority: "High",
  },
  {
    id: "V003",
    asin: "B07Z789GHI",
    product: "Portable Bluetooth Speaker",
    violationType: "Product Quality",
    status: "Active",
    dateReported: "2024-11-22",
    protectedRevenue: 12100,
    priority: "Medium",
  },
  {
    id: "V004",
    asin: "B06W234JKL",
    product: "Tempered Glass Screen Protector",
    violationType: "IP Complaint",
    status: "Resolved",
    dateReported: "2024-10-28",
    dateResolved: "2024-11-05",
    protectedRevenue: 3800,
    priority: "Low",
  },
  {
    id: "V005",
    asin: "B05T567MNO",
    product: "Wireless Charging Pad",
    violationType: "Safety Issue",
    status: "Active",
    dateReported: "2024-11-25",
    protectedRevenue: 9600,
    priority: "High",
  },
];

export const AnalyticsDataTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [violationTypeFilter, setViolationTypeFilter] = useState("all");

  const filteredData = mockViolations.filter((violation) => {
    const matchesSearch = 
      violation.asin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      violation.violationType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || violation.status === statusFilter;
    const matchesType = violationTypeFilter === "all" || violation.violationType === violationTypeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "destructive";
      case "Resolved":
        return "default";
      case "In Progress":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  const formatCurrency = (amount: number) => {
    return `$${(amount / 1000).toFixed(1)}K`;
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Detailed Violation Data</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by ASIN, product, or violation type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
          <Select value={violationTypeFilter} onValueChange={setViolationTypeFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="IP Complaint">IP Complaint</SelectItem>
              <SelectItem value="Safety Issue">Safety Issue</SelectItem>
              <SelectItem value="Product Quality">Product Quality</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="rounded-md border border-border/50">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case ID</TableHead>
                <TableHead>ASIN</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Violation Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date Reported</TableHead>
                <TableHead>Protected Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((violation) => (
                <TableRow 
                  key={violation.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => {
                    // Future: Navigate to case details
                    console.log("Navigate to case:", violation.id);
                  }}
                >
                  <TableCell className="font-medium">{violation.id}</TableCell>
                  <TableCell className="font-mono text-sm">{violation.asin}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{violation.product}</TableCell>
                  <TableCell>{violation.violationType}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(violation.status)}>
                      {violation.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getPriorityBadgeVariant(violation.priority)}>
                      {violation.priority}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(violation.dateReported).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatCurrency(violation.protectedRevenue)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No violations found matching your criteria.
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredData.length} of {mockViolations.length} violations
          </p>
        </div>
      </CardContent>
    </Card>
  );
};