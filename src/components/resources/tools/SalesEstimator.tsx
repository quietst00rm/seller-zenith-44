import { useState } from 'react';
import { FiDollarSign, FiTrendingDown, FiClock, FiAlertTriangle } from 'react-icons/fi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface EstimationResult {
  dailyRevenue: number;
  weeklyLoss: number;
  monthlyLoss: number;
  quarterlyLoss: number;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

const violationTypes = [
  { id: 'safety', name: 'Product Safety', avgDays: 14, severity: 'high' },
  { id: 'authenticity', name: 'Authenticity/Counterfeit', avgDays: 21, severity: 'critical' },
  { id: 'listing', name: 'Listing Quality', avgDays: 7, severity: 'medium' },
  { id: 'ip', name: 'Intellectual Property', avgDays: 28, severity: 'critical' },
  { id: 'restricted', name: 'Restricted Product', avgDays: 30, severity: 'critical' },
  { id: 'policy', name: 'General Policy', avgDays: 10, severity: 'medium' }
];

export function SalesEstimator() {
  const [asin, setAsin] = useState('');
  const [monthlySales, setMonthlySales] = useState('');
  const [violationType, setViolationType] = useState('');
  const [result, setResult] = useState<EstimationResult | null>(null);

  const calculateImpact = () => {
    const sales = parseFloat(monthlySales);
    if (!sales || !violationType) return;

    const violation = violationTypes.find(v => v.id === violationType);
    if (!violation) return;

    const dailyRevenue = sales / 30;
    const avgSuppressionDays = violation.avgDays;
    
    const weeklyLoss = dailyRevenue * 7;
    const monthlyLoss = dailyRevenue * avgSuppressionDays;
    const quarterlyLoss = dailyRevenue * (avgSuppressionDays + 30); // Include recovery time

    let urgencyLevel: EstimationResult['urgencyLevel'] = 'low';
    if (monthlyLoss > 50000) urgencyLevel = 'critical';
    else if (monthlyLoss > 20000) urgencyLevel = 'high';
    else if (monthlyLoss > 5000) urgencyLevel = 'medium';

    const recommendations = [
      'Prepare all required documentation immediately',
      'Submit appeal within 24-48 hours for fastest resolution',
      'Monitor account health daily during resolution process'
    ];

    if (urgencyLevel === 'critical') {
      recommendations.unshift('Consider expedited Amazon support if available');
      recommendations.push('Have backup inventory ready in different marketplace');
    }

    if (violation.severity === 'critical') {
      recommendations.push('Consult with compliance specialist if needed');
    }

    setResult({
      dailyRevenue,
      weeklyLoss,
      monthlyLoss,
      quarterlyLoss,
      urgencyLevel,
      recommendations
    });
  };

  const resetCalculation = () => {
    setAsin('');
    setMonthlySales('');
    setViolationType('');
    setResult(null);
  };

  const urgencyColors = {
    low: 'bg-success/10 text-success border-success/20',
    medium: 'bg-warning/10 text-warning border-warning/20',
    high: 'bg-destructive/10 text-destructive border-destructive/20',
    critical: 'bg-destructive text-destructive-foreground border-destructive'
  };

  const urgencyIcons = {
    low: '🟢',
    medium: '🟡',
    high: '🟠',
    critical: '🔴'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-warning rounded-lg text-warning-foreground">
              <FiDollarSign className="h-6 w-6" />
            </div>
            <div>
              <CardTitle className="text-xl">At-Risk Sales Estimator</CardTitle>
              <p className="text-muted-foreground">
                Calculate potential revenue loss during listing suppression periods
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Input Form */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Enter Your Product Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="asin">ASIN (Optional)</Label>
              <Input
                id="asin"
                placeholder="B08XXXXXXXXX"
                value={asin}
                onChange={(e) => setAsin(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="sales">30-Day Sales Revenue ($)</Label>
              <Input
                id="sales"
                type="number"
                placeholder="10000"
                value={monthlySales}
                onChange={(e) => setMonthlySales(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label>Violation Type</Label>
            <Select value={violationType} onValueChange={setViolationType}>
              <SelectTrigger>
                <SelectValue placeholder="Select violation type..." />
              </SelectTrigger>
              <SelectContent>
                {violationTypes.map(violation => (
                  <SelectItem key={violation.id} value={violation.id}>
                    {violation.name} (Avg. {violation.avgDays} days)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button 
              onClick={calculateImpact}
              disabled={!monthlySales || !violationType}
              className="bg-gradient-primary hover:opacity-90"
            >
              Calculate Impact
            </Button>
            {result && (
              <Button variant="outline" onClick={resetCalculation}>
                Reset
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Impact Summary */}
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Revenue Impact Analysis</CardTitle>
                <Badge 
                  variant="outline" 
                  className={`${urgencyColors[result.urgencyLevel]}`}
                >
                  {urgencyIcons[result.urgencyLevel]} {result.urgencyLevel.toUpperCase()} PRIORITY
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiDollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Daily Revenue</span>
                  </div>
                  <p className="text-2xl font-bold">${result.dailyRevenue.toLocaleString()}</p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiTrendingDown className="h-4 w-4 text-warning" />
                    <span className="text-sm font-medium">Weekly Loss</span>
                  </div>
                  <p className="text-2xl font-bold text-warning">
                    ${result.weeklyLoss.toLocaleString()}
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiClock className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium">Est. Total Loss</span>
                  </div>
                  <p className="text-2xl font-bold text-destructive">
                    ${result.monthlyLoss.toLocaleString()}
                  </p>
                </Card>

                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <FiAlertTriangle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Quarterly Impact</span>
                  </div>
                  <p className="text-2xl font-bold text-muted-foreground">
                    ${result.quarterlyLoss.toLocaleString()}
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Urgency Indicator */}
          <Card className={`border-border/50 ${
            result.urgencyLevel === 'critical' ? 'ring-2 ring-destructive/20' : ''
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-full ${
                  result.urgencyLevel === 'critical' 
                    ? 'bg-destructive text-destructive-foreground'
                    : result.urgencyLevel === 'high'
                    ? 'bg-warning text-warning-foreground'
                    : 'bg-success text-success-foreground'
                }`}>
                  <FiClock className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {result.urgencyLevel === 'critical' && 'Immediate Action Required'}
                    {result.urgencyLevel === 'high' && 'High Priority Response Needed'}
                    {result.urgencyLevel === 'medium' && 'Timely Response Recommended'}
                    {result.urgencyLevel === 'low' && 'Standard Response Time Acceptable'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {result.urgencyLevel === 'critical' && 'Every day of delay costs significant revenue. Act immediately.'}
                    {result.urgencyLevel === 'high' && 'Substantial revenue at risk. Prioritize resolution efforts.'}
                    {result.urgencyLevel === 'medium' && 'Moderate impact. Address within standard timeframes.'}
                    {result.urgencyLevel === 'low' && 'Lower impact. Follow normal resolution procedures.'}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommended Actions:</h4>
                    <ul className="space-y-1">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Context Information */}
          <Card className="border-border/50 bg-muted/20">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Understanding the Impact</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Direct Costs:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Lost sales during suppression</li>
                    <li>• Reduced organic ranking</li>
                    <li>• Advertising spend waste</li>
                    <li>• Customer acquisition cost loss</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Hidden Costs:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Recovery time after reinstatement</li>
                    <li>• Lost Buy Box eligibility</li>
                    <li>• Negative account health impact</li>
                    <li>• Competitor advantage gain</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}