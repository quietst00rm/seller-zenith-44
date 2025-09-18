import { useState } from 'react';
import { FiTool, FiCheckSquare, FiDollarSign, FiFileText, FiPhone, FiShield } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { POAChecklist } from './tools/POAChecklist';
import { EvidenceWizard } from './tools/EvidenceWizard';
import { SalesEstimator } from './tools/SalesEstimator';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: any;
  priority: 'essential' | 'important' | 'nice-to-have';
  tags: string[];
  component?: React.ComponentType;
}

interface InteractiveToolsProps {
  searchQuery: string;
  selectedFilters: string[];
  showAll?: boolean;
}

const tools: Tool[] = [
  {
    id: 'poa-checklist',
    title: '"Before You Submit" POA Checklist',
    description: 'Interactive checklist that mirrors Amazon\'s POA expectations with PDF export capability.',
    icon: FiCheckSquare,
    priority: 'essential',
    tags: ['Essential', 'Interactive Tools'],
    component: POAChecklist
  },
  {
    id: 'evidence-wizard',
    title: 'Evidence Readiness Wizard',
    description: 'Step-by-step guide based on product type and violation, with document upload capability.',
    icon: FiFileText,
    priority: 'essential',
    tags: ['Essential', 'Interactive Tools'],
    component: EvidenceWizard
  },
  {
    id: 'sales-estimator',
    title: 'At-Risk Sales Estimator',
    description: 'Calculate potential revenue loss during suppression periods and understand urgency.',
    icon: FiDollarSign,
    priority: 'important',
    tags: ['Interactive Tools'],
    component: SalesEstimator
  },
  {
    id: 'permissions-validator',
    title: 'Account Permissions Validator',
    description: 'Check if all necessary permissions are granted for optimal account monitoring.',
    icon: FiShield,
    priority: 'essential',
    tags: ['Essential', 'Account Permissions', 'Interactive Tools']
  },
  {
    id: 'copy-scanner',
    title: 'Claim/Copy Quick Scan',
    description: 'Paste product descriptions to get policy risk hints and compliance suggestions.',
    icon: FiTool,
    priority: 'nice-to-have',
    tags: ['Interactive Tools']
  },
  {
    id: 'call-script',
    title: 'AHS Call Script Helper',
    description: 'Guided scripts and data points for Account Health Services calls.',
    icon: FiPhone,
    priority: 'nice-to-have',
    tags: ['Interactive Tools']
  }
];

const priorityColors = {
  essential: 'bg-destructive/10 text-destructive border-destructive/20',
  important: 'bg-warning/10 text-warning border-warning/20',
  'nice-to-have': 'bg-muted text-muted-foreground border-border'
};

export function InteractiveTools({ searchQuery, selectedFilters, showAll = false }: InteractiveToolsProps) {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const filteredTools = tools.filter(tool => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!tool.title.toLowerCase().includes(query) && 
          !tool.description.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Tag filters
    if (selectedFilters.length > 0) {
      if (!selectedFilters.some(filter => tool.tags.includes(filter))) {
        return false;
      }
    }

    return true;
  });

  const displayTools = showAll ? filteredTools : filteredTools.slice(0, 3);

  const ActiveComponent = activeTool ? tools.find(t => t.id === activeTool)?.component : null;

  if (ActiveComponent) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setActiveTool(null)}
          >
            ← Back to Tools
          </Button>
          <h2 className="text-xl font-semibold">
            {tools.find(t => t.id === activeTool)?.title}
          </h2>
        </div>
        <ActiveComponent />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-secondary rounded-lg text-secondary-foreground">
            <FiTool className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-semibold">Interactive Tools</h2>
        </div>
        {!showAll && filteredTools.length > 3 && (
          <Button variant="ghost" className="text-primary hover:text-primary-glow">
            View All Tools →
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayTools.map((tool) => {
          const Icon = tool.icon;
          
          return (
            <Card 
              key={tool.id} 
              className="border-border/50 hover:shadow-card-hover transition-all duration-300 cursor-pointer"
              onClick={() => tool.component ? setActiveTool(tool.id) : null}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-gradient-accent rounded-lg text-accent-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${priorityColors[tool.priority]}`}
                  >
                    {tool.priority.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-lg leading-tight">{tool.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {tool.description}
                  </CardDescription>
                </div>

                <div className="flex flex-wrap gap-1">
                  {tool.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent>
                <Button 
                  variant={tool.component ? "default" : "outline"} 
                  className="w-full"
                  disabled={!tool.component}
                >
                  {tool.component ? 'Launch Tool' : 'Coming Soon'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {displayTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tools found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}