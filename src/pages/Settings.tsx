
import { useState } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Define navigation items for the settings sidebar
const navItems = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "display", label: "Display" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [urls, setUrls] = useState([
    { id: 1, url: "https://shadcn.com" },
    { id: 2, url: "http://twitter.com/shadcn" },
  ]);

  const addNewUrl = () => {
    const newId = urls.length > 0 ? Math.max(...urls.map(u => u.id)) + 1 : 1;
    setUrls([...urls, { id: newId, url: "" }]);
  };

  return (
    <div className="container mx-auto py-6">
      <PageTitle title="Settings" subtitle="Manage your account settings and set e-mail preferences." />
      
      <Separator className="my-6" />
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings navigation sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-muted/30 rounded-lg">
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`px-4 py-3 text-left hover:bg-accent/50 transition-colors ${
                    activeTab === item.id ? "bg-muted font-medium" : ""
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="flex-1">
          {activeTab === "profile" && (
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
          )}
          
          {activeTab === "account" && (
            <div>
              <h2 className="text-2xl font-semibold mb-1">Account</h2>
              <p className="text-muted-foreground">Manage your account preferences.</p>
              <Separator className="my-6" />
              <p className="text-muted-foreground">Account settings will be available soon.</p>
            </div>
          )}
          
          {activeTab === "appearance" && (
            <div>
              <h2 className="text-2xl font-semibold mb-1">Appearance</h2>
              <p className="text-muted-foreground">Customize the appearance of the application.</p>
              <Separator className="my-6" />
              <p className="text-muted-foreground">Appearance settings will be available soon.</p>
            </div>
          )}
          
          {activeTab === "notifications" && (
            <div>
              <h2 className="text-2xl font-semibold mb-1">Notifications</h2>
              <p className="text-muted-foreground">Configure how you receive notifications.</p>
              <Separator className="my-6" />
              <p className="text-muted-foreground">Notification settings will be available soon.</p>
            </div>
          )}
          
          {activeTab === "display" && (
            <div>
              <h2 className="text-2xl font-semibold mb-1">Display</h2>
              <p className="text-muted-foreground">Configure display settings.</p>
              <Separator className="my-6" />
              <p className="text-muted-foreground">Display settings will be available soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
