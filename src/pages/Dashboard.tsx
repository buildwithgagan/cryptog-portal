
import { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardCryptog from "@/components/dashboard/DashboardCryptog";
import DashboardICO from "@/components/dashboard/DashboardICO";
import DashboardStockFantasy from "@/components/dashboard/DashboardStockFantasy";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("cryptog");

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Dashboard" 
        subtitle="Overview of your platform's performance and key metrics."
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="cryptog" className="flex-1">Cryptog</TabsTrigger>
          <TabsTrigger value="ico" className="flex-1">ICO</TabsTrigger>
          <TabsTrigger value="stockfantasy" className="flex-1">Stock Fantasy</TabsTrigger>
        </TabsList>

        <TabsContent value="cryptog">
          <DashboardCryptog />
        </TabsContent>

        <TabsContent value="ico">
          <DashboardICO />
        </TabsContent>

        <TabsContent value="stockfantasy">
          <DashboardStockFantasy />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
