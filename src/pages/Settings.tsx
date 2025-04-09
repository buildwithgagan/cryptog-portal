
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

// Define navigation items for the settings sidebar
const navItems = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "appearance", label: "Appearance" },
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

// Font options
const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "opensans", label: "Open Sans" },
  { value: "lato", label: "Lato" },
  { value: "poppins", label: "Poppins" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [name, setName] = useState("John Doe");
  const [date, setDate] = useState<Date>();
  const [language, setLanguage] = useState("en");
  const [font, setFont] = useState("inter");
  const [theme, setTheme] = useState("light");
  const [urls, setUrls] = useState([
    { id: 1, url: "https://shadcn.com" },
    { id: 2, url: "http://twitter.com/shadcn" },
  ]);
  const { toast } = useToast();

  // Initialize user preferences from localStorage on component mount
  useEffect(() => {
    const savedFont = localStorage.getItem("userFont");
    const savedTheme = localStorage.getItem("userTheme");
    
    if (savedFont) setFont(savedFont);
    if (savedTheme) setTheme(savedTheme);

    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Apply font to document
    if (savedFont) {
      document.documentElement.style.fontFamily = getFontFamilyString(savedFont);
    }
  }, []);

  // Get font family string based on selected font
  const getFontFamilyString = (fontName: string) => {
    switch (fontName) {
      case "inter":
        return "'Inter', sans-serif";
      case "roboto":
        return "'Roboto', sans-serif";
      case "opensans":
        return "'Open Sans', sans-serif";
      case "lato":
        return "'Lato', sans-serif";
      case "poppins":
        return "'Poppins', sans-serif";
      default:
        return "'Inter', sans-serif";
    }
  };

  // Handle font change
  const handleFontChange = (newFont: string) => {
    setFont(newFont);
    document.documentElement.style.fontFamily = getFontFamilyString(newFont);
  };

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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

  const handleUpdateAppearance = () => {
    // Save preferences to localStorage
    localStorage.setItem("userFont", font);
    localStorage.setItem("userTheme", theme);
    
    toast({
      title: "Appearance preferences updated",
      description: "Your appearance settings have been updated successfully.",
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
          
          {activeTab === "appearance" && (
            <div>
              <h2 className="text-2xl font-semibold mb-1">Appearance</h2>
              <p className="text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>
              <Separator className="my-6" />
              
              <div className="space-y-8 max-w-2xl">
                <div>
                  <h3 className="text-lg font-medium mb-2">Font</h3>
                  <Select value={font} onValueChange={handleFontChange}>
                    <SelectTrigger className="max-w-md">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span className={`${option.value === 'inter' ? 'font-sans' : 
                                             option.value === 'roboto' ? 'font-["Roboto"]' : 
                                             option.value === 'opensans' ? 'font-["Open_Sans"]' : 
                                             option.value === 'lato' ? 'font-["Lato"]' : 
                                             'font-["Poppins"]'}`}>
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Set the font you want to use in the dashboard.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the theme for the dashboard.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <div 
                      className={`border rounded-md p-4 cursor-pointer ${theme === 'light' ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <div className="bg-white border rounded-md h-28 mb-2 flex flex-col p-3">
                        <div className="w-2/3 h-2 bg-gray-200 rounded mb-2"></div>
                        <div className="w-1/2 h-2 bg-gray-200 rounded mb-3"></div>
                        <div className="flex items-center gap-2 mt-auto">
                          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                          <div className="w-16 h-2 bg-gray-200 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                          <div className="w-20 h-2 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                      <div className="text-center font-medium">Light</div>
                    </div>
                    
                    <div 
                      className={`border rounded-md p-4 cursor-pointer ${theme === 'dark' ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <div className="bg-gray-900 border border-gray-800 rounded-md h-28 mb-2 flex flex-col p-3">
                        <div className="w-2/3 h-2 bg-gray-700 rounded mb-2"></div>
                        <div className="w-1/2 h-2 bg-gray-700 rounded mb-3"></div>
                        <div className="flex items-center gap-2 mt-auto">
                          <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                          <div className="w-16 h-2 bg-gray-700 rounded"></div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-4 h-4 rounded-full bg-gray-600"></div>
                          <div className="w-20 h-2 bg-gray-700 rounded"></div>
                        </div>
                      </div>
                      <div className="text-center font-medium">Dark</div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-medium mb-2">Font Preview</h3>
                  <div className={`border rounded-md p-6 max-w-md ${font === 'inter' ? 'font-sans' : 
                                      font === 'roboto' ? 'font-["Roboto"]' : 
                                      font === 'opensans' ? 'font-["Open_Sans"]' : 
                                      font === 'lato' ? 'font-["Lato"]' : 
                                      'font-["Poppins"]'}`}>
                    <h4 className="text-lg font-bold mb-2">The quick brown fox jumps over the lazy dog</h4>
                    <p className="text-sm">This is a preview of how text will look with your selected font. The quick brown fox jumps over the lazy dog.</p>
                    <p className="text-xs mt-2">ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789</p>
                  </div>
                </div>
                
                <div>
                  <Button onClick={handleUpdateAppearance} className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/80">
                    Update preferences
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
