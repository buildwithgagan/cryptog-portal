
import { useState, useEffect } from "react";
import ComingSoon from "@/components/shared/ComingSoon";
import PageTitle from "@/components/shared/PageTitle";
import { AreaChart } from "lucide-react";
import { Card } from "@/components/ui/card";

const StockFantasy = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 40,
    hours: 0,
    minutes: 0,
    seconds: 0
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
    <div className="animate-enter">
      <PageTitle 
        title="Stock Fantasy" 
        subtitle="Stock market fantasy gaming platform is coming soon."
      />
      
      <ComingSoon 
        title="Stock Fantasy Platform Coming Soon" 
        description="We're working on an exciting new fantasy stock trading platform that will allow users to test their market prediction skills and compete for prizes."
        icon={AreaChart}
      />

      <Card className="mt-8 p-6 max-w-md mx-auto">
        <h3 className="text-xl font-medium text-center mb-6">Launch Countdown</h3>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-primary/10 rounded-md">
            <span className="text-3xl font-bold text-primary block">{timeLeft.days}</span>
            <span className="text-sm text-muted-foreground">Days</span>
          </div>
          <div className="p-3 bg-primary/10 rounded-md">
            <span className="text-3xl font-bold text-primary block">{timeLeft.hours}</span>
            <span className="text-sm text-muted-foreground">Hours</span>
          </div>
          <div className="p-3 bg-primary/10 rounded-md">
            <span className="text-3xl font-bold text-primary block">{timeLeft.minutes}</span>
            <span className="text-sm text-muted-foreground">Minutes</span>
          </div>
          <div className="p-3 bg-primary/10 rounded-md">
            <span className="text-3xl font-bold text-primary block">{timeLeft.seconds}</span>
            <span className="text-sm text-muted-foreground">Seconds</span>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Stay tuned for our launch on {new Date(new Date().setDate(new Date().getDate() + 40)).toLocaleDateString()}
        </p>
      </Card>
    </div>
  );
};

export default StockFantasy;
