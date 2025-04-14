
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";

const TopPerformingStocks = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Top Performing Stocks" 
        description="Most selected winning stocks"
      />
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-primary">AAPL</span>
            </div>
            <div>
              <p className="font-medium">Apple Inc.</p>
              <p className="text-sm text-muted-foreground">Technology</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-600">+12.4%</p>
            <p className="text-sm text-muted-foreground">30 day gain</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-primary">MSFT</span>
            </div>
            <div>
              <p className="font-medium">Microsoft Corp.</p>
              <p className="text-sm text-muted-foreground">Technology</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-600">+9.8%</p>
            <p className="text-sm text-muted-foreground">30 day gain</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-primary">NVDA</span>
            </div>
            <div>
              <p className="font-medium">NVIDIA Corp.</p>
              <p className="text-sm text-muted-foreground">Technology</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-600">+18.2%</p>
            <p className="text-sm text-muted-foreground">30 day gain</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold text-primary">AMZN</span>
            </div>
            <div>
              <p className="font-medium">Amazon.com Inc.</p>
              <p className="text-sm text-muted-foreground">E-Commerce</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-600">+7.6%</p>
            <p className="text-sm text-muted-foreground">30 day gain</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TopPerformingStocks;
