
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { ShieldCheck, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

// This component combines the token distribution controls and notification/alerts sections
const AdminControls = () => {
  // Sample alerts
  const alerts = [
    {
      id: 1,
      type: "warning",
      message: "Public sale tokens are 85% sold - prepare next phase",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "error",
      message: "3 unconfirmed contributions require manual verification",
      time: "4 hours ago"
    },
    {
      id: 3, 
      type: "info",
      message: "KYC approval rate at 92% - 24 pending reviews",
      time: "1 day ago"
    }
  ];

  return (
    <Card className="p-5">
      <SectionHeading 
        title="Admin Controls" 
        description="Token distribution and system notifications"
        icon={ShieldCheck}
      />
      
      <CardContent className="p-0 mt-4 space-y-6">
        {/* Token Distribution Controls */}
        <div>
          <h3 className="text-sm font-medium mb-4">Token Distribution</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Treasury Wallet Balance</p>
                <p className="text-xl font-semibold mt-1">214.8M CTG</p>
              </div>
              <Button>Distribute Tokens</Button>
            </div>
            
            <div className="p-4 border rounded-md">
              <h4 className="text-sm font-medium mb-3">Pending Distributions</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Manual purchases</span>
                    <span>12 investors</span>
                  </div>
                  <Progress value={70} className="h-1 mt-1" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Airdrop #24</span>
                    <span>38 recipients</span>
                  </div>
                  <Progress value={25} className="h-1 mt-1" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" size="sm">Process All</Button>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Notifications & Alerts */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium flex items-center">
              <Bell className="mr-2 h-4 w-4" />
              System Alerts
            </h3>
            <Button variant="outline" size="sm">Mark All Read</Button>
          </div>
          
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`p-3 rounded-md border border-${alert.type === 'warning' ? 'yellow' : alert.type === 'error' ? 'red' : 'blue'}-200 bg-${alert.type === 'warning' ? 'yellow' : alert.type === 'error' ? 'red' : 'blue'}-50`}>
                <div className="flex justify-between">
                  <p className={`text-sm text-${alert.type === 'warning' ? 'yellow' : alert.type === 'error' ? 'red' : 'blue'}-800`}>{alert.message}</p>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="link" size="sm" className="mt-2 p-0">View all alerts</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminControls;
