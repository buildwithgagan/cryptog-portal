
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PenLine, Trash2, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/svg+xml"];
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB

interface ProfilePhotoSectionProps {
  form: UseFormReturn<any>;
  formSchema: z.ZodType<any>;
}

const ProfilePhotoSection = ({ form, formSchema }: ProfilePhotoSectionProps) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [hovered, setHovered] = useState(false);

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

    // Validate square dimensions using FileReader and Image
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        if (img.width !== img.height) {
          setUploading(false);
          toast({
            title: "Invalid image dimensions",
            description: "Please upload a square image (equal width and height).",
            variant: "destructive",
          });
          return;
        }
        
        // If all validations pass, set the image
        form.setValue("profilePhoto", reader.result as string);
        setUploading(false);
        toast({
          title: "Photo Uploaded",
          description: "Your profile photo has been successfully uploaded.",
        });
      };
      
      img.onerror = () => {
        setUploading(false);
        toast({
          title: "Error loading image",
          description: "There was an error processing your image. Please try another one.",
          variant: "destructive",
        });
      };
      
      img.src = e.target?.result as string;
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
                Upload a square profile picture (PNG, JPG, JPEG, GIF, SVG). Max size: 3MB. Recommended size: 200x200 px.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfilePhotoSection;
