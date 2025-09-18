import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { AccountHealthGauge } from "@/components/dashboard/AccountHealthGauge";
import { ODRChart } from "@/components/dashboard/ODRChart";
import { KPIHeader } from "@/components/dashboard/KPIHeader";
import { DashboardPageHeader } from "@/components/dashboard/DashboardPageHeader";
import { AccountHealthModule } from "@/components/dashboard/AccountHealthModule";
import { BusinessPerformanceModule } from "@/components/dashboard/BusinessPerformanceModule";
import { PerformanceTrendChart } from "@/components/dashboard/PerformanceTrendChart";
import { IssueTable, Issue } from "@/components/issues/IssueTable";
import { AccountHealthAgent } from "@/components/chat/AccountHealthAgent";
import { AgentPageHeader } from "@/components/chat/AgentPageHeader";
import { ResourcesMain } from "@/components/resources/ResourcesMain";
import { AnalyticsMain } from "@/components/analytics/AnalyticsMain";
import { ViolationsMain } from "@/components/violations/ViolationsMain";
import { TicketPageHeader } from "@/components/layout/TicketPageHeader";
import { SettingsPageHeader } from "@/components/layout/SettingsPageHeader";
import { mockIssues, mockDashboardData } from "@/data/mockData";
import { 
  FiTrendingUp, 
  FiUsers, 
  FiFileText, 
  FiPackage,
  FiSearch,
  FiDownload,
  FiBook,
  FiCopy,
  FiGitBranch,
  FiSend
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { cn } from "@/lib/utils";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const handleViewCase = (issue: Issue) => {
    setSelectedIssue(issue);
    setModalOpen(true);
  };

  const pageTitle = {
    dashboard: 'Dashboard',
    issues: 'Violations',
    agent: 'Account Health Agent',
    analytics: 'Analytics',
    resources: 'Resources',
    ticket: 'Submit Ticket',
    settings: 'Settings'
  }[currentPage] || 'Dashboard';

  // Analytics data
  const violationData = mockIssues.reduce((acc, issue) => {
    const existingType = acc.find(item => item.name === issue.type);
    if (existingType) {
      existingType.value += 1;
    } else {
      acc.push({ name: issue.type, value: 1 });
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const COLORS = ['hsl(var(--danger))', 'hsl(var(--primary-glow))', 'hsl(var(--warning))', 'hsl(var(--success))', 'hsl(var(--secondary))'];

  return (
    <div className="flex h-screen bg-gradient-dashboard">
      <Sidebar 
        isOpen={sidebarOpen} 
        onNavigate={handleNavigation} 
        currentPage={currentPage} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={pageTitle} 
          onMenuClick={() => setSidebarOpen(!sidebarOpen)} 
        />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* Dashboard View */}
          {currentPage === 'dashboard' && (
            <div className="space-y-8">
              <DashboardPageHeader />
              
              {/* Row 1: KPI Header */}
              <KPIHeader 
                activeCases={mockDashboardData.kpiHeader.activeCases}
                avgResponseTime={mockDashboardData.kpiHeader.avgResponseTime}
                accountHealth={mockDashboardData.kpiHeader.accountHealth}
              />
              
              {/* Row 2: Command Center Modules */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column: Account Health & Alerts */}
                <AccountHealthModule 
                  alerts={mockDashboardData.healthAlerts}
                  metrics={mockDashboardData.healthMetrics}
                />
                
                {/* Right Column: Business Performance */}
                <BusinessPerformanceModule 
                  metrics={mockDashboardData.businessMetrics}
                />
              </div>
              
              {/* Row 3: Performance Trend Chart */}
              <PerformanceTrendChart data={mockDashboardData.performanceData} />
            </div>
          )}

          {/* Violations View */}
          {currentPage === 'issues' && (
            <ViolationsMain onViewCase={handleViewCase} />
          )}

          {/* Account Health Agent View */}
          {currentPage === 'agent' && (
            <div className="space-y-6">
              <AgentPageHeader />
              <div className="h-[calc(100vh-12rem)]">
                <AccountHealthAgent className="h-full" />
              </div>
            </div>
          )}

          {/* Analytics View */}
          {currentPage === 'analytics' && <AnalyticsMain />}

          {/* Resources View */}
          {currentPage === 'resources' && <ResourcesMain />}

          {/* Submit Ticket View */}
          {currentPage === 'ticket' && (
            <div className="space-y-6">
              <TicketPageHeader />
              <div className="max-w-2xl mx-auto">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardDescription>
                      If you've noticed an issue not yet tracked in the dashboard, please let us know.
                    </CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                    <Input placeholder="Brief description of the issue..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Related ASIN (Optional)</label>
                    <Input placeholder="B08XXXXXXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <Textarea 
                      placeholder="Please provide detailed information about the issue you're experiencing..."
                      rows={5}
                    />
                  </div>
                  <Button className="w-full bg-gradient-primary hover:opacity-90">
                    <FiSend className="mr-2 h-4 w-4" />
                    Submit Ticket
                  </Button>
                </CardContent>
              </Card>
              </div>
            </div>
          )}

          {/* Settings View */}
          {currentPage === 'settings' && (
            <div className="space-y-6">
              <SettingsPageHeader />
              <div className="max-w-4xl mx-auto space-y-8">
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>
                    Invite and manage team member access.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">John Doe (you)</p>
                      <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                    </div>
                    <Badge variant="outline" className="bg-primary-light text-primary border-primary/20">Admin</Badge>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">Jane Smith</p>
                      <p className="text-sm text-muted-foreground">jane.smith@example.com</p>
                    </div>
                    <Badge variant="outline">View Only</Badge>
                  </div>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    Invite New User
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                  <CardDescription>
                    Manage your subscription plan and billing details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-info-light border border-info/20 rounded-lg">
                    <p className="font-medium">
                      Current Plan: <span className="text-info">Enterprise</span>
                    </p>
                    <p className="text-sm text-muted-foreground">Next billing date: October 1, 2025</p>
                    <Button variant="ghost" className="mt-3 text-info hover:text-info/80">
                      Manage Subscription
                    </Button>
                  </div>
                </CardContent>
              </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Case Detail Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Case Details: {selectedIssue?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedIssue && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Details & Communication */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Issue Summary</h3>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p><strong>ASIN:</strong> {selectedIssue.asin}</p>
                    <p><strong>Product:</strong> {selectedIssue.product}</p>
                    <p><strong>Issue Type:</strong> {selectedIssue.type}</p>
                    <p><strong>Status:</strong> 
                      <Badge variant="outline" className="ml-2">
                        {selectedIssue.status}
                      </Badge>
                    </p>
                  </div>
                </div>
                
                {/* Case Log */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Case Log & Timeline</h3>
                  <div className="space-y-4 border-l-2 border-border ml-2">
                    {selectedIssue.log.map((item, index) => (
                      <div key={index} className="relative pl-8">
                        <div className="absolute w-4 h-4 bg-muted rounded-full mt-1.5 -left-2 border-2 border-background"></div>
                        <p className="text-sm text-muted-foreground">{item.ts}</p>
                        <p className="font-medium text-foreground">{item.event}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Required Actions</h3>
                  <div className="bg-warning-light border border-warning/20 p-4 rounded-lg">
                    <p className="font-medium text-warning-foreground">
                      Please provide supplier invoices for the last 365 days.
                    </p>
                    <p className="text-sm text-warning-foreground/80 mt-1">
                      Our team needs these documents to draft the Plan of Action.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Secure Communication</h3>
                  <div className="space-y-3">
                    <Textarea 
                      placeholder="Type your message to the account manager..." 
                      rows={3}
                    />
                    <Input type="file" />
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      <FiSend className="mr-2 h-4 w-4" />
                      Send Message & Files
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
