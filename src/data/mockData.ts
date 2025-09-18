export interface Issue {
  id: string;
  asin: string;
  product: string;
  type: string;
  status: string;
  priority?: string;
  dateOpened?: string;
  opened: string;
  atRiskSales: number;
  impact: string;
  log: Array<{
    ts: string;
    event: string;
  }>;
}

export const mockIssues = [
  {
    id: 'C001',
    asin: 'B08XYZ1234',
    product: 'Wireless Ergonomic Mouse',
    type: 'IP Complaint',
    status: 'Awaiting Client Docs' as const,
    opened: '2025-09-15',
    atRiskSales: 175194,
    impact: 'High' as const,
    log: [
      { ts: '2025-09-15 10:00', event: 'Issue automatically detected.' },
      { ts: '2025-09-15 10:05', event: 'Account Manager (Alice) assigned.' },
      { ts: '2025-09-15 11:30', event: 'Request for supplier invoices sent to client.' }
    ]
  },
  {
    id: 'C002',
    asin: 'B09ABC5678',
    product: 'Organic Green Tea Bags (100ct)',
    type: 'Product Condition Complaint',
    status: 'POA Submitted' as const,
    opened: '2025-09-12',
    atRiskSales: 121681,
    impact: 'Medium' as const,
    log: [
      { ts: '2025-09-12 14:20', event: 'Issue detected.' },
      { ts: '2025-09-13 09:00', event: 'Client provided FBA shipment details.' },
      { ts: '2025-09-13 16:45', event: 'Plan of Action (POA) drafted and submitted.' }
    ]
  },
  {
    id: 'C003',
    asin: 'B07DEF9012',
    product: 'Professional Camera Tripod',
    type: 'Listing Violation',
    status: 'Resolved' as const,
    opened: '2025-09-10',
    atRiskSales: 15460,
    impact: 'Low' as const,
    log: [
      { ts: '2025-09-10 08:15', event: 'Listing suppressed.' },
      { ts: '2025-09-10 12:00', event: 'Listing details updated.' },
      { ts: '2025-09-11 09:00', event: 'Amazon reinstated the listing. Case resolved.' }
    ]
  },
  {
    id: 'C004',
    asin: 'B08LMNOPQR',
    product: 'Smart LED Light Bulb',
    type: 'IP Complaint',
    status: 'New' as const,
    opened: '2025-09-16',
    atRiskSales: 228079,
    impact: 'High' as const,
    log: [
      { ts: '2025-09-16 14:00', event: 'New IP complaint detected. Awaiting manager assignment.' }
    ]
  },
  {
    id: 'C005',
    asin: 'B09STUVWXYZ',
    product: 'Silicone Baking Mat Set',
    type: 'Food & Safety Issue',
    status: 'Resolved' as const,
    opened: '2025-08-28',
    atRiskSales: 0,
    impact: 'Low' as const,
    log: []
  },
  {
    id: 'C006',
    asin: 'B07CBAFEDC',
    product: 'Stainless Steel Water Bottle',
    type: 'Product Condition Complaint',
    status: 'Resolved' as const,
    opened: '2025-08-25',
    atRiskSales: 0,
    impact: 'Low' as const,
    log: []
  }
];

