
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import SectionHeading from "@/components/shared/SectionHeading";
import { AreaChart, ArrowUp, DollarSign, Gem, Trophy, Users } from "lucide-react";

const CryptogOverview = () => {
  // Placeholder data
  const stats = [
    {
      title: "Total Active Users",
      value: "23,456",
      change: "+12%",
      icon: Users
    },
    {
      title: "Token Price (CTG)",
      value: "$0.45",
      change: "+3.2%",
      icon: DollarSign
    },
    {
      title: "Active Contests",
      value: "47",
      change: "+5",
      icon: Trophy
    },
    {
      title: "Total Assets",
      value: "250+",
      change: "+15",
      icon: Gem
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeading
        title="Platform Overview"
        description="Key metrics and performance indicators"
        icon={AreaChart}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                <div className="flex items-center mt-1 text-sm text-green-600">
                  <ArrowUp size={14} className="mr-1" />
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="bg-primary/10 p-2.5 rounded-full">
                <stat.icon size={20} className="text-primary" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-5">
          <SectionHeading title="Market Performance" />
          <div className="h-64 w-full flex items-center justify-center bg-muted/20 rounded-md">
            <p className="text-muted-foreground">Chart data will appear here</p>
          </div>
        </Card>

        <Card className="p-5">
          <SectionHeading title="Recent Activity" />
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">View All Activity</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CryptogOverview;
