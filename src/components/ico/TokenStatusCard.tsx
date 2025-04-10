
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ICOStats } from "@/hooks/useICOData";

interface TokenStatusCardProps {
  stats: ICOStats;
}

const TokenStatusCard = ({ stats }: TokenStatusCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Token Status</CardTitle>
        <CardDescription>Current token metrics and status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Current Price</span>
          <span className="font-medium">{stats.currentTokenPrice}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Tokens Sold</span>
          <span className="font-medium">{stats.totalTokensSold}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Total Raised</span>
          <span className="font-medium">{stats.totalRaised}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">PreSale Progress</span>
          <span className="font-medium">{stats.preSaleProgress}%</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Days Remaining</span>
          <span className="font-medium">{stats.daysRemaining} days</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenStatusCard;
