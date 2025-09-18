import { useState } from 'react';
import { FiDownload, FiExternalLink, FiFileText, FiVideo, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'guide' | 'template' | 'video' | 'checklist';
  category: string;
  priority: 'essential' | 'important' | 'nice-to-have';
  tags: string[];
  lastUpdated: string;
  isNew?: boolean;
  downloadUrl?: string;
  externalUrl?: string;
}

interface ResourceGridProps {
  searchQuery: string;
  selectedFilters: string[];
  showOnlyRecent?: boolean;
}

const resources: Resource[] = [
  {
    id: '1',
    title: 'Account Permissions Setup Guide',
    description: 'Essential permissions needed for limited user access and why each permission is required for optimal account health monitoring.',
    type: 'guide',
    category: 'Account Setup',
    priority: 'essential',
    tags: ['Essential', 'Account Permissions'],
    lastUpdated: '2024-01-15',
    isNew: true,
    externalUrl: '#'
  },
  {
    id: '2',
    title: 'IP Complaint Response Playbook',
    description: 'Step-by-step guide for responding to intellectual property complaints with evidence templates and timelines.',
    type: 'guide',
    category: 'IP/Brand Protection',
    priority: 'essential',
    tags: ['Essential', 'IP/Brand'],
    lastUpdated: '2024-01-14',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'ODR Violation Evidence Kit',
    description: 'Complete documentation package including invoice templates, COAs, SDS forms, and CPC/CPSIA certificates.',
    type: 'template',
    category: 'Documentation',
    priority: 'essential',
    tags: ['Essential', 'Templates'],
    lastUpdated: '2024-01-13',
    downloadUrl: '#'
  },
  {
    id: '4',
    title: 'Food & Grocery Compliance Pack',
    description: 'Specialized guide covering FDA requirements, labeling rules, claims restrictions, and common pitfalls for food sellers.',
    type: 'guide',
    category: 'Category Specific',
    priority: 'important',
    tags: ['Category Guides'],
    lastUpdated: '2024-01-12',
    downloadUrl: '#'
  },
  {
    id: '5',
    title: 'Account Health Rating Maintenance',
    description: 'How to maintain AHR ≥250 with eligibility checklists and 72-hour window optimization strategies.',
    type: 'guide',
    category: 'Account Health',
    priority: 'essential',
    tags: ['Essential'],
    lastUpdated: '2024-01-11',
    externalUrl: '#'
  },
  {
    id: '6',
    title: 'Listing Quality Checklist',
    description: 'Image requirements, claims compliance, restricted words guide, and size/color variation best practices.',
    type: 'checklist',
    category: 'Listing Optimization',
    priority: 'important',
    tags: ['Templates'],
    lastUpdated: '2024-01-10',
    downloadUrl: '#'
  },
  {
    id: '7',
    title: 'Electronics & Li-ion Battery Safety',
    description: 'UN38.3 certification requirements, safety test reports, and documentation for electronics with lithium batteries.',
    type: 'guide',
    category: 'Category Specific',
    priority: 'important',
    tags: ['Category Guides'],
    lastUpdated: '2024-01-09',
    downloadUrl: '#'
  },
  {
    id: '8',
    title: 'Brand Registry Setup & Defense',
    description: 'Complete Brand Registry enrollment guide with IP protection strategies and counterfeit complaint handling.',
    type: 'video',
    category: 'IP/Brand Protection',
    priority: 'important',
    tags: ['IP/Brand'],
    lastUpdated: '2024-01-08',
    externalUrl: '#'
  }
];

const typeIcons = {
  guide: FiFileText,
  template: FiDownload,
  video: FiVideo,
  checklist: FiCheckCircle
};

const priorityColors = {
  essential: 'bg-destructive/10 text-destructive border-destructive/20',
  important: 'bg-warning/10 text-warning border-warning/20',
  'nice-to-have': 'bg-muted text-muted-foreground border-border'
};

export function ResourceGrid({ searchQuery, selectedFilters, showOnlyRecent }: ResourceGridProps) {
  const [readItems, setReadItems] = useState<string[]>([]);

  const filteredResources = resources.filter(resource => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!resource.title.toLowerCase().includes(query) && 
          !resource.description.toLowerCase().includes(query) &&
          !resource.category.toLowerCase().includes(query)) {
        return false;
      }
    }

    // Tag filters
    if (selectedFilters.length > 0) {
      if (!selectedFilters.some(filter => resource.tags.includes(filter))) {
        return false;
      }
    }

    // Recent filter
    if (showOnlyRecent) {
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      return new Date(resource.lastUpdated) >= lastWeek;
    }

    return true;
  });

  const markAsRead = (resourceId: string) => {
    setReadItems(prev => [...prev, resourceId]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          {showOnlyRecent ? 'Recent Updates' : 'Resource Library'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {filteredResources.length} resources available
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const TypeIcon = typeIcons[resource.type];
          const isRead = readItems.includes(resource.id);
          
          return (
            <Card 
              key={resource.id} 
              className={`border-border/50 hover:shadow-card-hover transition-all duration-300 ${
                isRead ? 'opacity-75' : ''
              } ${resource.isNew ? 'ring-2 ring-primary/20' : ''}`}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
                      <TypeIcon className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      {resource.isNew && (
                        <Badge variant="outline" className="w-fit text-xs bg-primary/10 text-primary border-primary/20">
                          NEW
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${priorityColors[resource.priority]}`}
                  >
                    {resource.priority === 'essential' && <FiAlertTriangle className="h-3 w-3 mr-1" />}
                    {resource.priority.toUpperCase()}
                  </Badge>
                </div>

                <div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {resource.description}
                  </CardDescription>
                </div>

                <div className="flex flex-wrap gap-1">
                  {resource.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{resource.category}</span>
                  <span>Updated {new Date(resource.lastUpdated).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-2">
                  {resource.downloadUrl && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => markAsRead(resource.id)}
                    >
                      <FiDownload className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  )}
                  {resource.externalUrl && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="flex-1 text-primary hover:text-primary-glow"
                      onClick={() => markAsRead(resource.id)}
                    >
                      {resource.type === 'video' ? 'Watch' : 'View'}
                      <FiExternalLink className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>

                {isRead && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <FiCheckCircle className="h-3 w-3 text-success" />
                    Viewed
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources found matching your criteria.</p>
          <Button variant="ghost" className="mt-2" onClick={() => window.location.reload()}>
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}