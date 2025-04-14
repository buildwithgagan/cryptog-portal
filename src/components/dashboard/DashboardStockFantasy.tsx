
import StatsSection from "./stock-fantasy/StatsSection";
import PerformanceChart from "./stock-fantasy/PerformanceChart";
import ContestStatus from "./stock-fantasy/ContestStatus";
import MarketInsights from "./stock-fantasy/MarketInsights";

const DashboardStockFantasy = () => {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <StatsSection />

      {/* Performance Chart */}
      <PerformanceChart />

      {/* Contests Section */}
      <ContestStatus />

      {/* Market Insights: Top Performing Stocks and Popular Sectors */}
      <MarketInsights />
    </div>
  );
};

export default DashboardStockFantasy;
