
import { Card } from "@/components/ui/card";
import StatCard from "@/components/shared/StatCard";
import SectionHeading from "@/components/shared/SectionHeading";
import { BadgeDollarSign, Coins, Users, Globe2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const tokenData = [
  { name: "Pre-Sale", value: 200000000 },
  { name: "Public Sale", value: 300000000 },
  { name: "Team", value: 150000000 },
  { name: "Reserves", value: 200000000 },
  { name: "Ecosystem", value: 150000000 },
];

const COLORS = ['hsl(var(--primary))', '#22c55e', '#f59e0b', '#3b82f6', '#a855f7'];

const locationData = [
  { country: "United States", users: 2850, percentage: 28.5 },
  { country: "United Kingdom", users: 1450, percentage: 14.5 },
  { country: "India", users: 1250, percentage: 12.5 },
  { country: "Germany", users: 920, percentage: 9.2 },
  { country: "Canada", users: 780, percentage: 7.8 },
  { country: "Australia", users: 650, percentage: 6.5 },
  { country: "France", users: 520, percentage: 5.2 },
  { country: "Japan", users: 480, percentage: 4.8 },
  { country: "Brazil", users: 420, percentage: 4.2 },
  { country: "Others", users: 680, percentage: 6.8 },
];

const DashboardICO = () => {
  const totalSupply = 1000000000;
  const tokensSold = 385000000;
  const percentageSold = (tokensSold / totalSupply) * 100;

  return (
    <div className="space-y-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Token Price"
          value="$0.075"
          icon={BadgeDollarSign}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatCard
          title="Tokens Sold"
          value="385M"
          icon={Coins}
          trend={{ value: 15.3, isPositive: true }}
        />
        <StatCard
          title="Total Investors"
          value="5,280"
          icon={Users}
          trend={{ value: 12.1, isPositive: true }}
        />
        <StatCard
          title="Countries"
          value="42"
          icon={Globe2}
          trend={{ value: 4.3, isPositive: true }}
        />
      </div>

      {/* Token Info Section */}
      <Card className="p-5">
        <SectionHeading 
          title="Token Information" 
          description="Cryptog token details and statistics"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Token Name</p>
              <p className="text-lg font-semibold">Cryptog Token (CRYP)</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Decimals</p>
              <p className="text-lg font-semibold">18</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Supply</p>
              <p className="text-lg font-semibold">1,000,000,000 CRYP</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Token Sale Progress</p>
              <div className="space-y-2">
                <Progress value={percentageSold} className="h-2" />
                <div className="flex justify-between text-sm">
                  <span>{tokensSold.toLocaleString()} CRYP</span>
                  <span>{percentageSold.toFixed(1)}% of total supply</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-64">
            <p className="text-sm font-medium mb-2">Token Allocation</p>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tokenData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${(value / 1000000).toFixed(1)}M CRYP`, 'Amount']}
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
      </Card>

      {/* Geographical Distribution */}
      <Card className="p-5">
        <SectionHeading 
          title="Geographical Distribution" 
          description="User distribution by country"
        />
        
        <div className="overflow-x-auto">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Country</th>
                <th>Users</th>
                <th>Percentage</th>
                <th>Distribution</th>
              </tr>
            </thead>
            <tbody>
              {locationData.map((location, index) => (
                <tr key={index} className="hover:bg-muted/50">
                  <td className="font-medium">{location.country}</td>
                  <td>{location.users.toLocaleString()}</td>
                  <td>{location.percentage}%</td>
                  <td>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full" 
                        style={{ width: `${location.percentage}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-5">
          <SectionHeading 
            title="Investment Metrics" 
            description="Key ICO performance indicators"
          />
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Average Investment</span>
                <span className="font-medium">$1,450</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Largest Investment</span>
                <span className="font-medium">$125,000</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Smallest Investment</span>
                <span className="font-medium">$50</span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Conversion Rate</span>
                <span className="font-medium">8.4%</span>
              </div>
              <Progress value={42} className="h-2" />
            </div>
          </div>
        </Card>
        
        <Card className="p-5">
          <SectionHeading 
            title="Upcoming Milestones" 
            description="Token sale and development roadmap"
          />
          
          <div className="space-y-4">
            <div className="border-l-2 border-primary pl-4 pb-5 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-0"></div>
              <p className="font-medium">Public Sale Launch</p>
              <p className="text-sm text-muted-foreground">July 25, 2023</p>
              <p className="text-sm mt-1">Beginning of public token sale with initial price of $0.075.</p>
            </div>
            
            <div className="border-l-2 border-primary pl-4 pb-5 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-0"></div>
              <p className="font-medium">Exchange Listing</p>
              <p className="text-sm text-muted-foreground">August 15, 2023</p>
              <p className="text-sm mt-1">Listing on major decentralized and centralized exchanges.</p>
            </div>
            
            <div className="border-l-2 border-primary pl-4 pb-5 relative">
              <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-0"></div>
              <p className="font-medium">Staking Program</p>
              <p className="text-sm text-muted-foreground">September 1, 2023</p>
              <p className="text-sm mt-1">Launch of token staking program with annual yields.</p>
            </div>
            
            <div className="border-l-2 border-muted pl-4 relative">
              <div className="absolute w-3 h-3 bg-muted rounded-full -left-[7px] top-0"></div>
              <p className="font-medium">Platform Integration</p>
              <p className="text-sm text-muted-foreground">October 10, 2023</p>
              <p className="text-sm mt-1">Full integration with Cryptog fantasy platform features.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DashboardICO;
