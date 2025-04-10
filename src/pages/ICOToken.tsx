
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageTitle from "@/components/shared/PageTitle";
import useICOData from "@/hooks/useICOData";
import TokenPriceForm from "@/components/ico/TokenPriceForm";
import TokenStatusCard from "@/components/ico/TokenStatusCard";
import TokenAllocationTab from "@/components/ico/TokenAllocationTab";
import TokenVestingTab from "@/components/ico/TokenVestingTab";

const ICOToken = () => {
  const { stats, updateTokenPrice } = useICOData();

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Token Management" 
        subtitle="Configure and manage your token settings for the ICO."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Management Section */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="price" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="price">Price Settings</TabsTrigger>
              <TabsTrigger value="allocation">Token Allocation</TabsTrigger>
              <TabsTrigger value="schedule">Vesting Schedule</TabsTrigger>
            </TabsList>
            
            <TabsContent value="price" className="space-y-4 pt-4">
              <TokenPriceForm 
                currentTokenPrice={stats.currentTokenPrice}
                updateTokenPrice={updateTokenPrice}
              />
            </TabsContent>
            
            <TabsContent value="allocation" className="space-y-4 pt-4">
              <TokenAllocationTab />
            </TabsContent>
            
            <TabsContent value="schedule" className="space-y-4 pt-4">
              <TokenVestingTab />
            </TabsContent>
          </Tabs>
        </div>

        {/* Token Status Panel */}
        <div className="space-y-6">
          <TokenStatusCard stats={stats} />
        </div>
      </div>
    </div>
  );
};

export default ICOToken;
