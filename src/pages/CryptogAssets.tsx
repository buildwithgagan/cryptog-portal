import { useState } from "react";
import { Bitcoin, Check, CircleDollarSign, Edit, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast"; // Fixed import path

// Asset type definition
interface Asset {
  id: string;
  name: string;
  icon: JSX.Element;
  creditRequired: number;
  isActive: boolean;
}

const CryptogAssets = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  
  // Initial assets data
  const [assets, setAssets] = useState<Asset[]>([
    { 
      id: "1", 
      name: "Bitcoin", 
      icon: <Bitcoin className="text-orange-500" />, 
      creditRequired: 10, 
      isActive: true 
    },
    { 
      id: "2", 
      name: "Ethereum", 
      icon: <CircleDollarSign className="text-purple-500" />, 
      creditRequired: 8, 
      isActive: true 
    },
    { 
      id: "3", 
      name: "Solana", 
      icon: <CircleDollarSign className="text-green-500" />, 
      creditRequired: 6, 
      isActive: true 
    },
    { 
      id: "4", 
      name: "Cardano (ADA)", 
      icon: <CircleDollarSign className="text-blue-500" />, 
      creditRequired: 4, 
      isActive: false 
    },
    { 
      id: "5", 
      name: "Floki", 
      icon: <CircleDollarSign className="text-yellow-500" />, 
      creditRequired: 5, 
      isActive: true 
    },
    { 
      id: "6", 
      name: "PEPE", 
      icon: <CircleDollarSign className="text-green-400" />, 
      creditRequired: 3, 
      isActive: false 
    },
  ]);

  // Start editing credits
  const startEditing = (asset: Asset) => {
    setEditingId(asset.id);
    setEditValue(asset.creditRequired);
  };

  // Save edited credits
  const saveEditing = (id: string) => {
    setAssets(assets.map(asset => 
      asset.id === id 
        ? { ...asset, creditRequired: editValue } 
        : asset
    ));
    
    setEditingId(null);
    toast({
      title: "Credits updated",
      description: "Asset credit requirement has been updated successfully.",
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
  };

  // Toggle asset status
  const toggleStatus = (id: string) => {
    setAssets(assets.map(asset => 
      asset.id === id 
        ? { ...asset, isActive: !asset.isActive } 
        : asset
    ));
    
    const asset = assets.find(a => a.id === id);
    toast({
      title: `Asset ${asset?.isActive ? 'deactivated' : 'activated'}`,
      description: `${asset?.name} has been ${asset?.isActive ? 'deactivated' : 'activated'} successfully.`,
    });
  };

  // Delete asset
  const deleteAsset = (id: string) => {
    const asset = assets.find(a => a.id === id);
    setAssets(assets.filter(asset => asset.id !== id));
    
    toast({
      title: "Asset deleted",
      description: `${asset?.name} has been removed from the list.`,
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6 animate-enter">
      <PageTitle 
        title="Manage Cryptog Assets" 
        subtitle="Control cryptocurrency assets available in the Cryptog platform."
      />

      <Card className="p-5">
        <SectionHeading 
          title="Asset List" 
          description="All cryptocurrencies available for contests"
        />
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">S.No.</TableHead>
                <TableHead>Coin Name</TableHead>
                <TableHead>Credit Required</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assets.map((asset, index) => (
                <TableRow key={asset.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {asset.icon}
                      <span>{asset.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {editingId === asset.id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(Number(e.target.value))}
                          className="w-16 h-8"
                          min={1}
                        />
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7" 
                          onClick={() => saveEditing(asset.id)}
                        >
                          <Check className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7" 
                          onClick={cancelEditing}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{asset.creditRequired}</span>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-7 w-7" 
                          onClick={() => startEditing(asset)}
                        >
                          <Edit className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={asset.isActive} 
                        onCheckedChange={() => toggleStatus(asset.id)} 
                      />
                      <span className={asset.isActive ? "text-green-500" : "text-muted-foreground"}>
                        {asset.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => deleteAsset(asset.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CryptogAssets;
