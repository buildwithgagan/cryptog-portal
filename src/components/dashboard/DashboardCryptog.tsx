
import { Card } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, DollarSign, Percent, Users, Clock, Trophy, Bell, Flag, PieChart, Wallet, ArrowDownToLine, Plus } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";

// Contest data mocks
const contestData = {
  upcoming: [
    { id: 1, name: "Crypto Masters", startDate: "Jul 18, 2023", prize: "$25,000", participants: 450, slots: 150 },
    { id: 2, name: "Bitcoin Challenge", startDate: "Jul 20, 2023", prize: "$10,000", participants: 320, slots: 80 },
    { id: 3, name: "Altcoin Showdown", startDate: "Jul 23, 2023", prize: "$15,000", participants: 280, slots: 120 },
  ],
  ongoing: [
    { id: 4, name: "Ethereum League", endDate: "Jul 15, 2023", prize: "$30,000", participants: 620, ctgCollected: 18600, timeLeft: { hours: 6, minutes: 24, seconds: 18 } },
    { id: 5, name: "Crypto Cup 2023", endDate: "Jul 17, 2023", prize: "$50,000", participants: 890, ctgCollected: 26700, timeLeft: { hours: 24, minutes: 15, seconds: 42 } },
  ],
  completed: [
    { id: 6, name: "DeFi Tournament", endDate: "Jul 10, 2023", prize: "$20,000", participants: 540, winner: "Team Alpha", status: "Declared" },
    { id: 7, name: "NFT Championship", endDate: "Jul 08, 2023", prize: "$15,000", participants: 320, winner: "Team Omega", status: "Declared" },
    { id: 8, name: "Stablecoin Derby", endDate: "Jul 05, 2023", prize: "$12,000", participants: 280, winner: "Team Genesis", status: "Pending" },
  ]
};

// Token stats
const tokenStats = {
  currentPriceUSD: 0.045,
  currentPriceINR: 3.76,
  totalSupply: "100,000,000",
  circulatingSupply: "42,350,000",
  burnedTokens: "1,250,000",
  fiatPurchasesToday: 125000,
  fiatPurchasesWeek: 780000
};

// Top users data
const topUsers = [
  { rank: 1, username: "CryptoWhale", score: 9850, rewards: 15200 },
  { rank: 2, username: "TokenMaster", score: 8720, rewards: 12400 },
  { rank: 3, username: "BlockchainWiz", score: 7950, rewards: 10800 },
  { rank: 4, username: "DeFiKing", score: 7450, rewards: 9600 },
  { rank: 5, username: "SatoshiFan", score: 6890, rewards: 8200 }
];

// Contest metrics
const contestMetrics = {
  createdToday: 8,
  joinedToday: 145,
  avgTeams: 16,
  avgEntryFee: 30,
  mostPickedAssets: ["Bitcoin (BTC)", "Ethereum (ETH)", "Solana (SOL)", "Cardano (ADA)", "Polkadot (DOT)"]
};

// System alerts
const systemAlerts = [
  { id: 1, type: "contest", message: "ETH Titans League starts in 45 minutes", time: "15 min ago" },
  { id: 2, type: "price", message: "CTG token price update needed", time: "1 hour ago" },
  { id: 3, type: "kyc", message: "25 new KYC verifications pending", time: "2 hours ago" },
  { id: 4, type: "wallet", message: "Failed withdrawal detected", time: "4 hours ago" }
];

