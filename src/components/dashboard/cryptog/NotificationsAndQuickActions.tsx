
import { Bell, Flag, Clock, DollarSign, Users, Wallet, Plus, ArrowDownToLine } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";

// System alerts type
interface SystemAlert {
  id: number;
  type: "contest" | "price" | "kyc" | "wallet";
  message: string;
  time: string;
}

// System alerts
const systemAlerts: SystemAlert[] = [
  { id: 1, type: "contest", message: "ETH Titans League starts in 45 minutes", time: "15 min ago" },
  { id: 2, type: "price", message: "CTG token price update needed", time: "1 hour ago" },
  { id: 3, type: "kyc", message: "25 new KYC verifications pending", time: "2 hours ago" },
  { id: 4, type: "wallet", message: "Failed withdrawal detected", time: "4 hours ago" }
];

const NotificationsAndQuickActions = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Notifications */}
      <Card className="p-5">
        <SectionHeading 
          title="Notifications & Alerts" 
          description="System alerts and notifications"
          icon={<Bell className="h-5 w-5" />}
        />
        
        <div className="space-y-4">
          {systemAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start p-3 border rounded-lg">
              {alert.type === "contest" && <Clock className="h-5 w-5 mr-3 text-blue-500" />}
              {alert.type === "price" && <DollarSign className="h-5 w-5 mr-3 text-green-500" />}
              {alert.type === "kyc" && <Users className="h-5 w-5 mr-3 text-amber-500" />}
              {alert.type === "wallet" && <Wallet className="h-5 w-5 mr-3 text-red-500" />}
              <div className="flex-1">
                <p className="text-sm font-medium">{alert.message}</p>
                <p className="text-xs text-muted-foreground">{alert.time}</p>
              </div>
              <Button variant="ghost" size="sm">View</Button>
            </div>
          ))}
        </div>
      </Card>
      
      {/* Quick Actions */}
      <Card className="p-5">
        <SectionHeading 
          title="Quick Actions" 
          description="Admin shortcuts"
          icon={<Flag className="h-5 w-5" />}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <Button className="justify-start">
            <Plus className="mr-2 h-4 w-4" /> Create New Contest
          </Button>
          <Button className="justify-start">
            <Plus className="mr-2 h-4 w-4" /> Add New Asset
          </Button>
          <Button className="justify-start">
            <DollarSign className="mr-2 h-4 w-4" /> Set CTG Sale Price
          </Button>
          <Button className="justify-start">
            <Users className="mr-2 h-4 w-4" /> View Pending KYC
          </Button>
          <Button className="justify-start col-span-2">
            <ArrowDownToLine className="mr-2 h-4 w-4" /> Access Reports (CSV/PDF)
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationsAndQuickActions;
