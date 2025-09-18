import { useState } from "react";
import { AnalyticsPageHeader } from "./AnalyticsPageHeader";
import { AnalyticsKPICards } from "./AnalyticsKPICards";
import { ViolationsOverTimeChart } from "./ViolationsOverTimeChart";
import { SecondaryAnalytics } from "./SecondaryAnalytics";
import { AnalyticsDataTable } from "./AnalyticsDataTable";

export const AnalyticsMain = () => {
  const [dateRange, setDateRange] = useState("last30days");

  return (
    <div className="space-y-8">
      {/* Header with Breadcrumbs and Global Controls */}
      <AnalyticsPageHeader 
        dateRange={dateRange} 
        onDateRangeChange={setDateRange} 
      />

      {/* KPI Cards Row */}
      <AnalyticsKPICards />

      {/* Main Content Area - 2/3 + 1/3 Split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Primary Chart - 8 columns */}
        <div className="xl:col-span-8">
          <ViolationsOverTimeChart />
        </div>
        
        {/* Secondary Analytics - 4 columns */}
        <div className="xl:col-span-4">
          <SecondaryAnalytics />
        </div>
      </div>

      {/* Detailed Data Table - Full Width */}
      <AnalyticsDataTable />
    </div>
  );
};