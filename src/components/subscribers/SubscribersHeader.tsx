
import { UserPlus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/shared/PageTitle";
import { Separator } from "@/components/ui/separator";

interface SubscribersHeaderProps {
  onExport: () => void;
}

const SubscribersHeader = ({ onExport }: SubscribersHeaderProps) => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <PageTitle 
          title="Subscribers" 
          subtitle="Manage your newsletter subscribers."
        />
        
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <Button 
            size="sm" 
            onClick={onExport}
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
            Add Subscriber
          </Button>
        </div>
      </div>
      
      <Separator className="my-6" />
    </>
  );
};

export default SubscribersHeader;
