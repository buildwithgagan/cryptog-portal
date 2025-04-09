
import { useState, useEffect } from "react";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Check } from "lucide-react";

// Define navigation items for the settings sidebar
const navItems = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "appearance", label: "Appearance" },
  { id: "notifications", label: "Notifications" },
  { id: "display", label: "Display" },
];

// Define theme options
const themeOptions = [
  { id: "default", label: "Default", color: "#000000", bgColor: "#FFFFFF", accentColor: "#F1F1F1" },
  { id: "purple", label: "White + Purple", color: "#9b87f5", bgColor: "#FFFFFF", accentColor: "#E5DEFF" },
  { id: "blue", label: "White + Blue", color: "#0EA5E9", bgColor: "#FFFFFF", accentColor: "#D3E4FD" },
  { id: "dark", label: "Dark Mode", color: "#FFFFFF", bgColor: "#1A1F2C", accentColor: "#222222" },
  { id: "green", label: "White + Green", color: "#22C55E", bgColor: "#FFFFFF", accentColor: "#F2FCE2" },
  { id: "teal", label: "White + Teal", color: "#14B8A6", bgColor: "#FFFFFF", accentColor: "#CCFBF1" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [urls, setUrls] = useState([
    { id: 1, url: "https://shadcn.com" },
    { id: 2, url: "http://twitter.com/shadcn" },
  ]);
  const [selectedTheme, setSelectedTheme] = useState("default");
  const { toast } = useToast();

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("admin-theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const addNewUrl = () => {
    const newId = urls.length > 0 ? Math.max(...urls.map(u => u.id)) + 1 : 1;
    setUrls([...urls, { id: newId, url: "" }]);
  };

  const handleThemeChange = (value: string) => {
    setSelectedTheme(value);
    applyTheme(value);
    
    // Save theme preference to localStorage
    localStorage.setItem("admin-theme", value);
    
    toast({
      title: "Theme updated",
      description: "Your theme preferences have been saved.",
      duration: 3000,
    });
  };

  const applyTheme = (themeId: string) => {
    const theme = themeOptions.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    
    if (themeId === "dark") {
      // Apply dark mode
      document.body.classList.add("dark");
      root.style.setProperty("--background", "224 71% 4%");
      root.style.setProperty("--foreground", "213 31% 91%");
      root.style.setProperty("--primary", "210 40% 98%");
      root.style.setProperty("--primary-foreground", "222.2 47.4% 1.2%");
      root.style.setProperty("--muted", "223 47% 11%");
      root.style.setProperty("--muted-foreground", "215.4 16.3% 56.9%");
      root.style.setProperty("--accent", "216 34% 17%");
      root.style.setProperty("--accent-foreground", "210 40% 98%");
      root.style.setProperty("--border", "216 34% 17%");
      root.style.setProperty("--input", "216 34% 17%");
      root.style.setProperty("--card", "224 71% 4%");
      root.style.setProperty("--card-foreground", "213 31% 91%");
    } else {
      // Remove dark mode if it exists
      document.body.classList.remove("dark");
      
      // Set default light mode values
      root.style.setProperty("--background", "0 0% 100%");
      root.style.setProperty("--foreground", "222.2 47.4% 11.2%");
      
      // Apply theme specific color
      const hsl = hexToHSL(theme.color);
      if (hsl) {
        root.style.setProperty("--primary", `${hsl.h} ${hsl.s}% ${hsl.l}%`);
        root.style.setProperty("--primary-foreground", "0 0% 100%");
      }
      
      // Apply accent color
      const accentHsl = hexToHSL(theme.accentColor);
      if (accentHsl) {
        root.style.setProperty("--accent", `${accentHsl.h} ${accentHsl.s}% ${accentHsl.l}%`);
        root.style.setProperty("--accent-foreground", "222.2 47.4% 11.2%");
      }
    }
  };

  // Helper function to convert hex to HSL
  const hexToHSL = (hex: string) => {
    // Remove the # character if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r = 0, g = 0, b = 0;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    } else {
      return null;
    }
    
    // Convert RGB to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
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
              
              <div className="max-w-3xl">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Choose a color theme to personalize your admin panel experience.
                  </p>
                  
                  <RadioGroup 
                    value={selectedTheme} 
                    onValueChange={handleThemeChange}
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2"
                  >
                    {themeOptions.map((theme) => (
                      <label
                        key={theme.id}
                        className={`relative flex flex-col items-start border rounded-md p-4 cursor-pointer transition-all hover:border-primary ${
                          selectedTheme === theme.id ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div className="flex justify-between items-center w-full">
                          <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} className="sr-only" />
                          <span className="font-medium">{theme.label}</span>
                          
                          {selectedTheme === theme.id && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <div 
                            className="h-6 w-12 rounded-sm" 
                            style={{ backgroundColor: theme.bgColor }}
                          ></div>
                          <div 
                            className="h-6 w-6 rounded-sm" 
                            style={{ backgroundColor: theme.color }}
                          ></div>
                          <div 
                            className="h-6 w-6 rounded-sm" 
                            style={{ backgroundColor: theme.accentColor }}
                          ></div>
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
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
