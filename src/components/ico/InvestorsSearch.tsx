
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface InvestorsSearchProps {
  children: React.ReactNode;
}

const InvestorsSearch = ({ children }: InvestorsSearchProps) => {
  return (
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
      
      {children}
    </Card>
  );
};

export default InvestorsSearch;
