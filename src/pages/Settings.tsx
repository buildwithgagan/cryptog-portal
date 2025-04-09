
import { useState, useEffect } from "react";
import PageTitle from "@/components/shared/PageTitle";
import { Separator } from "@/components/ui/separator";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";

// Define navigation items for the settings sidebar (removed the "account" tab)
const navItems = [
  { id: "profile", label: "Profile" },
  { id: "account", label: "Account" },
  { id: "security", label: "Security" },
  { id: "appearance", label: "Appearance" },
];

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
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings navigation sidebar */}
        <SettingsSidebar 
          navItems={navItems} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
        />
        
        {/* Main content area */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <ProfileSettings />
          )}
          
          {activeTab === "account" && (
            <AccountSettings />
          )}

          {activeTab === "security" && (
            <SecuritySettings />
          )}
          
          {activeTab === "appearance" && (
            <AppearanceSettings 
              theme={theme} 
              handleThemeChange={handleThemeChange} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
