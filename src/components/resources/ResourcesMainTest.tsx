import { useState } from 'react';
import { FiSearch, FiFilter, FiClock, FiStar } from 'react-icons/fi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceGrid } from './ResourceGrid';
import { SmartSuggestions } from './SmartSuggestions';

export function ResourcesMainTest() {
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
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
            <FiStar className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Knowledge Center</h1>
            <p className="text-muted-foreground">Your comprehensive resource hub for account health excellence</p>
          </div>
        </div>

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
        </TabsContent>

        <TabsContent value="updates">
          <div className="p-8 text-center text-muted-foreground">
            Policy updates coming soon...
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="p-8 text-center text-muted-foreground">
            Interactive tools coming soon...
          </div>
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