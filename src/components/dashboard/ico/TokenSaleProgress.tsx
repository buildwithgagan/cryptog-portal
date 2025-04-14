
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

// Sample data for token sale by stage
const saleStageData = [
  {
    stage: "Seed Sale",
    tokensAllocated: 150000000,
    tokensSold: 150000000,
    amountCollected: "$1.5M",
    completion: 100
  },
  {
    stage: "Private Sale",
    tokensAllocated: 250000000,
    tokensSold: 200000000,
    amountCollected: "$2.4M",
    completion: 80
  },
  {
    stage: "Public Sale",
    tokensAllocated: 350000000,
    tokensSold: 185200000,
    amountCollected: "$5.4M",
    completion: 53
  }
];

// Sample data for sale progress over time
const saleProgressData = [
  { month: "Jan", tokens: 50000000 },
  { month: "Feb", tokens: 120000000 },
  { month: "Mar", tokens: 210000000 },
  { month: "Apr", tokens: 280000000 },
  { month: "May", tokens: 350000000 },
  { month: "Jun", tokens: 535200000 }
];

const chartConfig = {
  tokens: { label: "Tokens Sold", color: "#8B5CF6" }
};

const TokenSaleProgress = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Token Sale Progress" 
        description="Detailed breakdown of token sales across different stages"
        icon={TrendingUp}
      />
      
      <CardContent className="p-0 mt-4">
        {/* Stage-wise Breakdown */}
        <div className="space-y-6 mb-8">
          <h3 className="text-sm font-medium">Sale Stages</h3>
          
          {saleStageData.map((stage, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-medium">{stage.stage}</h4>
                <span className="text-xs text-muted-foreground">
                  {stage.tokensSold.toLocaleString()} / {stage.tokensAllocated.toLocaleString()} tokens
                </span>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Amount Collected: {stage.amountCollected}</span>
                <span>{stage.completion}% Complete</span>
              </div>
              <Progress value={stage.completion} className="h-2" />
            </div>
          ))}
        </div>
        
        {/* Graph View */}
        <div className="mt-8">
          <h3 className="text-sm font-medium mb-4">Sale Progress Over Time</h3>
          <div className="h-[300px]">
            <ChartContainer config={chartConfig} className="mt-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={saleProgressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => (value / 1000000) + "M"} />
                  <Tooltip
                    content={(props: TooltipProps<ValueType, NameType>) => {
                      if (props.active && props.payload && props.payload.length) {
                        return (
                          <ChartTooltipContent
                            className="w-[180px]"
                            content={
                              <div>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-muted-foreground">Tokens Sold:</span>
                                  <span className="font-medium">
                                    {(Number(props.payload[0].value) / 1000000).toFixed(1)}M
                                  </span>
                                </div>
                              </div>
                            }
                          />
                        );
                      }
                      return null;
                    }}
                  />
                  <Legend />
                  <Bar dataKey="tokens" name="Tokens Sold" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenSaleProgress;