// Mock data for the new dashboard components
export const mockDashboardData = {
  kpiHeader: {
    activeCases: {
      label: "Active Cases",
      value: "4",
      comparison: "-2 from last week",
      trend: "down" as const,
    },
    avgResponseTime: {
      label: "Avg Response Time",
      value: "2.3 hrs",
      comparison: "Target: < 4 hrs",
      trend: "neutral" as const,
      tooltip: "Average time to respond to new cases",
    },
    accountHealth: {
      score: 978,
      status: "healthy" as const,
    },
  },
  healthAlerts: [
    {
      id: "alert-1",
      type: "critical" as const,
      message: "New IP Complaints",
      count: 2,
      actionLabel: "View Cases",
      actionHref: "/issues?filter=ip-complaints",
      icon: "complaint" as const,
    },
    {
      id: "alert-2", 
      type: "warning" as const,
      message: "Listing at Risk of Suspension",
      count: 1,
      actionLabel: "View ASIN",
      actionHref: "/issues?filter=suspension-risk",
      icon: "suspension" as const,
    },
    {
      id: "alert-3",
      type: "info" as const,
      message: "Awaiting Your Response on Cases",
      count: 3,
      actionLabel: "View Tickets",
      actionHref: "/issues?filter=awaiting-response",
      icon: "response" as const,
    },
  ],
  healthMetrics: [
    {
      name: "Order Defect Rate (ODR)",
      value: "0.27%",
      status: "good" as const,
      target: "Target: < 1%",
      actionLabel: "View Defects",
      actionHref: "/issues?filter=odr",
      description: "Percentage of orders with negative feedback, A-to-Z claims, or chargebacks",
    },
    {
      name: "Invoice Defect Rate (IDR)",
      value: "4.81%", 
      status: "warning" as const,
      target: "Target: < 5%",
      actionLabel: "View Invoices",
      actionHref: "/issues?filter=idr",
      description: "Percentage of invoices with problems such as incorrect pricing or missing information",
    },
    {
      name: "Voice of the Customer (VoC)",
      value: "Good",
      status: "good" as const,
      target: "No ASINs with Poor CX Health",
      actionLabel: "View Details",
      actionHref: "/analytics",
      description: "Overall customer experience health across your ASINs",
    },
  ],
  businessMetrics: [
    {
      id: "ipi",
      name: "Inventory Performance (IPI)",
      value: "672",
      status: "good" as const,
      subtitle: "Excellent",
      comparison: "+12 points",
      comparisonTrend: "up" as const,
      actionLabel: "View Inventory",
      actionHref: "/analytics",
      icon: "package" as const,
    },
    {
      id: "asins-monitored",
      name: "ASINs Monitored",
      value: "1,262",
      subtitle: "Active monitoring",
      comparison: "+15 this month",
      comparisonTrend: "up" as const,
      icon: "trending" as const,
    },
    {
      id: "cases-resolved",
      name: "Cases Resolved",
      value: "8",
      subtitle: "This week",
      comparison: "+3 vs. last week",
      comparisonTrend: "up" as const,
      icon: "cart" as const,
    },
    {
      id: "sla-compliance",
      name: "SLA Compliance",
      value: "96%",
      status: "good" as const,
      subtitle: "Response time",
      comparison: "Target: > 95%",
      icon: "clock" as const,
    },
    {
      id: "pending-actions",
      name: "Pending Actions",
      value: "3",
      status: "warning" as const,
      subtitle: "Require attention",
      actionLabel: "View Tasks",
      actionHref: "/issues",
      icon: "clock" as const,
    },
  ],
  performanceData: [
    { date: "Sep 1", casesOpened: 3, casesResolved: 2, avgResponseTime: 2.8, odr: 0.35, asinCount: 1250 },
    { date: "Sep 2", casesOpened: 2, casesResolved: 3, avgResponseTime: 2.1, odr: 0.32, asinCount: 1252 },
    { date: "Sep 3", casesOpened: 4, casesResolved: 1, avgResponseTime: 3.2, odr: 0.28, asinCount: 1255 },
    { date: "Sep 4", casesOpened: 1, casesResolved: 4, avgResponseTime: 1.9, odr: 0.25, asinCount: 1251 },
    { date: "Sep 5", casesOpened: 3, casesResolved: 2, avgResponseTime: 2.5, odr: 0.30, asinCount: 1254 },
    { date: "Sep 6", casesOpened: 2, casesResolved: 3, avgResponseTime: 2.0, odr: 0.27, asinCount: 1256 },
    { date: "Sep 7", casesOpened: 5, casesResolved: 1, avgResponseTime: 3.8, odr: 0.33, asinCount: 1260 },
    { date: "Sep 8", casesOpened: 1, casesResolved: 4, avgResponseTime: 1.7, odr: 0.24, asinCount: 1257 },
    { date: "Sep 9", casesOpened: 3, casesResolved: 2, avgResponseTime: 2.4, odr: 0.29, asinCount: 1258 },
    { date: "Sep 10", casesOpened: 2, casesResolved: 3, avgResponseTime: 2.1, odr: 0.22, asinCount: 1259 },
    { date: "Sep 11", casesOpened: 1, casesResolved: 2, avgResponseTime: 2.6, odr: 0.26, asinCount: 1261 },
    { date: "Sep 12", casesOpened: 2, casesResolved: 1, avgResponseTime: 2.3, odr: 0.27, asinCount: 1262 },
  ],
};