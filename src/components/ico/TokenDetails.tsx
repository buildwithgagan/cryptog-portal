
import { Card } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";

const TokenDetails = () => {
  return (
    <Card className="p-5">
      <SectionHeading 
        title="Token Details" 
        description="Key information about the Cryptog token"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Token Name</div>
          <div className="text-lg font-medium">Cryptog (CTOG)</div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Decimals</div>
          <div className="text-lg font-medium">18</div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
          <div className="text-lg font-medium">1,000,000,000</div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Contract Address</div>
          <div className="text-lg font-medium truncate" title="0x742d35Cc6634C0532925a3b844Bc454e4438f44e">
            0x742d35Cc6...38f44e
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Pre-Sale Progress</div>
          <div className="flex items-end gap-2">
            <div className="text-2xl font-semibold">185.2M</div>
            <div className="text-sm text-muted-foreground mb-1">/ 250M tokens</div>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full mt-2">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: '74%' }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>74.1% Complete</span>
            <span>Ends in 18 days</span>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Price History</div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Seed Round:</span>
              <span className="font-medium">$0.012</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Private Sale:</span>
              <span className="font-medium">$0.018</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Pre-Sale:</span>
              <span className="font-medium">$0.025</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Current:</span>
              <span className="font-medium text-green-600">$0.029</span>
            </div>
          </div>
        </div>
        
        <div className="p-4 border rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Distribution Schedule</div>
          <div className="mt-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Team & Advisors:</span>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Ecosystem Growth:</span>
              <span className="font-medium">25%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Public Sale:</span>
              <span className="font-medium">40%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Reserve:</span>
              <span className="font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TokenDetails;
