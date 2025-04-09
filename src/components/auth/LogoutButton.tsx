
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LogoutConfirmation from "./LogoutConfirmation";

const LogoutButton = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogoutClick = () => {
    setShowConfirmation(true);
  };

  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={handleLogoutClick}
        className="text-muted-foreground hover:text-foreground"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>

      <LogoutConfirmation 
        isOpen={showConfirmation} 
        onClose={() => setShowConfirmation(false)} 
      />
    </>
  );
};

export default LogoutButton;
