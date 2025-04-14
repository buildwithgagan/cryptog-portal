
import StatCard from "@/components/shared/StatCard";
import { DollarSign, Users, TrendingUp, BarChart3 } from "lucide-react";

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Revenue"
        value="$64,800"
        icon={DollarSign}
        trend={{ value: 9.3, isPositive: true }}
      />
      <StatCard
        title="Active Users"
        value="2,541"
        icon={Users}
        trend={{ value: 5.7, isPositive: true }}
      />
      <StatCard
        title="Average ROI"
        value="12.4%"
        icon={TrendingUp}
        trend={{ value: 1.8, isPositive: true }}
      />
      <StatCard
        title="Live Contests"
        value="4"
        icon={BarChart3}
        trend={{ value: 1.0, isPositive: true }}
      />
    </div>
  );
};

export default StatsSection;
