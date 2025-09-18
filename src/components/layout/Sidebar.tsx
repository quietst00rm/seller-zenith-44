import { cn } from "@/lib/utils";
import { FiShield, FiBarChart, FiAlertTriangle, FiSettings, FiBookOpen, FiMail, FiMessageCircle } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const navigation = [
  { id: 'dashboard', name: 'Dashboard', icon: FiBarChart },
  { id: 'issues', name: 'Violations', icon: FiAlertTriangle },
  { id: 'agent', name: 'Account Health Agent', icon: FiMessageCircle },
  { id: 'analytics', name: 'Analytics', icon: FiBarChart },
  { id: 'resources', name: 'Resources', icon: FiBookOpen },
  { id: 'ticket', name: 'Submit Ticket', icon: FiMail },
  { id: 'settings', name: 'Settings', icon: FiSettings },
];

export function Sidebar({ isOpen, onNavigate, currentPage }: SidebarProps) {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => onNavigate(currentPage)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-gradient-primary text-sidebar-foreground transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
            <div className="p-2 bg-sidebar-primary rounded-lg">
              <FiShield className="h-6 w-6 text-sidebar-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Seller Resolve</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200",
                    isActive 
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow" 
                      : "hover:bg-sidebar-accent text-sidebar-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Account info */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="bg-sidebar-accent p-4 rounded-xl">
              <h4 className="font-semibold text-sidebar-accent-foreground">Client Account</h4>
              <p className="text-sm text-sidebar-foreground/80">
                SellerID: A1B2C3D4E5F6G7
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}