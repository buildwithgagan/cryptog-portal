
import { AreaChart, BarChart3, CreditCard, DollarSign, LineChart, Loader2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
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
} from "recharts";
import StatCard from "@/components/shared/StatCard";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import StatusBadge from "@/components/shared/StatusBadge";

// Dummy data for charts
const monthlyData = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 500, revenue: 3600 },
  { name: "Mar", users: 600, revenue: 4200 },
  { name: "Apr", users: 700, revenue: 5000 },
  { name: "May", users: 800, revenue: 6800 },
  { name: "Jun", users: 1000, revenue: 8000 },
  { name: "Jul", users: 1200, revenue: 9600 },
  { name: "Aug", users: 1400, revenue: 10400 },
  { name: "Sep", users: 1600, revenue: 11200 },
  { name: "Oct", users: 1700, revenue: 10800 },
  { name: "Nov", users: 1800, revenue: 12800 },
  { name: "Dec", users: 2000, revenue: 14200 },
];

// Dummy data for recent transactions
const recentTransactions = [
  {
    id: "TX-12345",
    user: "John Doe",
    amount: "$180.00",
    type: "Contest Entry",
    date: "Today, 10:30 AM",
    status: "completed" as const,
  },
  {
    id: "TX-12344",
    user: "Alice Smith",
    amount: "$350.00",
    type: "Token Purchase",
    date: "Today, 9:15 AM",
    status: "completed" as const,
  },
  {
    id: "TX-12343",
    user: "Robert Johnson",
    amount: "$90.00",
    type: "Contest Entry",
    date: "Yesterday, 4:45 PM",
    status: "completed" as const,
  },
  {
    id: "TX-12342",
    user: "Emma Wilson",
    amount: "$210.00",
    type: "Token Purchase",
    date: "Yesterday, 2:30 PM",
    status: "pending" as const,
  },
  {
    id: "TX-12341",
    user: "Michael Brown",
    amount: "$45.00",
    type: "Contest Entry",
    date: "Yesterday, 11:20 AM",
    status: "completed" as const,
  },
  {
    id: "TX-12340",
    user: "Sarah Taylor",
    amount: "$120.00",
    type: "Contest Entry",
    date: "Jan 18, 2023",
    status: "canceled" as const,
  },
  {
    id: "TX-12339",
    user: "David Miller",
    amount: "$550.00",
    type: "Token Purchase",
    date: "Jan 18, 2023",
    status: "completed" as const,
  },
  {
    id: "TX-12338",
    user: "James Wilson",
    amount: "$75.00",
    type: "Contest Entry",
    date: "Jan 17, 2023",
    status: "completed" as const,
  },
  {
    id: "TX-12337",
    user: "Jennifer Davis",
    amount: "$200.00",
    type: "Token Purchase",
    date: "Jan 17, 2023",
    status: "completed" as const,
  },
  {
    id: "TX-12336",
    user: "Richard Moore",
    amount: "$30.00",
    type: "Contest Entry",
    date: "Jan 17, 2023",
    status: "completed" as const,
  },
];

const Dashboard = () => {
  const [chartView, setChartView] = useState("combined");
  const [isLoading, setIsLoading] = useState(false);

  // Simulate a loading state for demonstration purposes
  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Dashboard" 
        subtitle="Overview of your platform's performance and key metrics."
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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <SectionHeading 
            title="Performance Overview" 
            description="User growth & revenue metrics" 
            className="mb-0"
          />
          
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Tabs 
              value={chartView} 
              onValueChange={setChartView}
              className="w-full sm:w-auto"
            >
              <TabsList className="w-full">
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
              
              <div className="w-full h-80">
                {isLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <>
                    <TabsContent value="combined" className="mt-0 h-full">
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
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                          <YAxis stroke="hsl(var(--muted-foreground))" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--card))",
                              borderColor: "hsl(var(--border))",
                              borderRadius: "var(--radius)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="users"
                            stroke="hsl(var(--primary))"
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                          />
                          <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#22c55e"
                            fillOpacity={1}
                            fill="url(#colorRevenue)"
                          />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent value="users" className="mt-0 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsAreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                          <Area
                            type="monotone"
                            dataKey="users"
                            stroke="hsl(var(--primary))"
                            fillOpacity={1}
                            fill="url(#colorUsers)"
                          />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    </TabsContent>

                    <TabsContent value="revenue" className="mt-0 h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                          <defs>
                            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
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
                          <Bar dataKey="revenue" fill="url(#colorRevenue)" radius={[4, 4, 0, 0]} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </TabsContent>
                  </>
                )}
              </div>
            </Tabs>
          </div>
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

export default Dashboard;
