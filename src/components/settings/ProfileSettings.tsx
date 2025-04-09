
import { useState, useRef } from "react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Camera, Loader2, PenLine, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\d+$/, "Phone number must contain only digits"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.date().nullable(),
  profilePhoto: z.string().nullable(),
});

const ProfileSettings = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Initialize with mock data (replace with real data in a production app)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "john.doe@example.com",
      dateOfBirth: new Date("1990-01-01"),
      profilePhoto: null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("Submitting profile data:", values);
      // This would be an API call to save profile in a real app
      // await updateProfileAPI(values);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PNG, JPG, JPEG, GIF or SVG file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please upload a file less than 3MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    // Convert file to data URL for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      form.setValue("profilePhoto", reader.result as string);
      setUploading(false);
      toast({
        title: "Photo Uploaded",
        description: "Your profile photo has been successfully uploaded.",
      });
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removePhoto = () => {
    form.setValue("profilePhoto", null);
    toast({
      title: "Photo Removed",
      description: "Your profile photo has been removed.",
    });
  };

  const getInitials = () => {
    const firstName = form.watch("firstName") || "";
    const lastName = form.watch("lastName") || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Profile</h2>
        <p className="text-muted-foreground">
          Manage your personal information and how it appears on the platform.
        </p>
        <Separator className="my-6" />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Enhanced Profile Photo Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col gap-6">
                <h3 className="text-lg font-medium">Profile Photo</h3>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="relative" 
                    onMouseEnter={() => setHovered(true)} 
                    onMouseLeave={() => setHovered(false)}>
                    {/* Styled Avatar with hover effects */}
                    <Avatar className="w-32 h-32 border-4 border-primary/10 shadow-md">
                      {form.watch("profilePhoto") ? (
                        <AvatarImage 
                          src={form.watch("profilePhoto") || ""} 
                          alt="Profile" 
                          className="object-cover"
                        />
                      ) : (
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-primary/20 to-primary/10">
                          {getInitials()}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    {/* Overlay with controls on hover */}
                    {hovered && form.watch("profilePhoto") && (
                      <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center gap-2">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 bg-white/20 hover:bg-white/40 text-white"
                          onClick={triggerFileInput}
                        >
                          <PenLine className="h-4 w-4" />
                        </Button>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon"
                          className="h-8 w-8 bg-white/20 hover:bg-white/40 text-white"
                          onClick={removePhoto}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      {!form.watch("profilePhoto") ? (
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={triggerFileInput}
                          disabled={uploading}
                          className="bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20 transition-all"
                        >
                          {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Camera className="w-4 h-4 mr-2" />}
                          {uploading ? "Uploading..." : "Upload Photo"}
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={triggerFileInput}
                            disabled={uploading}
                          >
                            {uploading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <PenLine className="w-4 h-4 mr-2" />}
                            Change Photo
                          </Button>
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={removePhoto}
                            disabled={uploading}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".png,.jpg,.jpeg,.gif,.svg"
                        className="hidden"
                      />
                    </div>
                    
                    <p className="text-sm text-muted-foreground max-w-md">
                      Upload a profile picture (PNG, JPG, JPEG, GIF, SVG). Max size: 3MB. Recommended size: 200x200 px.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6">Personal Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your phone number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* Date of Birth */}
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of Birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value || undefined}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>
          
          <Button type="submit" className="mt-6">
            Save Changes
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;
