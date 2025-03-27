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
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import DashboardCryptog from "@/components/dashboard/DashboardCryptog";
import DashboardStockFantasy from "@/components/dashboard/DashboardStockFantasy";
import DashboardICO from "@/components/dashboard/DashboardICO";

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
  const [activeTab, setActiveTab] = useState("overview");
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="cryptog" className="flex-1">Cryptog</TabsTrigger>
          <TabsTrigger value="stockfantasy" className="flex-1">Stock Fantasy</TabsTrigger>
          <TabsTrigger value="ico" className="flex-1">ICO</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <DashboardOverview 
            monthlyData={monthlyData} 
            recentTransactions={recentTransactions} 
            isLoading={isLoading}
            chartView={chartView}
            setChartView={setChartView}
          />
        </TabsContent>

        <TabsContent value="cryptog">
          <DashboardCryptog />
        </TabsContent>

        <TabsContent value="stockfantasy">
          <DashboardStockFantasy />
        </TabsContent>

        <TabsContent value="ico">
          <DashboardICO />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
