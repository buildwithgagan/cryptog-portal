
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

// Define navigation items for the settings sidebar
const navItems = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "notifications", label: "Notifications" },
  { id: "display", label: "Display" },
];

// Language options
const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account"); // Changed default tab to account
  const [name, setName] = useState("John Doe");
  const [date, setDate] = useState<Date>();
  const [language, setLanguage] = useState("en");
  const [urls, setUrls] = useState([
    { id: 1, url: "https://shadcn.com" },
    { id: 2, url: "http://twitter.com/shadcn" },
  ]);
  const { toast } = useToast();

  const addNewUrl = () => {
    const newId = urls.length > 0 ? Math.max(...urls.map(u => u.id)) + 1 : 1;
    setUrls([...urls, { id: newId, url: "" }]);
  };

  const handleUpdateAccount = () => {
    toast({
      title: "Account updated",
      description: "Your account has been updated successfully.",
    });
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
              <p className="text-muted-foreground">Update your account settings. Set your preferred language and timezone.</p>
              <Separator className="my-6" />
              
              <div className="space-y-8 max-w-2xl">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="max-w-md" 
                    placeholder="Your name" 
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    This is the name that will be displayed on your profile and in emails.
                  </p>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Date of birth</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full max-w-md justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your date of birth is used to calculate your age.
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Language</label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    This is the language that will be used in the dashboard.
                  </p>
                </div>

                <div>
                  <Button onClick={handleUpdateAccount} className="bg-black hover:bg-black/80 text-white">
                    Update account
                  </Button>
                </div>
              </div>
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
