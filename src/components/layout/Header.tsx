import { Button } from "@/components/ui/button";
import { FiMenu, FiBell } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-6 bg-background border-b border-border backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className="md:hidden"
        >
          <FiMenu className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          Last Sync: <span className="font-medium">Just now</span>
        </span>
        <Button variant="ghost" size="sm" className="relative">
          <FiBell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 h-2 w-2 bg-danger rounded-full"></span>
        </Button>
      </div>
    </header>
  );
}