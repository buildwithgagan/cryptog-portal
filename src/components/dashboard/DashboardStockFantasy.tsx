
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart } from "lucide-react";

const DashboardStockFantasy = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 40,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    // Set the target date 40 days from now
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 40);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* Coming Soon Section */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Enhanced Stock Fantasy Coming Soon</CardTitle>
          <AreaChart className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="pt-4">
          <div className="mb-4">
            <p className="text-muted-foreground">
              We're working on exciting new features for our Stock Fantasy platform. 
              Experience advanced trading simulations, real-time market analysis, and 
              improved contest mechanics.
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-background rounded-md p-3 text-center shadow-sm">
              <span className="text-3xl font-bold text-primary">{timeLeft.days}</span>
              <p className="text-xs text-muted-foreground mt-1">Days</p>
            </div>
            <div className="bg-background rounded-md p-3 text-center shadow-sm">
              <span className="text-3xl font-bold text-primary">{timeLeft.hours}</span>
              <p className="text-xs text-muted-foreground mt-1">Hours</p>
            </div>
            <div className="bg-background rounded-md p-3 text-center shadow-sm">
              <span className="text-3xl font-bold text-primary">{timeLeft.minutes}</span>
              <p className="text-xs text-muted-foreground mt-1">Minutes</p>
            </div>
            <div className="bg-background rounded-md p-3 text-center shadow-sm">
              <span className="text-3xl font-bold text-primary">{timeLeft.seconds}</span>
              <p className="text-xs text-muted-foreground mt-1">Seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStockFantasy;
