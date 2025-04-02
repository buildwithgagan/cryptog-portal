
import { useState } from "react";
import { Bitcoin, Check, CircleDollarSign, Edit, PlusCircle, Trash2, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import PageTitle from "@/components/shared/PageTitle";
import SectionHeading from "@/components/shared/SectionHeading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast"; 
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Asset type definition
interface Asset {
  id: string;
  name: string;
  icon: JSX.Element;
  iconType: string;
  creditRequired: number;
  isActive: boolean;
}

// Icon mapping for selection
const iconOptions = [
  { value: "bitcoin", label: "Bitcoin", element: <Bitcoin className="text-orange-500" /> },
  { value: "circle-dollar-blue", label: "Circle Dollar (Blue)", element: <CircleDollarSign className="text-blue-500" /> },
  { value: "circle-dollar-green", label: "Circle Dollar (Green)", element: <CircleDollarSign className="text-green-500" /> },
  { value: "circle-dollar-purple", label: "Circle Dollar (Purple)", element: <CircleDollarSign className="text-purple-500" /> },
  { value: "circle-dollar-yellow", label: "Circle Dollar (Yellow)", element: <CircleDollarSign className="text-yellow-500" /> },
  { value: "circle-dollar-red", label: "Circle Dollar (Red)", element: <CircleDollarSign className="text-red-500" /> },
];

// Form schema for adding a new asset
const assetFormSchema = z.object({
  name: z.string().min(2, "Asset name must be at least 2 characters"),
  creditRequired: z.number().min(1, "Credit required must be at least 1"),
  iconType: z.string().min(1, "Please select an icon"),
  isActive: z.boolean().default(true),
});

type AssetFormValues = z.infer<typeof assetFormSchema>;

const CryptogAssets = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Form setup for adding a new asset
  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      creditRequired: 5,
      iconType: "circle-dollar-blue",
      isActive: true,
    },
  });
  
  // Initial assets data
  const [assets, setAssets] = useState<Asset[]>([
    { 
      id: "1", 
      name: "Bitcoin", 
      icon: <Bitcoin className="text-orange-500" />,
      iconType: "bitcoin", 
      creditRequired: 10, 
      isActive: true 
    },
    { 
      id: "2", 
      name: "Ethereum", 
      icon: <CircleDollarSign className="text-purple-500" />,
      iconType: "circle-dollar-purple", 
      creditRequired: 8, 
      isActive: true 
    },
    { 
      id: "3", 
      name: "Solana", 
      icon: <CircleDollarSign className="text-green-500" />,
      iconType: "circle-dollar-green", 
      creditRequired: 6, 
      isActive: true 
    },
    { 
      id: "4", 
      name: "Cardano (ADA)", 
      icon: <CircleDollarSign className="text-blue-500" />,
      iconType: "circle-dollar-blue", 
      creditRequired: 4, 
      isActive: false 
    },
    { 
      id: "5", 
      name: "Floki", 
      icon: <CircleDollarSign className="text-yellow-500" />,
      iconType: "circle-dollar-yellow", 
      creditRequired: 5, 
      isActive: true 
    },
    { 
      id: "6", 
      name: "PEPE", 
      icon: <CircleDollarSign className="text-green-400" />,
      iconType: "circle-dollar-green", 
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

  // Get icon element based on iconType
  const getIconElement = (iconType: string) => {
    const icon = iconOptions.find(icon => icon.value === iconType);
    return icon ? icon.element : <CircleDollarSign className="text-blue-500" />;
  };

  // Add new asset
  const addAsset = (data: AssetFormValues) => {
    const newAsset: Asset = {
      id: (assets.length + 1).toString(),
      name: data.name,
      icon: getIconElement(data.iconType),
      iconType: data.iconType,
      creditRequired: data.creditRequired,
      isActive: data.isActive,
    };
    
    setAssets([...assets, newAsset]);
    setIsAddDialogOpen(false);
    form.reset();
    
    toast({
      title: "Asset added",
      description: `${data.name} has been added to the assets list.`,
    });
  };

  return (
    <div className="space-y-6 animate-enter">
      <div className="flex items-center justify-between">
        <PageTitle 
          title="Manage Cryptog Assets" 
          subtitle="Control cryptocurrency assets available in the Cryptog platform."
        />
        <Button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Asset
        </Button>
      </div>

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

      {/* Add Asset Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Enter the details for the new cryptocurrency asset.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addAsset)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Bitcoin, Ethereum, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="creditRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits Required</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="iconType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon.value} value={icon.value}>
                            <div className="flex items-center gap-2">
                              {icon.element}
                              <span>{icon.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Status: {field.value ? "Active" : "Inactive"}
                      </FormLabel>
                      <p className="text-sm text-muted-foreground">
                        {field.value 
                          ? "Asset will be available for contests" 
                          : "Asset will not be available for contests"}
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Asset</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CryptogAssets;
