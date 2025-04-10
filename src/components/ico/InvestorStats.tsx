
import { Avatar } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Banknote, Globe, TrendingUp, Users } from "lucide-react";

const recentInvestors = [
  {
    walletAddress: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
    country: "United States",
    amount: "$15,000",
    time: "2 days ago"
  },
  {
    walletAddress: "0xf02C1c8e6114b1Dbe8937a39260b5b0a374432bB",
    country: "United Kingdom",
    amount: "$8,500",
    time: "4 days ago"
  },
  {
    walletAddress: "0x4B0897b0513fdC7C541B6d9D7E929C4e5364D2dB",
    country: "India",
    amount: "$5,000",
    time: "1 week ago"
  },
  {
    walletAddress: "0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed",
    country: "China",
    amount: "$20,000",
    time: "1 week ago"
  }
];

// Function to truncate wallet address for display
const truncateAddress = (address: string) => {
  if (!address) return "";
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const InvestorStats = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Recent Investors
          </CardTitle>
          <CardDescription>Latest token investments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentInvestors.map((investor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-9 w-9 bg-primary/10">
                    <span className="text-xs font-medium">
                      {investor.walletAddress.substring(2, 4)}
                    </span>
                  </Avatar>
                  <div>
                    <div className="font-medium">{truncateAddress(investor.walletAddress)}</div>
                    <div className="text-xs text-muted-foreground">{investor.country}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{investor.amount}</div>
                  <div className="text-xs text-muted-foreground">{investor.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Investor Metrics
          </CardTitle>
          <CardDescription>Key investment statistics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Total Investors</div>
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-semibold mt-2">4,218</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+12.7%</span> this month
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Total Raised</div>
                <Banknote className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-semibold mt-2">$5.4M</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+7.2%</span> this month
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Avg. Investment</div>
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-semibold mt-2">$1,280</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+3.4%</span> this month
              </div>
            </div>
            
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Countries</div>
                <Globe className="h-4 w-4 text-primary" />
              </div>
              <div className="text-2xl font-semibold mt-2">42</div>
              <div className="text-xs text-muted-foreground mt-1">
                <span className="text-green-600">+5</span> new countries
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorStats;
