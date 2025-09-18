import { FiTrendingUp, FiAlertTriangle, FiClock, FiTarget } from 'react-icons/fi';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  icon: any;
  priority: 'high' | 'medium' | 'low';
  action: string;
  resourceId?: string;
}

export function SmartSuggestions() {
  // In a real app, these would be generated based on account data
  const suggestions: Suggestion[] = [
    {
      id: '1',
      title: 'Review IP Complaint Guidelines',
      description: 'Based on your recent Brand Registry activity, familiarize yourself with IP protection best practices.',
      icon: FiAlertTriangle,
      priority: 'high',
      action: 'View IP Toolkit',
      resourceId: 'ip-toolkit'
    },
    {
      id: '2',
      title: 'Update Food Safety Documentation',
      description: 'New FDA requirements effective Feb 1st may affect your grocery listings.',
      icon: FiClock,
      priority: 'high',
      action: 'Check Requirements',
      resourceId: 'food-compliance'
    },
    {
      id: '3',
      title: 'Account Health Rating Optimization',
      description: 'Your AHR is healthy, but these tips can help maintain peak performance.',
      icon: FiTrendingUp,
      priority: 'medium',
      action: 'View Guide',
      resourceId: 'ahr-guide'
    },
    {
      id: '4',
      title: 'Verify Account Permissions',
      description: 'Ensure all necessary permissions are configured for optimal monitoring.',
      icon: FiTarget,
      priority: 'medium',
      action: 'Check Permissions',
      resourceId: 'permissions-guide'
    }
  ];

  const priorityColors = {
    high: 'bg-destructive/10 text-destructive border-destructive/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    low: 'bg-success/10 text-success border-success/20'
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    // In a real app, this would navigate to the specific resource or take the suggested action
    console.log('Navigate to resource:', suggestion.resourceId);
  };

  return (
    <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-secondary/5">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-primary rounded-md">
            <FiTarget className="h-4 w-4 text-primary-foreground" />
          </div>
          <h3 className="font-semibold text-foreground">Smart Suggestions</h3>
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
            Personalized
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;
            
            return (
              <div
                key={suggestion.id}
                className="p-4 bg-background rounded-lg border border-border/50 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm text-foreground leading-tight">
                        {suggestion.title}
                      </h4>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ml-2 ${priorityColors[suggestion.priority]}`}
                      >
                        {suggestion.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {suggestion.description}
                    </p>
                    <Button variant="ghost" size="sm" className="text-xs p-0 h-auto text-primary hover:text-primary-glow">
                      {suggestion.action} →
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}