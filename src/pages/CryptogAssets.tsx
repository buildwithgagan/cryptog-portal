import { useState, useRef } from "react";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Asset type definition
interface Asset {
  id: string;
  name: string;
  icon: JSX.Element;
  iconUrl: string;
  creditRequired: number;
  isActive: boolean;
}

// Default icon if no icon is uploaded
const DefaultIcon = () => <CircleDollarSign className="text-blue-500" />;

// File size limit: 3MB in bytes
const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/svg+xml"];

// Form schema for adding a new asset with validations
const assetFormSchema = z.object({
  name: z.string().min(2, "Asset name must be at least 2 characters"),
  creditRequired: z.number()
    .min(1, "Credit required must be at least 1")
    .max(1000, "Credit required must not exceed 1000"),
  icon: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, "Icon is required")
    .refine(
      (files) => files[0]?.size <= MAX_FILE_SIZE,
      "File size must not exceed 3MB"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png, .gif and .svg formats are supported"
    ),
  isActive: z.boolean().default(true),
});

type AssetFormValues = z.infer<typeof assetFormSchema>;

const CryptogAssets = () => {
  const { toast } = useToast();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form setup for adding a new asset
  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      name: "",
      creditRequired: 5,
      isActive: true,
    },
  });
  
  // Initial assets data
  const [assets, setAssets] = useState<Asset[]>([
    { 
      id: "1", 
      name: "Bitcoin", 
      icon: <Bitcoin className="text-orange-500" />,
      iconUrl: "",
      creditRequired: 10, 
      isActive: true 
    },
    { 
      id: "2", 
      name: "Ethereum", 
      icon: <CircleDollarSign className="text-purple-500" />,
      iconUrl: "",
      creditRequired: 8, 
      isActive: true 
    },
    { 
      id: "3", 
      name: "Solana", 
      icon: <CircleDollarSign className="text-green-500" />,
      iconUrl: "",
      creditRequired: 6, 
      isActive: true 
    },
    { 
      id: "4", 
      name: "Cardano (ADA)", 
      icon: <CircleDollarSign className="text-blue-500" />,
      iconUrl: "",
      creditRequired: 4, 
      isActive: false 
    },
    { 
      id: "5", 
      name: "Floki", 
      icon: <CircleDollarSign className="text-yellow-500" />,
      iconUrl: "",
      creditRequired: 5, 
      isActive: true 
    },
    { 
      id: "6", 
      name: "PEPE", 
      icon: <CircleDollarSign className="text-green-400" />,
      iconUrl: "",
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

  // Convert an uploaded file to a data URL
  const fileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // Add new asset with file upload handling
  const addAsset = async (data: AssetFormValues) => {
    try {
      const file = data.icon[0];
      const iconUrl = await fileToDataUrl(file);
      
      // Create icon element based on file type
      let iconElement: JSX.Element = <DefaultIcon />;
      
      // Assign appropriate icon based on file type
      if (file.type.includes('svg')) {
        iconElement = <img src={iconUrl} alt={data.name} className="w-6 h-6" />;
      } else {
        iconElement = <div className="w-6 h-6 rounded-full overflow-hidden">
          <img src={iconUrl} alt={data.name} className="w-full h-full object-cover" />
        </div>;
      }
      
      const newAsset: Asset = {
        id: (assets.length + 1).toString(),
        name: data.name,
        icon: iconElement,
        iconUrl: iconUrl,
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
    } catch (error) {
      console.error("Error adding asset:", error);
      toast({
        title: "Error",
        description: "Failed to process the image. Please try again.",
        variant: "destructive",
      });
    }
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Asset</DialogTitle>
            <DialogDescription>
              Enter the details for the new cryptocurrency asset.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(addAsset)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asset Name <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="Bitcoin, Ethereum, etc." {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the full name of the cryptocurrency asset.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="creditRequired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credits Required <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min={1}
                        max={1000}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the number of credits required to use this asset (between 1 and 1000).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="icon"
                render={({ field: { onChange, value, ...fieldProps } }) => (
                  <FormItem>
                    <FormLabel>Icon <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="flex flex-col gap-2">
                        <Input 
                          id="icon"
                          type="file"
                          ref={fileInputRef}
                          accept=".jpg,.jpeg,.png,.gif,.svg"
                          onChange={(e) => {
                            onChange(e.target.files);
                          }}
                          {...fieldProps}
                        />
                        {form.formState.errors.icon && (
                          <p className="text-sm font-medium text-destructive">
                            {form.formState.errors.icon.message}
                          </p>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription className="text-xs space-y-1">
                      <p>Upload an icon for the cryptocurrency asset.</p>
                      <ul className="list-disc pl-4 text-muted-foreground">
                        <li>Accepted formats: PNG, JPG, JPEG, GIF, SVG</li>
                        <li>Maximum file size: 3MB</li>
                        <li>Recommended dimensions: 200px x 200px</li>
                        <li>Square aspect ratio for best results</li>
                      </ul>
                    </FormDescription>
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
                        Status: {field.value ? "Active" : "Inactive"} <span className="text-red-500">*</span>
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
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setIsAddDialogOpen(false);
                    form.reset();
                  }}
                >
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
