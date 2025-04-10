
import { Download, Filter, Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import PageTitle from "@/components/shared/PageTitle";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InvestorsList from "@/components/ico/InvestorsList";

const ICOInvestors = () => {
  return (
    <div className="space-y-6">
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
      
      <Separator />
      
      <Card className="p-5">
        <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between mb-6">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search investors..."
              className="pl-8"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
        
        <InvestorsList />
      </Card>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing <strong>8</strong> investors
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ICOInvestors;
