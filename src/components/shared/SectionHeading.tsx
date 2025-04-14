
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  icon?: ReactNode;
}

const SectionHeading = ({ title, description, className, icon }: SectionHeadingProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-2">
        {icon && <div className="text-muted-foreground">{icon}</div>}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
