
import { Boxes } from "lucide-react";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon = ({ 
  title = "Coming Soon", 
  description = "This feature is currently under development." 
}: ComingSoonProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6 animate-pulse-soft">
        <Boxes className="w-10 h-10 text-primary" />
      </div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md">{description}</p>
    </div>
  );
};

export default ComingSoon;
