
import * as React from "react";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface TimePopoverProps {
  date: Date | undefined;
  onTimeSelect: (time: string) => void;
  disabled?: boolean;
}

export function TimePopover({ date, onTimeSelect, disabled }: TimePopoverProps) {
  // Generate time slots for the dropdown
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        slots.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return slots;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-32 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
          disabled={disabled || !date}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? format(date, "HH:mm") : <span>Time</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="h-64 overflow-y-auto p-2">
          {generateTimeSlots().map((time) => (
            <Button
              key={time}
              variant="ghost"
              className="w-full justify-start font-normal"
              onClick={() => onTimeSelect(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
