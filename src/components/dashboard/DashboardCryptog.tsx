
import CryptogStats from "./cryptog/CryptogStats";
import ContestOverview from "./cryptog/ContestOverview";
import FinancialAnalytics from "./cryptog/FinancialAnalytics";
import UserInsights from "./cryptog/UserInsights";
import PlatformMetrics from "./cryptog/PlatformMetrics";
import NotificationsAndQuickActions from "./cryptog/NotificationsAndQuickActions";

const DashboardCryptog = () => {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <CryptogStats />

      {/* Contest Overview */}
      <ContestOverview />

      {/* Financial Analytics */}
      <FinancialAnalytics />

      {/* User Insights */}
      <UserInsights />

      {/* Platform Usage Metrics */}
      <PlatformMetrics />

      {/* Notifications & Quick Actions */}
      <NotificationsAndQuickActions />
    </div>
  );
};

export default DashboardCryptog;
