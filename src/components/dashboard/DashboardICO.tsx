
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; 
import { Compass, CreditCard, DollarSign, Globe, MapPin, Users } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading";
import StatCard from "@/components/shared/StatCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
} from "recharts";

// Sample data for the ICO page
const tokenData = {
  name: "Cryptog",
  decimals: 18,
  totalSupply: "1,000,000,000",
  preSaleSold: "250,000,000",
  currentPrice: "$0.085",
  percentageSold: 25, // 25% of total supply
};

// Sample data for the country distribution
const countryData = [
  { name: "United States", value: 32.4 },
  { name: "India", value: 18.7 },
  { name: "United Kingdom", value: 15.2 },
  { name: "Germany", value: 8.6 },
  { name: "Canada", value: 7.3 },
  { name: "Australia", value: 6.5 },
  { name: "Others", value: 11.3 },
];

// Colors for the pie chart
const COLORS = ['#6366f1', '#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

const DashboardICO = () => {
  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Token Price"
          value={tokenData.currentPrice}
          icon={DollarSign}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard
          title="Total Investors"
          value="2,845"
          icon={Users}
          trend={{ value: 7.5, isPositive: true }}
        />
        <StatCard
          title="Pre-Sale Tokens"
          value={tokenData.preSaleSold}
          icon={CreditCard}
          trend={{ value: 4.6, isPositive: true }}
        />
        <StatCard
          title="Countries"
          value="42"
          icon={Globe}
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Token Info Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Token Details" 
          description="Information about the Cryptog token"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="space-y-5">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Token Name</h4>
              <p className="text-lg font-semibold">{tokenData.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Decimals</h4>
              <p className="text-lg font-semibold">{tokenData.decimals}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Total Supply</h4>
              <p className="text-lg font-semibold">{tokenData.totalSupply}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-muted-foreground mb-1">Current Price</h4>
              <p className="text-lg font-semibold">{tokenData.currentPrice}</p>
            </div>
          </div>
          
          <div className="flex flex-col justify-center space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">Pre-Sale Progress</h4>
            <Progress value={tokenData.percentageSold} className="h-4" />
            <p className="text-sm text-muted-foreground text-right">
              {tokenData.preSaleSold} / {tokenData.totalSupply} tokens sold
              <span className="font-medium text-foreground ml-1">({tokenData.percentageSold}%)</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Location Distribution Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Geographic Distribution" 
          description="Investor distribution by country"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={countryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
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
                    padding: "10px 12px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-4 flex flex-col justify-center">
            <h4 className="text-sm font-medium">Top Countries</h4>
            <div className="space-y-3">
              {countryData.slice(0, 5).map((country, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{country.name}</span>
                      <span className="text-sm text-muted-foreground">{country.value}%</span>
                    </div>
                    <Progress value={country.value} className="h-1 mt-1" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center pt-3 mt-2 border-t border-border">
              <MapPin className="text-muted-foreground mr-2 w-4 h-4" />
              <span className="text-sm text-muted-foreground">42 countries with active investors</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardICO;
