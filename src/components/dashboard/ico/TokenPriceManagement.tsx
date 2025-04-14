import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/shared/SectionHeading";
import { Settings, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import useICOData from "@/hooks/useICOData";

const TokenPriceManagement = () => {
  const { stats, updateTokenPrice } = useICOData();

  return (
    <Card className="p-5">
      <SectionHeading 
        title="Token Price Management" 
        description="Configure token price and sale stage settings"
        icon={Settings}
      />
      
      <CardContent className="p-0 mt-4">
        <div className="space-y-6">
          {/* Current Stage Status */}
          <div className="border rounded-md p-4 bg-muted/20">
            <h3 className="text-sm font-medium mb-2">Active Sale Stage</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Public Sale</p>
                <p className="text-xs text-muted-foreground">Current token price: {stats.currentTokenPrice}</p>
              </div>
              <Switch defaultChecked id="active-stage" />
            </div>
          </div>
          
          {/* Price Setting */}
          <div>
            <h3 className="text-sm font-medium mb-4">Set Token Price</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token-price">Token Price (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="token-price" 
                      className="pl-9" 
                      defaultValue={stats.currentTokenPrice.replace('$', '')} 
                      onChange={(e) => updateTokenPrice(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="hard-cap">Hard Cap (USD)</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="hard-cap" className="pl-9" defaultValue="10000000" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input id="start-date" type="date" defaultValue="2025-03-15" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input id="end-date" type="date" defaultValue="2025-05-15" />
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Other Sale Stages */}
          <div>
            <h3 className="text-sm font-medium mb-4">Other Sale Stages</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Private Sale</p>
                  <p className="text-xs text-muted-foreground">$0.024 per token</p>
                </div>
                <Switch id="private-sale" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Seed Sale</p>
                  <p className="text-xs text-muted-foreground">$0.019 per token</p>
                </div>
                <Switch id="seed-sale" />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenPriceManagement;
