
import { BarChart3, DollarSign, Table2, Trophy, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "@/components/shared/StatCard";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusBadge from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";

// Dummy data for contests
const contests = {
  upcoming: [
    { id: "C-1001", title: "Crypto Cup Q2", prize: "$5,000", entryFee: "$10", startDate: "Jun 20, 2023", participants: 240, maxParticipants: 500 },
    { id: "C-1002", title: "Altcoin Challenge", prize: "$2,500", entryFee: "$5", startDate: "Jun 22, 2023", participants: 180, maxParticipants: 300 },
    { id: "C-1003", title: "Bitcoin Bonanza", prize: "$10,000", entryFee: "$20", startDate: "Jun 25, 2023", participants: 320, maxParticipants: 1000 },
  ],
  ongoing: [
    { id: "C-1004", title: "Weekly Crypto Showdown", prize: "$3,000", entryFee: "$8", endDate: "Jun 19, 2023", participants: 410, maxParticipants: 500 },
    { id: "C-1005", title: "Ethereum Experts League", prize: "$6,500", entryFee: "$15", endDate: "Jun 21, 2023", participants: 280, maxParticipants: 300 },
  ],
  completed: [
    { id: "C-1006", title: "May Mega Contest", prize: "$12,000", entryFee: "$25", endDate: "May 30, 2023", participants: 980, maxParticipants: 1000, winner: "Alice Johnson" },
    { id: "C-1007", title: "Spring Crypto Challenge", prize: "$4,000", entryFee: "$10", endDate: "May 25, 2023", participants: 420, maxParticipants: 500, winner: "Robert Smith" },
    { id: "C-1008", title: "DeFi Masters", prize: "$7,500", entryFee: "$18", endDate: "May 20, 2023", participants: 290, maxParticipants: 300, winner: "Emma Wilson" },
  ]
};

const Cryptog = () => {
  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Cryptog Platform" 
        subtitle="Manage the crypto fantasy gaming platform metrics and contests."
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$126,500"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value="8,642"
          icon={Users}
          trend={{ value: 18.2, isPositive: true }}
        />
        <StatCard
          title="Revenue (30d)"
          value="$42,300"
          icon={BarChart3}
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Ongoing Contests"
          value="2"
          icon={Trophy}
          trend={{ value: 0, isPositive: true }}
        />
      </div>

      {/* Profit & Loss Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Profit & Loss Summary" 
          description="Real-time platform financial performance"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Platform Revenue</h3>
              <div className="flex items-center text-green-600">
                <TrendingUp size={16} className="mr-1" />
                <span className="text-sm">+18%</span>
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">$52,400</p>
            <p className="text-sm text-muted-foreground">Last updated 1 hour ago</p>
            
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Contest Entry Fees</span>
                  <span className="font-medium">$38,200</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Token Sales</span>
                  <span className="font-medium">$12,800</span>
                </div>
                <Progress value={24} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Other Revenue</span>
                  <span className="font-medium">$1,400</span>
                </div>
                <Progress value={3} className="h-2" />
              </div>
            </div>
          </div>
          
          <div className="p-5 border rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Platform Expenses</h3>
              <div className="flex items-center text-red-600">
                <TrendingDown size={16} className="mr-1" />
                <span className="text-sm">+4%</span>
              </div>
            </div>
            <p className="text-2xl font-bold mb-1">$31,850</p>
            <p className="text-sm text-muted-foreground">Last updated 1 hour ago</p>
            
            <div className="mt-4 space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Prize Payouts</span>
                  <span className="font-medium">$28,500</span>
                </div>
                <Progress value={89} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Infrastructure</span>
                  <span className="font-medium">$2,100</span>
                </div>
                <Progress value={7} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Marketing</span>
                  <span className="font-medium">$1,250</span>
                </div>
                <Progress value={4} className="h-2" />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Contest Status Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Contest Status" 
          description="Overview of all platform contests"
        />
        
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="mb-5">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming" className="mt-0">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Contest ID</th>
                    <th>Title</th>
                    <th>Prize Pool</th>
                    <th>Entry Fee</th>
                    <th>Start Date</th>
                    <th>Participants</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.upcoming.map((contest) => (
                    <tr key={contest.id} className="hover:bg-muted/50">
                      <td className="font-medium">{contest.id}</td>
                      <td>{contest.title}</td>
                      <td>{contest.prize}</td>
                      <td>{contest.entryFee}</td>
                      <td>{contest.startDate}</td>
                      <td>
                        <div className="w-40">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{contest.participants}</span>
                            <span>{contest.maxParticipants}</span>
                          </div>
                          <Progress 
                            value={(contest.participants / contest.maxParticipants) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="ongoing" className="mt-0">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Contest ID</th>
                    <th>Title</th>
                    <th>Prize Pool</th>
                    <th>Entry Fee</th>
                    <th>End Date</th>
                    <th>Participants</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.ongoing.map((contest) => (
                    <tr key={contest.id} className="hover:bg-muted/50">
                      <td className="font-medium">{contest.id}</td>
                      <td>{contest.title}</td>
                      <td>{contest.prize}</td>
                      <td>{contest.entryFee}</td>
                      <td>{contest.endDate}</td>
                      <td>
                        <div className="w-32">
                          <div className="flex justify-between text-xs mb-1">
                            <span>{contest.participants}</span>
                            <span>{contest.maxParticipants}</span>
                          </div>
                          <Progress 
                            value={(contest.participants / contest.maxParticipants) * 100} 
                            className="h-2" 
                          />
                        </div>
                      </td>
                      <td>
                        <StatusBadge status="active" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Contest ID</th>
                    <th>Title</th>
                    <th>Prize Pool</th>
                    <th>Entry Fee</th>
                    <th>End Date</th>
                    <th>Participants</th>
                    <th>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {contests.completed.map((contest) => (
                    <tr key={contest.id} className="hover:bg-muted/50">
                      <td className="font-medium">{contest.id}</td>
                      <td>{contest.title}</td>
                      <td>{contest.prize}</td>
                      <td>{contest.entryFee}</td>
                      <td>{contest.endDate}</td>
                      <td>{contest.participants} / {contest.maxParticipants}</td>
                      <td>
                        <div className="flex items-center">
                          <Trophy size={14} className="text-yellow-500 mr-1" />
                          <span>{contest.winner}</span>
                        </div>
                      </td>
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
          description="User verification metrics"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-5 border rounded-lg">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-1">8,642</div>
              <div className="text-sm text-muted-foreground mb-3">Total Users</div>
              <Table2 size={24} className="text-primary" />
            </div>
          </div>
          
          <div className="p-5 border rounded-lg">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-1">5,924</div>
              <div className="text-sm text-muted-foreground mb-3">KYC Approved</div>
              <div className="w-full mt-2">
                <Progress value={68.5} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>68.5% of users</span>
                  <span>+12% this month</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-5 border rounded-lg">
            <div className="flex flex-col items-center">
              <div className="text-2xl font-bold mb-1">2,718</div>
              <div className="text-sm text-muted-foreground mb-3">KYC Pending</div>
              <div className="w-full mt-2">
                <Progress value={31.5} className="h-2" />
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>31.5% of users</span>
                  <span>-8% this month</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Cryptog;
