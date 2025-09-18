import { useState } from 'react';
import { FiBell, FiExternalLink, FiFilter, FiCalendar, FiTag } from 'react-icons/fi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PolicyUpdate {
  id: string;
  title: string;
  summary: string;
  date: string;
  marketplace: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  officialUrl: string;
  affectedCategories: string[];
}

const updates: PolicyUpdate[] = [
  {
    id: '1',
    title: 'Updated Product Safety Requirements for Electronics',
    summary: 'New UN38.3 testing requirements for lithium battery products. All electronics with lithium batteries must include updated certification documentation.',
    date: '2024-01-15',
    marketplace: 'US',
    category: 'Electronics',
    riskLevel: 'high',
    officialUrl: '#',
    affectedCategories: ['Electronics', 'Cell Phones & Accessories', 'Computers']
  },
  {
    id: '2',
    title: 'Food & Beverage Labeling Policy Changes',
    summary: 'Enhanced nutritional labeling requirements and new restrictions on health claims. Effective February 1, 2024.',
    date: '2024-01-14',
    marketplace: 'US',
    category: 'Food & Grocery',
    riskLevel: 'critical',
    officialUrl: '#',
    affectedCategories: ['Grocery & Gourmet Foods', 'Health & Personal Care']
  },
  {
    id: '3',
    title: 'Intellectual Property Complaint Process Updates',
    summary: 'Streamlined IP complaint response process with new evidence requirements and faster resolution timelines.',
    date: '2024-01-13',
    marketplace: 'Global',
    category: 'IP Policy',
    riskLevel: 'medium',
    officialUrl: '#',
    affectedCategories: ['All Categories']
  },
  {
    id: '4',
    title: 'Account Health Rating Calculation Adjustments',
    summary: 'Minor adjustments to AHR calculations affecting ODR and customer experience metrics. Better alignment with seller performance.',
    date: '2024-01-12',
    marketplace: 'Global',
    category: 'Account Health',
    riskLevel: 'low',
    officialUrl: '#',
    affectedCategories: ['All Categories']
  },
  {
    id: '5',
    title: 'Enhanced Brand Registry Requirements',
    summary: 'Additional verification steps for Brand Registry enrollment and new tools for brand protection.',
    date: '2024-01-11',
    marketplace: 'US',
    category: 'Brand Protection',
    riskLevel: 'medium',
    officialUrl: '#',
    affectedCategories: ['All Categories']
  }
];

const riskColors = {
  low: 'bg-success/10 text-success border-success/20',
  medium: 'bg-warning/10 text-warning border-warning/20',
  high: 'bg-destructive/10 text-destructive border-destructive/20',
  critical: 'bg-destructive text-destructive-foreground border-destructive'
};

const riskIcons = {
  low: '🟢',
  medium: '🟡',
  high: '🟠',
  critical: '🔴'
};

export function PolicyUpdateFeed() {
  const [selectedMarketplace, setSelectedMarketplace] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredUpdates = updates.filter(update => {
    if (selectedMarketplace !== 'all' && update.marketplace !== selectedMarketplace && update.marketplace !== 'Global') {
      return false;
    }
    if (selectedRisk !== 'all' && update.riskLevel !== selectedRisk) {
      return false;
    }
    if (selectedCategory !== 'all' && update.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const categories = Array.from(new Set(updates.map(u => u.category)));
  const marketplaces = Array.from(new Set(updates.map(u => u.marketplace)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-warning rounded-lg text-warning-foreground">
          <FiBell className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Policy Update Feed</h1>
          <p className="text-muted-foreground">Stay informed about the latest Amazon policy changes</p>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FiFilter className="h-4 w-4" />
            <CardTitle className="text-lg">Filter Updates</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Marketplace</label>
              <Select value={selectedMarketplace} onValueChange={setSelectedMarketplace}>
                <SelectTrigger>
                  <SelectValue placeholder="All Marketplaces" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Marketplaces</SelectItem>
                  {marketplaces.map(mp => (
                    <SelectItem key={mp} value={mp}>{mp}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Risk Level</label>
              <Select value={selectedRisk} onValueChange={setSelectedRisk}>
                <SelectTrigger>
                  <SelectValue placeholder="All Risk Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Updates List */}
      <div className="space-y-4">
        {filteredUpdates.map((update) => (
          <Card key={update.id} className="border-border/50 hover:shadow-card-hover transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${riskColors[update.riskLevel]}`}
                    >
                      {riskIcons[update.riskLevel]} {update.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-base">
                    {update.summary}
                  </CardDescription>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FiCalendar className="h-4 w-4" />
                  {new Date(update.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <FiTag className="h-4 w-4" />
                  {update.marketplace} • {update.category}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {update.affectedCategories.map(category => (
                  <Badge key={category} variant="outline" className="text-xs">
                    {category}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent>
              <Button 
                variant="outline" 
                className="text-primary hover:text-primary-glow"
                onClick={() => window.open(update.officialUrl, '_blank')}
              >
                View Official Update
                <FiExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUpdates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No policy updates found matching your criteria.</p>
          <Button 
            variant="ghost" 
            className="mt-2"
            onClick={() => {
              setSelectedMarketplace('all');
              setSelectedRisk('all');
              setSelectedCategory('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
}