
import ICOSummary from "./ico/ICOSummary";
import InvestorAnalytics from "./ico/InvestorAnalytics";
import TokenSaleProgress from "./ico/TokenSaleProgress";
import ContributionLogs from "./ico/ContributionLogs";
import TokenPriceManagement from "./ico/TokenPriceManagement";
import AdminControls from "./ico/AdminControls";

const DashboardICO = () => {
  return (
    <div className="space-y-6">
      {/* ICO Summary */}
      <ICOSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          <InvestorAnalytics />
          <AdminControls />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          <TokenSaleProgress />
          <TokenPriceManagement />
        </div>
      </div>
      
      {/* Full Width Section */}
      <ContributionLogs />
    </div>
  );
};

export default DashboardICO;
