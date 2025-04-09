
import { Boxes, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ComingSoonProps {
  title?: string;
  description?: string;
  icon?: LucideIcon;
}

const ComingSoon = ({ 
  title = "Coming Soon", 
  description = "This feature is currently under development.", 
  icon: Icon = Boxes
}: ComingSoonProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <motion.div 
        className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <Icon className="w-10 h-10 text-primary" />
      </motion.div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: "easeOut"
        }}
      >
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground max-w-md">{description}</p>
        
        <motion.div 
          className="mt-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex space-x-2">
            <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }}></div>
            <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></div>
            <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }}></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;
