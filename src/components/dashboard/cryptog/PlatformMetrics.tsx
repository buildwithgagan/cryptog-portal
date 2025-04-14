
import { BarChart3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import SectionHeading from "@/components/shared/SectionHeading";

// Contest metrics type
interface ContestMetrics {
  createdToday: number;
  joinedToday: number;
  avgTeams: number;
  avgEntryFee: number;
  mostPickedAssets: string[];
}

// Contest metrics
const contestMetrics: ContestMetrics = {
  createdToday: 8,
  joinedToday: 145,
  avgTeams: 16,
  avgEntryFee: 30,
  mostPickedAssets: ["Bitcoin (BTC)", "Ethereum (ETH)", "Solana (SOL)", "Cardano (ADA)", "Polkadot (DOT)"]
};

const PlatformMetrics = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Platform Usage Metrics" 
        description="Contest and platform statistics"
        icon={<BarChart3 className="h-5 w-5" />}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Contests Created Today</p>
              <p className="text-3xl font-bold mt-1">{contestMetrics.createdToday}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Contests Joined Today</p>
              <p className="text-3xl font-bold mt-1">{contestMetrics.joinedToday}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Avg. Teams Per Contest</p>
              <p className="text-3xl font-bold mt-1">{contestMetrics.avgTeams}</p>
            </div>
            <div className="border rounded-lg p-4">
              <p className="text-sm text-muted-foreground">Avg. CTG Entry Fee</p>
              <p className="text-3xl font-bold mt-1">{contestMetrics.avgEntryFee} CTG</p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-4">Most Picked Assets</h4>
          <div className="space-y-3">
            {contestMetrics.mostPickedAssets.map((asset, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{asset}</span>
                  <span className="font-medium">{90 - index * 12}%</span>
                </div>
                <Progress value={90 - index * 12} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlatformMetrics;
