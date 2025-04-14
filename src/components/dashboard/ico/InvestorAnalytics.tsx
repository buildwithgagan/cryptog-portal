
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { Users, Globe, TrendingUp } from "lucide-react";
import useICOData from "@/hooks/useICOData";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";

// Colors for the pie chart
const COLORS = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const InvestorAnalytics = () => {
  const { stats } = useICOData();

  // Sample data for country distribution
  const countryData = [
    { name: "United States", value: 32.4 },
    { name: "India", value: 18.7 },
    { name: "United Kingdom", value: 15.2 },
    { name: "Germany", value: 8.6 },
    { name: "Others", value: 25.1 }
  ];

  // Sample data for KYC status
  const kycData = [
    { name: "Approved", value: 72 },
    { name: "Pending", value: 23 },
    { name: "Rejected", value: 5 }
  ];

  return (
    <Card className="p-5">
      <SectionHeading 
        title="Investor Analytics" 
        description="Overview of investor demographics and statistics"
        icon={Users}
      />
      
      <CardContent className="p-0 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Investor Statistics */}
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Investors</h4>
              <p className="text-lg font-semibold">{stats.totalInvestors}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">New Investors Today</h4>
              <div className="flex items-center">
                <p className="text-lg font-semibold">32</p>
                <span className="text-xs text-green-500 ml-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8.4%
                </span>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">New Investors This Week</h4>
              <div className="flex items-center">
                <p className="text-lg font-semibold">196</p>
                <span className="text-xs text-green-500 ml-2 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.7%
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">KYC Status</h4>
              <div className="h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={kycData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {kycData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Distribution']}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderColor: "hsl(var(--border))",
                        borderRadius: "var(--radius)",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          
          {/* Country Distribution */}
          <div>
            <h4 className="text-sm font-medium mb-4 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              Investor Country Distribution
            </h4>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
                    labelLine={false}
                  >
                    {countryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Distribution']}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorAnalytics;
