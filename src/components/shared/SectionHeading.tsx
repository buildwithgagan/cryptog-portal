
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const SectionHeading = ({ title, description, className }: SectionHeadingProps) => {
  return (
    <div className={cn("mb-6", className)}>
      <h2 className="text-xl font-semibold">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default SectionHeading;
