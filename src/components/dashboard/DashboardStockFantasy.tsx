
import { Card } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { BarChart3, DollarSign, TrendingUp, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const performanceData = [
  { name: "Jan", stocks: 4000, indices: 2400, etfs: 1800 },
  { name: "Feb", stocks: 4500, indices: 2800, etfs: 2000 },
  { name: "Mar", stocks: 5000, indices: 3200, etfs: 2300 },
  { name: "Apr", stocks: 4800, indices: 3100, etfs: 2200 },
  { name: "May", stocks: 5500, indices: 3600, etfs: 2600 },
  { name: "Jun", stocks: 6000, indices: 3900, etfs: 2900 },
];

const contestData = {
  upcoming: [
    { id: 1, name: "Wall Street Titans", startDate: "Jul 22, 2023", prize: "$15,000", participants: 380 },
    { id: 2, name: "Bull vs Bear", startDate: "Jul 25, 2023", prize: "$12,000", participants: 290 },
  ],
  ongoing: [
    { id: 3, name: "Market Masters", endDate: "Jul 18, 2023", prize: "$20,000", participants: 420 },
    { id: 4, name: "Dividend Derby", endDate: "Jul 20, 2023", prize: "$18,000", participants: 350 },
  ],
};

const DashboardStockFantasy = () => {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Revenue"
          value="$64,800"
          icon={DollarSign}
          trend={{ value: 9.3, isPositive: true }}
        />
        <StatCard
          title="Active Users"
          value="2,541"
          icon={Users}
          trend={{ value: 5.7, isPositive: true }}
        />
        <StatCard
          title="Average ROI"
          value="12.4%"
          icon={TrendingUp}
          trend={{ value: 1.8, isPositive: true }}
        />
        <StatCard
          title="Live Contests"
          value="4"
          icon={BarChart3}
          trend={{ value: 1.0, isPositive: true }}
        />
      </div>

      {/* Performance Chart */}
      <Card className="p-5">
        <SectionHeading 
          title="Asset Performance" 
          description="Platform-wide asset performance by category"
        />
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorStocks" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorIndices" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorETFs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="stocks"
                stroke="hsl(var(--primary))"
                fillOpacity={1}
                fill="url(#colorStocks)"
              />
              <Area
                type="monotone"
                dataKey="indices"
                stroke="#22c55e"
                fillOpacity={1}
                fill="url(#colorIndices)"
              />
              <Area
                type="monotone"
                dataKey="etfs"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorETFs)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Contests Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Contest Status" 
          description="Stock fantasy contests overview"
        />
        
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="ongoing" className="flex-1">Ongoing</TabsTrigger>
            <TabsTrigger value="upcoming" className="flex-1">Upcoming</TabsTrigger>
          </TabsList>
          
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
        </Tabs>
      </Card>

      {/* Top Performing Stocks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5">
          <SectionHeading 
            title="Top Performing Stocks" 
            description="Most selected winning stocks"
          />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">AAPL</span>
                </div>
                <div>
                  <p className="font-medium">Apple Inc.</p>
                  <p className="text-sm text-muted-foreground">Technology</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+12.4%</p>
                <p className="text-sm text-muted-foreground">30 day gain</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">MSFT</span>
                </div>
                <div>
                  <p className="font-medium">Microsoft Corp.</p>
                  <p className="text-sm text-muted-foreground">Technology</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+9.8%</p>
                <p className="text-sm text-muted-foreground">30 day gain</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">NVDA</span>
                </div>
                <div>
                  <p className="font-medium">NVIDIA Corp.</p>
                  <p className="text-sm text-muted-foreground">Technology</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+18.2%</p>
                <p className="text-sm text-muted-foreground">30 day gain</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <span className="font-semibold text-primary">AMZN</span>
                </div>
                <div>
                  <p className="font-medium">Amazon.com Inc.</p>
                  <p className="text-sm text-muted-foreground">E-Commerce</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-green-600">+7.6%</p>
                <p className="text-sm text-muted-foreground">30 day gain</p>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <SectionHeading 
            title="Popular Sectors" 
            description="Most selected sectors by users"
          />
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Technology</span>
                <span>42%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Healthcare</span>
                <span>18%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "18%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Financial Services</span>
                <span>15%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "15%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Energy</span>
                <span>12%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "12%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Consumer Discretionary</span>
                <span>8%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Others</span>
                <span>5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardStockFantasy;
