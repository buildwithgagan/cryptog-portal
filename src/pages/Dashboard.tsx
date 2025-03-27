
import { useState } from "react";
import StatCard from "@/components/shared/StatCard";
import PageTitle from "@/components/shared/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart3, CreditCard, DollarSign, Users } from "lucide-react";
import DashboardCryptog from "@/components/dashboard/DashboardCryptog";
import DashboardStockFantasy from "@/components/dashboard/DashboardStockFantasy";
import DashboardICO from "@/components/dashboard/DashboardICO";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("cryptog");

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Dashboard" 
        subtitle="Overview of your platform's performance and key metrics."
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$126,500"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value="8,642"
          icon={Users}
          trend={{ value: 18.2, isPositive: true }}
        />
        <StatCard
          title="Revenue (30d)"
          value="$42,300"
          icon={CreditCard}
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Ongoing Contests"
          value="12"
          icon={BarChart3}
          trend={{ value: 2.4, isPositive: false }}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="cryptog" className="flex-1">Cryptog</TabsTrigger>
          <TabsTrigger value="stockfantasy" className="flex-1">Stock Fantasy</TabsTrigger>
          <TabsTrigger value="ico" className="flex-1">ICO</TabsTrigger>
        </TabsList>

        <TabsContent value="cryptog">
          <DashboardCryptog />
        </TabsContent>

        <TabsContent value="stockfantasy">
          <DashboardStockFantasy />
        </TabsContent>

        <TabsContent value="ico">
          <DashboardICO />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
