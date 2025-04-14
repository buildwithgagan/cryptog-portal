
import { Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SectionHeading from "@/components/shared/SectionHeading";

// Top users data type
interface TopUser {
  rank: number;
  username: string;
  score: number;
  rewards: number;
}

// Top users data
const topUsers: TopUser[] = [
  { rank: 1, username: "CryptoWhale", score: 9850, rewards: 15200 },
  { rank: 2, username: "TokenMaster", score: 8720, rewards: 12400 },
  { rank: 3, username: "BlockchainWiz", score: 7950, rewards: 10800 },
  { rank: 4, username: "DeFiKing", score: 7450, rewards: 9600 },
  { rank: 5, username: "SatoshiFan", score: 6890, rewards: 8200 }
];

const UserInsights = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="User Insights" 
        description="User statistics and performance metrics"
        icon={Users}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-semibold mb-4">KYC Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-3xl font-bold">3,128</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">KYC Approved</p>
              <p className="text-3xl font-bold text-green-600">2,485</p>
              <p className="text-xs text-muted-foreground">79.4% of users</p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">KYC Pending</p>
              <p className="text-3xl font-bold text-amber-600">643</p>
              <p className="text-xs text-muted-foreground">20.6% of users</p>
            </div>
          </div>
          
          <div className="mt-8">
            <h4 className="text-sm font-semibold mb-4">User Activity</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">New Today</p>
                <p className="text-2xl font-bold mt-1">87</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">New This Week</p>
                <p className="text-2xl font-bold mt-1">342</p>
              </div>
              <div className="bg-muted/20 p-4 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-2xl font-bold mt-1">1,246</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold mb-4">Top Performing Users</h4>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Rank</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Rewards (CTG)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topUsers.map((user) => (
                  <TableRow key={user.rank} className="hover:bg-muted/50">
                    <TableCell>{user.rank}</TableCell>
                    <TableCell className="font-medium">{user.username}</TableCell>
                    <TableCell>{user.score}</TableCell>
                    <TableCell>{user.rewards}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserInsights;
