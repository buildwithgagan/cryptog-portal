
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AppearanceSettingsProps {
  theme: string;
  handleThemeChange: (newTheme: string) => void;
}

const AppearanceSettings = ({ theme, handleThemeChange }: AppearanceSettingsProps) => {
  const { toast } = useToast();

  const handleUpdateAppearance = () => {
    // Save preferences to localStorage
    localStorage.setItem("userTheme", theme);
    
    toast({
      title: "Appearance preferences updated",
      description: "Your appearance settings have been updated successfully.",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Appearance</h2>
      <p className="text-muted-foreground">Customize the appearance of the app. Automatically switch between day and night themes.</p>
      <Separator className="my-6" />
      
      <div className="space-y-8 max-w-2xl">
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
        
        <div>
          <Button onClick={handleUpdateAppearance} className="bg-black hover:bg-black/80 text-white dark:bg-white dark:text-black dark:hover:bg-white/80">
            Update preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppearanceSettings;
