
import { DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SectionHeading from "@/components/shared/SectionHeading";

// Token stats type
interface TokenStats {
  currentPriceUSD: number;
  currentPriceINR: number;
  totalSupply: string;
  circulatingSupply: string;
  burnedTokens: string;
  fiatPurchasesToday: number;
  fiatPurchasesWeek: number;
}

// Token stats
const tokenStats: TokenStats = {
  currentPriceUSD: 0.045,
  currentPriceINR: 3.76,
  totalSupply: "100,000,000",
  circulatingSupply: "42,350,000",
  burnedTokens: "1,250,000",
  fiatPurchasesToday: 125000,
  fiatPurchasesWeek: 780000
};

const FinancialAnalytics = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Financial Analytics" 
        description="Platform revenue and token statistics"
        icon={<DollarSign className="h-5 w-5" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold mb-4">Profit & Loss per Contest</h4>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Total CTG Collected</span>
                <span className="font-medium">45,300 CTG</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Total CTG Distributed</span>
                <span className="font-medium">32,650 CTG</span>
              </div>
              <Progress value={54} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Net Profit</span>
                <span className="font-medium text-green-600">12,650 CTG</span>
              </div>
              <Progress value={21} className="h-2 bg-green-100" />
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-sm font-semibold mb-4">Revenue Period</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Daily</p>
                <p className="text-2xl font-bold mt-1">1,250 CTG</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Weekly</p>
                <p className="text-2xl font-bold mt-1">8,430 CTG</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Monthly</p>
                <p className="text-2xl font-bold mt-1">32,740 CTG</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-4">CTG Token Stats</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-xl font-bold mt-1">${tokenStats.currentPriceUSD}</p>
              <p className="text-sm text-muted-foreground">₹{tokenStats.currentPriceINR}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Total Supply</p>
              <p className="text-xl font-bold mt-1">{tokenStats.totalSupply}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Circulating Supply</p>
              <p className="text-xl font-bold mt-1">{tokenStats.circulatingSupply}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Burned Tokens</p>
              <p className="text-xl font-bold mt-1">{tokenStats.burnedTokens}</p>
            </div>
          </div>
          
          <div className="mt-6 border rounded-lg p-4">
            <p className="text-sm font-medium">CTG bought via fiat (INR)</p>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-lg font-bold">{tokenStats.fiatPurchasesToday.toLocaleString()} CTG</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-lg font-bold">{tokenStats.fiatPurchasesWeek.toLocaleString()} CTG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FinancialAnalytics;
