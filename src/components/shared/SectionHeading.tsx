
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
  icon?: LucideIcon;
}

const SectionHeading = ({
  title,
  description,
  className,
  icon: Icon,
}: SectionHeadingProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex items-center gap-2">
        {Icon && <Icon className="text-muted-foreground h-5 w-5" />}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
