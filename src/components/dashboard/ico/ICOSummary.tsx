
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { Clock, CreditCard, DollarSign, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import useICOData from "@/hooks/useICOData";

const ICOSummary = () => {
  const { stats } = useICOData();

  return (
    <Card className="p-5">
      <SectionHeading 
        title="ICO Summary Overview" 
        description="Key metrics and status of the current token sale"
        icon={CreditCard}
      />
      
      <CardContent className="p-0 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Raised</h4>
              <p className="text-lg font-semibold">{stats.totalRaised}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Tokens Distributed</h4>
              <p className="text-lg font-semibold">{stats.totalTokensSold}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Sale Stage</h4>
              <p className="text-lg font-semibold">Public Sale</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Token Price</h4>
              <p className="text-lg font-semibold">{stats.currentTokenPrice}</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h4 className="text-sm font-medium text-muted-foreground">Pre-Sale Progress</h4>
                <span className="text-sm font-medium">{stats.preSaleProgress}%</span>
              </div>
              <Progress value={stats.preSaleProgress} className="h-2" />
            </div>
            
            <div className="border border-border rounded-md p-4 flex items-center gap-3">
              <Clock className="text-muted-foreground" />
              <div>
                <h4 className="text-sm font-medium">Time Remaining</h4>
                <p className="text-lg font-semibold">{stats.daysRemaining} days</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ICOSummary;
