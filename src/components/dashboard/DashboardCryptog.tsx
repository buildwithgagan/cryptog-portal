
import { Card } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, DollarSign, Percent, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const contestData = {
  upcoming: [
    { id: 1, name: "Crypto Masters", startDate: "Jul 18, 2023", prize: "$25,000", participants: 450 },
    { id: 2, name: "Bitcoin Challenge", startDate: "Jul 20, 2023", prize: "$10,000", participants: 320 },
    { id: 3, name: "Altcoin Showdown", startDate: "Jul 23, 2023", prize: "$15,000", participants: 280 },
  ],
  ongoing: [
    { id: 4, name: "Ethereum League", endDate: "Jul 15, 2023", prize: "$30,000", participants: 620 },
    { id: 5, name: "Crypto Cup 2023", endDate: "Jul 17, 2023", prize: "$50,000", participants: 890 },
  ],
  completed: [
    { id: 6, name: "DeFi Tournament", endDate: "Jul 10, 2023", prize: "$20,000", participants: 540, winner: "Team Alpha" },
    { id: 7, name: "NFT Championship", endDate: "Jul 08, 2023", prize: "$15,000", participants: 320, winner: "Team Omega" },
    { id: 8, name: "Stablecoin Derby", endDate: "Jul 05, 2023", prize: "$12,000", participants: 280, winner: "Team Genesis" },
  ]
};

const DashboardCryptog = () => {
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

      {/* Profit & Loss Summary */}
      <Card className="p-5">
        <SectionHeading 
          title="Profit & Loss Summary" 
          description="Real-time platform performance metrics"
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium mb-3">Revenue Streams</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Contest Entry Fees</span>
                  <span className="font-medium">$45,200</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Token Purchases</span>
                  <span className="font-medium">$32,650</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Transaction Fees</span>
                  <span className="font-medium">$7,450</span>
                </div>
                <Progress value={7} className="h-2" />
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Expenditures</h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Prize Payouts</span>
                  <span className="font-medium">$38,500</span>
                </div>
                <Progress value={38} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Infrastructure</span>
                  <span className="font-medium">$12,200</span>
                </div>
                <Progress value={12} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Marketing</span>
                  <span className="font-medium">$5,950</span>
                </div>
                <Progress value={6} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contests Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Contest Status" 
          description="Management overview of platform contests"
        />
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
            <TabsTrigger value="completed" className="flex-1">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-4">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Contest Name</th>
                    <th>Start Date</th>
                    <th>Prize Pool</th>
                    <th>Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {contestData.upcoming.map((contest) => (
                    <tr key={contest.id} className="hover:bg-muted/50">
                      <td className="font-medium">{contest.name}</td>
                      <td>{contest.startDate}</td>
                      <td>{contest.prize}</td>
                      <td>{contest.participants}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="ongoing" className="mt-4">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Contest Name</th>
                    <th>End Date</th>
                    <th>Prize Pool</th>
                    <th>Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {contestData.ongoing.map((contest) => (
                    <tr key={contest.id} className="hover:bg-muted/50">
                      <td className="font-medium">{contest.name}</td>
                      <td>{contest.endDate}</td>
                      <td>{contest.prize}</td>
                      <td>{contest.participants}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Contest Name</th>
                    <th>End Date</th>
                    <th>Prize Pool</th>
                    <th>Participants</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {contestData.completed.map((contest) => (
                    <tr key={contest.id} className="hover:bg-muted/50">
                      <td className="font-medium">{contest.name}</td>
                      <td>{contest.endDate}</td>
                      <td>{contest.prize}</td>
                      <td>{contest.participants}</td>
                      <td>{contest.winner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* KYC Status */}
      <Card className="p-5">
        <SectionHeading 
          title="KYC Status" 
          description="User verification statistics"
        />
        
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
      </Card>
    </div>
  );
};

export default DashboardCryptog;
