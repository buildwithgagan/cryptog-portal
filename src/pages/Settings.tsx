
import { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileSettings from "@/components/settings/ProfileSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile"); // Default to profile
  const [theme, setTheme] = useState("light");
  const [urls, setUrls] = useState([
    { id: 1, url: "https://shadcn.com" },
    { id: 2, url: "http://twitter.com/shadcn" },
  ]);

  // Initialize user preferences from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("userTheme");
    
    if (savedTheme) setTheme(savedTheme);

    // Apply theme to document
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

  return (
    <div className="container mx-auto py-6">
      <PageTitle title="Settings" subtitle="Manage your account settings and set e-mail preferences." />
      
      <Separator className="my-6" />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full max-w-md mb-6">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
          <TabsTrigger value="appearance" className="flex-1">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileSettings />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        
        <TabsContent value="appearance">
          <AppearanceSettings 
            theme={theme} 
            handleThemeChange={handleThemeChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
