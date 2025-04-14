
import { DollarSign, Users, Percent, BarChart3 } from "lucide-react";
import StatCard from "@/components/shared/StatCard";

const CryptogStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <StatCard
        title="Total Revenue"
        value="$85,300"
        icon={DollarSign}
        trend={{ value: 14.2, isPositive: true }}
      />
      <StatCard
        title="Active Users"
        value="3,128"
        icon={Users}
        trend={{ value: 7.1, isPositive: true }}
      />
      <StatCard
        title="Profit Margin"
        value="18.5%"
        icon={Percent}
        trend={{ value: 2.3, isPositive: true }}
      />
      <StatCard
        title="Live Contests"
        value="5"
        icon={BarChart3}
        trend={{ value: 1.0, isPositive: true }}
      />
    </div>
  );
};

export default CryptogStats;
