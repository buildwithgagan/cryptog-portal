
import { Flag, Plus, DollarSign, Users, ArrowDownToLine } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SectionHeading from "@/components/shared/SectionHeading";

const AdminQuickActions = () => {
  return (
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
  );
};

export default AdminQuickActions;
