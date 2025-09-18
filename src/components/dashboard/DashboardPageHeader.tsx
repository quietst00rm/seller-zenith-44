import { RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";

export function DashboardPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      {/* Left side: Breadcrumb and Title */}
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground">
                Home
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-h1 font-bold text-foreground">Dashboard</h1>
      </div>
      
      {/* Right side: Sync info and actions */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Last Sync: <span className="font-medium">Just now</span>
        </div>
        
        <Button variant="outline" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon" className="h-8 w-8">
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}