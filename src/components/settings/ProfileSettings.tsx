
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileSettingsProps {
  urls: { id: number; url: string }[];
  addNewUrl: () => void;
}

const ProfileSettings = ({ urls, addNewUrl }: ProfileSettingsProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Profile</h2>
        <p className="text-muted-foreground">This is how others will see you on the site.</p>
        <Separator className="my-6" />
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Username</label>
          <Input defaultValue="shadcn" className="max-w-md" />
          <p className="text-sm text-muted-foreground mt-2">
            This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
          </p>
        </div>
        
        <div className="pt-2">
          <label className="text-sm font-medium mb-2 block">Email</label>
          <Select>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select a verified email to display" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email1">admin@example.com</SelectItem>
              <SelectItem value="email2">user@example.com</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            You can manage verified email addresses in your email settings.
          </p>
        </div>
        
        <div className="pt-2">
          <label className="text-sm font-medium mb-2 block">Bio</label>
          <Textarea defaultValue="I own a computer." className="max-w-md" />
          <p className="text-sm text-muted-foreground mt-2">
            You can @mention other users and organizations to link to them.
          </p>
        </div>
        
        <div className="pt-2">
          <label className="text-sm font-medium mb-2 block">URLs</label>
          <p className="text-sm text-muted-foreground mb-2">
            Add links to your website, blog, or social media profiles.
          </p>
          
          <div className="space-y-2 max-w-md">
            {urls.map((url) => (
              <Input key={url.id} defaultValue={url.url} className="w-full" />
            ))}
            
            <Button
              variant="outline"
              onClick={addNewUrl}
              className="mt-2 text-sm"
              size="sm"
            >
              Add URL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
