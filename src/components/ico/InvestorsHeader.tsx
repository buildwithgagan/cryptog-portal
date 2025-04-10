
import { Download, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/shared/PageTitle";

const InvestorsHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <PageTitle 
        title="ICO Investors" 
        subtitle="View and manage your token investors."
      />
      
      <div className="flex items-center gap-2 mt-4 md:mt-0">
        <Button 
          size="sm" 
          variant="outline"
          className="flex items-center gap-1"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        
        <Button 
          size="sm"
          className="flex items-center gap-1"
        >
          <UserPlus className="h-4 w-4" />
          Add Investor
        </Button>
      </div>
    </div>
  );
};

export default InvestorsHeader;
