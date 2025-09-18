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

export function ViolationsPageHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      {/* Left side: Breadcrumb and Title */}
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-medium text-foreground">
                Violations
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <h1 className="text-h1 font-bold text-foreground">Violations</h1>
      </div>
      
      {/* Right side: Sync info and actions */}
      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          Last Sync: <span className="font-medium">5 minutes ago</span>
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