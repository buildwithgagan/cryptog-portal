
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
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

const PerformanceChart = () => {
  return (
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
  );
};

export default PerformanceChart;
