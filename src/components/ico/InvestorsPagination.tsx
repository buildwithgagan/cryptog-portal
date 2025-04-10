
import { Button } from "@/components/ui/button";

const InvestorsPagination = () => {
  return (
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
  );
};

export default InvestorsPagination;
