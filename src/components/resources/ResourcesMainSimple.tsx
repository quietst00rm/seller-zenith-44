import { FiStar } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SmartSuggestions } from './SmartSuggestions';

export function ResourcesMainSimple() {
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
      </div>

      {/* Simple content */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Resources Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This section will contain comprehensive resources for Amazon sellers including policy guides, 
            templates, interactive tools, and more.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}