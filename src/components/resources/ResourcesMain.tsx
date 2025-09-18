import { useState } from 'react';
import { FiSearch, FiFilter, FiClock } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ResourceGrid } from './ResourceGrid';
import { SmartSuggestions } from './SmartSuggestions';
import { ResourcesPageHeader } from './ResourcesPageHeader';

export function ResourcesMain() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  const filterTags = [
    'Essential',
    'Policy Updates',
    'Templates',
    'Category Guides',
    'IP/Brand',
    'Interactive Tools',
    'Account Permissions'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header with Breadcrumbs */}
      <ResourcesPageHeader />

      {/* Smart Suggestions */}
      <SmartSuggestions />

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search resources, templates, guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <FiFilter className="h-4 w-4 text-muted-foreground" />
          <div className="flex flex-wrap gap-2">
            {filterTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedFilters.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
                  selectedFilters.includes(tag) 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-muted'
                }`}
                onClick={() => toggleFilter(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="updates">Policy Updates</TabsTrigger>
          <TabsTrigger value="tools">Interactive Tools</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          <ResourceGrid searchQuery={searchQuery} selectedFilters={selectedFilters} />
          
          {/* Interactive Tools Preview */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Interactive Tools</CardTitle>
              <p className="text-muted-foreground">Powerful tools to help you manage account health</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">POA Checklist</h3>
                  <p className="text-sm text-muted-foreground mb-3">Interactive checklist for Plan of Action submissions</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Evidence Wizard</h3>
                  <p className="text-sm text-muted-foreground mb-3">Step-by-step evidence collection guide</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </Card>
                <Card className="p-4">
                  <h3 className="font-semibold mb-2">Sales Estimator</h3>
                  <p className="text-sm text-muted-foreground mb-3">Calculate revenue impact of suspensions</p>
                  <Button variant="outline" size="sm">Coming Soon</Button>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="updates">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Policy Update Feed</CardTitle>
              <p className="text-muted-foreground">Stay informed about the latest Amazon policy changes</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Policy update feed coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Interactive Tools</CardTitle>
              <p className="text-muted-foreground">Powerful tools to streamline your account health management</p>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Interactive tools coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <div className="flex items-center gap-2 mb-6">
            <FiClock className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">What's New Since Your Last Visit</h2>
          </div>
          <ResourceGrid 
            searchQuery={searchQuery} 
            selectedFilters={selectedFilters} 
            showOnlyRecent 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}