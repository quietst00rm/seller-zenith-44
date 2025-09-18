import { RefreshCw, HelpCircle } from "lucide-react";
import { FiStar } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage 
} from "@/components/ui/breadcrumb";

export function ResourcesPageHeader() {
  return (
    <div className="space-y-4 mb-6">
      {/* Breadcrumb */}
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
              Resources
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
            <FiStar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-h1 font-bold text-foreground">Knowledge Center</h1>
            <p className="text-muted-foreground">Your comprehensive resource hub for account health excellence</p>
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-3">
          <div className="text-sm text-muted-foreground">
            Updated: <span className="font-medium">2 hours ago</span>
          </div>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="h-8 w-8">
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}