
import PageTitle from "@/components/shared/PageTitle";
import StatCard from "@/components/shared/StatCard";
import { CreditCard, DollarSign, Users } from "lucide-react";
import TokenDetails from "@/components/ico/TokenDetails";
import LocationAnalytics from "@/components/ico/LocationAnalytics";
import useICOData from "@/hooks/useICOData";

const ICO = () => {
  const { stats, trends } = useICOData();

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="ICO Management" 
        subtitle="Track and manage token sales and investor analytics."
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Tokens Sold"
          value={stats.totalTokensSold}
          icon={CreditCard}
          trend={trends.tokensSold}
        />
        <StatCard
          title="Total Investors"
          value={stats.totalInvestors}
          icon={Users}
          trend={trends.investors}
        />
        <StatCard
          title="Total Raised"
          value={stats.totalRaised}
          icon={DollarSign}
          trend={trends.totalRaised}
        />
        <StatCard
          title="Current Token Price"
          value={stats.currentTokenPrice}
          icon={CreditCard}
          trend={trends.tokenPrice}
        />
      </div>

      {/* Token Details */}
      <TokenDetails />

      {/* Location-Based Analytics */}
      <LocationAnalytics />
    </div>
  );
};

export default ICO;
