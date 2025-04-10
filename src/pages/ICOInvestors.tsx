
import { Separator } from "@/components/ui/separator";
import InvestorsHeader from "@/components/ico/InvestorsHeader";
import InvestorsSearch from "@/components/ico/InvestorsSearch";
import InvestorsList from "@/components/ico/InvestorsList";
import InvestorsPagination from "@/components/ico/InvestorsPagination";
import { Card } from "@/components/ui/card";
import { Banknote, Globe, TrendingUp, Users } from "lucide-react";
import useICOData from "@/hooks/useICOData";
import StatCard from "@/components/shared/StatCard";

const ICOInvestors = () => {
  const { stats, trends } = useICOData();

  return (
    <div className="space-y-6">
      <InvestorsHeader />
      
      {/* Investor Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Investors"
          value={stats.totalInvestors}
          icon={Users}
          trend={trends.investors}
        />
        <StatCard
          title="Total Raised"
          value={stats.totalRaised}
          icon={Banknote}
          trend={trends.totalRaised}
        />
        <StatCard
          title="Avg. Investment"
          value="$1,280"
          icon={TrendingUp}
          trend={{ value: 3.4, isPositive: true }}
        />
        <StatCard
          title="Countries"
          value="42"
          icon={Globe}
          trend={{ value: 5, isPositive: true }}
        />
      </div>
      
      <Separator />
      
      <InvestorsSearch>
        <InvestorsList />
      </InvestorsSearch>
      
      <InvestorsPagination />
    </div>
  );
};

export default ICOInvestors;