const DashboardCryptog = () => {
  // State for time counters
  const [timeLeft, setTimeLeft] = useState(contestData.ongoing.map(contest => contest.timeLeft));
  
  // Update ongoing contest timers
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTimes => 
        prevTimes.map(time => {
          let { hours, minutes, seconds } = time;
          if (seconds > 0) {
            seconds--;
          } else if (minutes > 0) {
            minutes--;
            seconds = 59;
          } else if (hours > 0) {
            hours--;
            minutes = 59;
            seconds = 59;
          }
          return { hours, minutes, seconds };
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$85,300"
          icon={DollarSign}
          trend={{ value: 14.2, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="3,128"
          icon={Users}
          trend={{ value: 7.1, isPositive: true }}
        />
        <StatCard
          title="Profit Margin"
          value="18.5%"
          icon={Percent}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Live Contests"
          value="5"
          icon={BarChart3}
          trend={{ value: 1.0, isPositive: true }}
        />
      </div>

      {/* Contest Overview */}
      <Card className="p-5">
        <SectionHeading 
          title="Contest Overview" 
          description="Summary of all platform contests"
        />
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full max-w-md mb-4">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contest Name</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>Teams Registered</TableHead>
                    <TableHead>Slots Left</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contestData.upcoming.map((contest) => (
                    <TableRow key={contest.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{contest.name}</TableCell>
                      <TableCell>{contest.startDate}</TableCell>
                      <TableCell>{contest.participants}</TableCell>
                      <TableCell>{contest.slots}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="ongoing" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contest Name</TableHead>
                    <TableHead>Live Timer</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>CTG Collected</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contestData.ongoing.map((contest, index) => (
                    <TableRow key={contest.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{contest.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center text-primary">
                          <Clock className="mr-2 h-4 w-4" />
                          {`${timeLeft[index].hours.toString().padStart(2, '0')}:${timeLeft[index].minutes.toString().padStart(2, '0')}:${timeLeft[index].seconds.toString().padStart(2, '0')}`}
                        </div>
                      </TableCell>
                      <TableCell>{contest.participants}</TableCell>
                      <TableCell>{contest.ctgCollected.toLocaleString()} CTG</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Contest Name</TableHead>
                    <TableHead>Participants</TableHead>
                    <TableHead>Prize Pool</TableHead>
                    <TableHead>Winner</TableHead>
                    <TableHead>Result Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contestData.completed.map((contest) => (
                    <TableRow key={contest.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{contest.name}</TableCell>
                      <TableCell>{contest.participants}</TableCell>
                      <TableCell>{contest.prize}</TableCell>
                      <TableCell>{contest.winner}</TableCell>
                      <TableCell>
                        {contest.status === "Declared" ? (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Declared
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Financial Analytics */}
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

      {/* User Insights */}
      <Card className="p-5">
        <SectionHeading 
          title="User Insights" 
          description="User statistics and performance metrics"
          icon={<Users className="h-5 w-5" />}
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

      {/* Platform Usage Metrics */}
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

      {/* Notifications & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <Card className="p-5">
          <SectionHeading 
            title="Notifications & Alerts" 
            description="System alerts and notifications"
            icon={<Bell className="h-5 w-5" />}
          />
          
          <div className="space-y-4">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start p-3 border rounded-lg">
                {alert.type === "contest" && <Clock className="h-5 w-5 mr-3 text-blue-500" />}
                {alert.type === "price" && <DollarSign className="h-5 w-5 mr-3 text-green-500" />}
                {alert.type === "kyc" && <Users className="h-5 w-5 mr-3 text-amber-500" />}
                {alert.type === "wallet" && <Wallet className="h-5 w-5 mr-3 text-red-500" />}
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
                <Button variant="ghost" size="sm">View</Button>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Quick Actions */}
        <Card className="p-5">
          <SectionHeading 
            title="Quick Actions" 
            description="Admin shortcuts"
            icon={<Flag className="h-5 w-5" />}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Button className="justify-start">
              <Plus className="mr-2 h-4 w-4" /> Create New Contest
            </Button>
            <Button className="justify-start">
              <Plus className="mr-2 h-4 w-4" /> Add New Asset
            </Button>
            <Button className="justify-start">
              <DollarSign className="mr-2 h-4 w-4" /> Set CTG Sale Price
            </Button>
            <Button className="justify-start">
              <Users className="mr-2 h-4 w-4" /> View Pending KYC
            </Button>
            <Button className="justify-start col-span-2">
              <ArrowDownToLine className="mr-2 h-4 w-4" /> Access Reports (CSV/PDF)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardCryptog;

