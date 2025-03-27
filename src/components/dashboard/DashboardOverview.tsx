
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, BarChart3, CreditCard, DollarSign, LineChart, Loader2, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import StatCard from "@/components/shared/StatCard";
import StatusBadge from "@/components/shared/StatusBadge";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
} from "recharts";

interface DashboardOverviewProps {
  monthlyData: any[];
  recentTransactions: any[];
  isLoading: boolean;
  chartView: string;
  setChartView: (view: string) => void;
}

const DashboardOverview = ({ 
  monthlyData, 
  recentTransactions, 
  isLoading, 
  chartView, 
  setChartView 
}: DashboardOverviewProps) => {
  return (
    <div className="space-y-6">
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
          icon={CreditCard}
          trend={{ value: 5.1, isPositive: true }}
        />
        <StatCard
          title="Ongoing Contests"
          value="12"
          icon={BarChart3}
          trend={{ value: 2.4, isPositive: false }}
        />
      </div>

      {/* Chart Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Performance Overview" 
          description="User growth & revenue metrics"
        />
        
        <div className="h-80">
          <Tabs 
            value={chartView} 
            onValueChange={setChartView}
            className="w-full"
          >
            <TabsList className="w-full max-w-md mb-4">
              <TabsTrigger value="combined" className="flex-1">
                <LineChart size={14} className="mr-1.5" />
                Combined
              </TabsTrigger>
              <TabsTrigger value="users" className="flex-1">
                <Users size={14} className="mr-1.5" />
                Users
              </TabsTrigger>
              <TabsTrigger value="revenue" className="flex-1">
                <DollarSign size={14} className="mr-1.5" />
                Revenue
              </TabsTrigger>
            </TabsList>
              
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                <TabsContent value="combined" className="m-0 p-0 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))" 
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                      />
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
                        dataKey="users"
                        name="Users"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue"
                        stroke="#22c55e"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="users" className="m-0 p-0 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsAreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))" 
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                      />
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
                        dataKey="users"
                        name="Users"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorUsers)"
                      />
                    </RechartsAreaChart>
                  </ResponsiveContainer>
                </TabsContent>

                <TabsContent value="revenue" className="m-0 p-0 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))" 
                      />
                      <YAxis 
                        stroke="hsl(var(--muted-foreground))" 
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)",
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="revenue" 
                        name="Revenue" 
                        fill="url(#colorRevenue)" 
                        radius={[4, 4, 0, 0]} 
                        barSize={30}
                      />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </Card>

      {/* Recent Transactions */}
      <Card className="p-5">
        <SectionHeading 
          title="Recent Transactions" 
          description="Latest financial activities on the platform"
        />
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-muted/50">
                  <td className="font-medium">{transaction.id}</td>
                  <td>{transaction.user}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.type}</td>
                  <td className="text-muted-foreground">{transaction.date}</td>
                  <td>
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
