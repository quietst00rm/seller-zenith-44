import { useState } from 'react';
import { FiCheckSquare, FiSquare, FiDownload, FiPrinter } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface ChecklistItem {
  id: string;
  category: string;
  item: string;
  description: string;
  required: boolean;
}

const checklistItems: ChecklistItem[] = [
  {
    id: '1',
    category: 'Root Cause Analysis',
    item: 'Identified the specific issue that caused the policy violation',
    description: 'Clearly state what went wrong and why it happened',
    required: true
  },
  {
    id: '2',
    category: 'Root Cause Analysis', 
    item: 'Explained how the issue was discovered',
    description: 'Detail your investigation process and timeline',
    required: true
  },
  {
    id: '3',
    category: 'Immediate Actions',
    item: 'Removed or fixed all affected listings',
    description: 'Document all ASINs that were corrected or removed',
    required: true
  },
  {
    id: '4',
    category: 'Immediate Actions',
    item: 'Addressed customer safety concerns (if applicable)',
    description: 'Show how you protected customers from potential harm',
    required: true
  },
  {
    id: '5',
    category: 'Supporting Evidence',
    item: 'Included relevant invoices or receipts',
    description: 'Provide proof of legitimate sourcing',
    required: true
  },
  {
    id: '6',
    category: 'Supporting Evidence',
    item: 'Attached certificates or test reports',
    description: 'Include safety/compliance documentation as needed',
    required: false
  },
  {
    id: '7',
    category: 'Supporting Evidence',
    item: 'Provided supplier contact information',
    description: 'Include verifiable supplier details',
    required: false
  },
  {
    id: '8',
    category: 'Preventive Measures',
    item: 'Implemented new quality control processes',
    description: 'Detail specific steps to prevent recurrence',
    required: true
  },
  {
    id: '9',
    category: 'Preventive Measures',
    item: 'Enhanced supplier vetting procedures',
    description: 'Show how you\'ll better evaluate suppliers going forward',
    required: true
  },
  {
    id: '10',
    category: 'Preventive Measures',
    item: 'Created monitoring and review schedule',
    description: 'Establish ongoing compliance checks',
    required: true
  },
  {
    id: '11',
    category: 'Format & Structure',
    item: 'Written in clear, professional language',
    description: 'Avoid jargon and ensure readability',
    required: true
  },
  {
    id: '12',
    category: 'Format & Structure',
    item: 'Organized in logical sections',
    description: 'Follow a clear structure: issue → actions → prevention',
    required: true
  },
  {
    id: '13',
    category: 'Format & Structure',
    item: 'Included specific dates and timelines',
    description: 'Provide concrete timeframes for all actions',
    required: true
  }
];

export function POAChecklist() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(checklistItems.map(item => item.category)));
  
  const filteredItems = selectedCategory === 'all' 
    ? checklistItems 
    : checklistItems.filter(item => item.category === selectedCategory);

  const requiredItems = checklistItems.filter(item => item.required);
  const requiredCompleted = requiredItems.filter(item => checkedItems.includes(item.id)).length;
  const totalCompleted = checkedItems.length;
  const completionPercentage = (requiredCompleted / requiredItems.length) * 100;

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const exportPDF = () => {
    // In a real app, this would generate a PDF
    console.log('Exporting POA checklist as PDF...');
    alert('PDF export functionality would be implemented here');
  };

  const printChecklist = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Plan of Action (POA) Checklist</CardTitle>
              <p className="text-muted-foreground mt-1">
                Ensure your POA meets Amazon's expectations before submission
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={printChecklist}>
                <FiPrinter className="mr-2 h-4 w-4" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={exportPDF}>
                <FiDownload className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Required Items Completed</span>
                <span className="font-medium">
                  {requiredCompleted}/{requiredItems.length}
                </span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Total completed: {totalCompleted}/{checklistItems.length}</span>
                <span>{Math.round(completionPercentage)}% ready</span>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Categories
              </Button>
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <div className="space-y-4">
        {categories.map(category => {
          const categoryItems = filteredItems.filter(item => item.category === category);
          
          if (categoryItems.length === 0) return null;
          
          return (
            <Card key={category} className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  {category}
                  <Badge variant="outline" className="text-xs">
                    {categoryItems.filter(item => checkedItems.includes(item.id)).length}/
                    {categoryItems.length}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categoryItems.map(item => (
                  <div
                    key={item.id}
                    className={`flex items-start gap-3 p-4 rounded-lg border transition-all ${
                      checkedItems.includes(item.id)
                        ? 'bg-success/5 border-success/20'
                        : 'bg-background border-border/50'
                    }`}
                  >
                    <Checkbox
                      id={item.id}
                      checked={checkedItems.includes(item.id)}
                      onCheckedChange={() => toggleItem(item.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <label
                        htmlFor={item.id}
                        className={`text-sm font-medium cursor-pointer ${
                          checkedItems.includes(item.id) 
                            ? 'text-foreground' 
                            : 'text-foreground'
                        }`}
                      >
                        {item.item}
                        {item.required && (
                          <Badge variant="outline" className="ml-2 text-xs bg-destructive/10 text-destructive border-destructive/20">
                            Required
                          </Badge>
                        )}
                      </label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Completion Status */}
      {completionPercentage === 100 && (
        <Card className="border-success/20 bg-success/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success rounded-full">
                <FiCheckSquare className="h-5 w-5 text-success-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-success">Ready to Submit!</h3>
                <p className="text-sm text-success/80">
                  Your POA meets all required criteria. You can now submit with confidence.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}