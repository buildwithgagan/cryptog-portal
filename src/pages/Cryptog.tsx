import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/shared/PageTitle";
import StatusBadge from "@/components/shared/StatusBadge";
import CryptogOverview from "@/components/cryptog/CryptogOverview";
import CryptogAssetsList from "@/components/cryptog/CryptogAssetsList";
import CryptogContestsList from "@/components/cryptog/CryptogContestsList";
import CryptogTeamsList from "@/components/cryptog/CryptogTeamsList";
import CryptogTransactions from "@/components/cryptog/CryptogTransactions";

const Cryptog = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Cryptog Platform" 
        subtitle="Manage cryptocurrency fantasy contests, assets, and teams."
      />

      <Card className="p-5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md mb-6">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="assets" className="flex-1">Assets</TabsTrigger>
            <TabsTrigger value="contests" className="flex-1">Contests</TabsTrigger>
            <TabsTrigger value="teams" className="flex-1">Teams</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <CryptogOverview />
          </TabsContent>

          <TabsContent value="assets">
            <CryptogAssetsList />
          </TabsContent>

          <TabsContent value="contests">
            <CryptogContestsList />
          </TabsContent>

          <TabsContent value="teams">
            <CryptogTeamsList />
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-5">
        <CryptogTransactions />
      </Card>
    </div>
  );
};

export default Cryptog;
