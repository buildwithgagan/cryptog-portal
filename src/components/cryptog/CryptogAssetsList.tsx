
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeading from "@/components/shared/SectionHeading";
import { ArrowUpDown, Filter, Plus, Search } from "lucide-react";

const CryptogAssetsList = () => {
  const [assetFilter, setAssetFilter] = useState("all");
  
  // Placeholder data
  const assets = [
    { id: 1, name: "Bitcoin", symbol: "BTC", price: "$60,234.21", change: "+2.4%" },
    { id: 2, name: "Ethereum", symbol: "ETH", price: "$2,345.67", change: "+1.8%" },
    { id: 3, name: "Solana", symbol: "SOL", price: "$143.21", change: "+5.2%" },
    { id: 4, name: "Cardano", symbol: "ADA", price: "$0.45", change: "-1.3%" },
    { id: 5, name: "Polkadot", symbol: "DOT", price: "$7.89", change: "+0.7%" },
    { id: 6, name: "Ripple", symbol: "XRP", price: "$0.52", change: "-0.8%" }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeading title="Cryptog Assets" description="Manage cryptocurrency assets" />
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Asset
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search assets..."
            className="pl-8"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Tabs defaultValue="all" className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="all" onClick={() => setAssetFilter("all")}>All</TabsTrigger>
              <TabsTrigger value="active" onClick={() => setAssetFilter("active")}>Active</TabsTrigger>
              <TabsTrigger value="inactive" onClick={() => setAssetFilter("inactive")}>Inactive</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="font-semibold">{asset.symbol.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{asset.name}</h3>
                    <p className="text-xs text-muted-foreground">{asset.symbol}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold">{asset.price}</p>
                <p className={`text-xs ${asset.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.change}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Remove</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CryptogAssetsList;
