
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Language options
const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
  { value: "zh", label: "Chinese" },
];

const AccountSettings = () => {
  const [name, setName] = useState("John Doe");
  const [date, setDate] = useState<Date>();
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();

  const handleUpdateAccount = () => {
    toast({
      title: "Account updated",
      description: "Your account has been updated successfully.",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Account</h2>
      <p className="text-muted-foreground">Update your account settings. Set your preferred language and timezone.</p>
      <Separator className="my-6" />
      
      <div className="space-y-8 max-w-2xl">
        <div>
          <label className="text-sm font-medium mb-2 block">Name</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="max-w-md" 
            placeholder="Your name" 
          />
          <p className="text-sm text-muted-foreground mt-2">
            This is the name that will be displayed on your profile and in emails.
          </p>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-2 block">Date of birth</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full max-w-md justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm text-muted-foreground mt-2">
            Your date of birth is used to calculate your age.
          </p>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Language</label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="max-w-md">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languageOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground mt-2">
            This is the language that will be used in the dashboard.
          </p>
        </div>

        <div>
          <Button onClick={handleUpdateAccount} className="bg-black hover:bg-black/80 text-white">
            Update account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
