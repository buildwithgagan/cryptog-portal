
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DateTimePicker({ date, setDate, disabled }: DateTimePickerProps) {
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

  // Get just the time portion (HH:MM) from a date
  const getTimeFromDate = (date: Date | undefined): string => {
    if (!date) return "00:00";
    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  // Combine a date with a time string (HH:MM)
  const combineDateAndTime = (date: Date | undefined, time: string): Date => {
    if (!date) {
      date = new Date();
    }
    const [hours, minutes] = time.split(":").map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate;
  };

  return (
    <div className="flex gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              if (newDate) {
                const newDateTime = combineDateAndTime(
                  newDate,
                  getTimeFromDate(date)
                );
                setDate(newDateTime);
              } else {
                setDate(undefined);
              }
            }}
            initialFocus
            className="p-3 pointer-events-auto"
          />
        </PopoverContent>
      </Popover>

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
                onClick={() => {
                  const newDateTime = combineDateAndTime(date, time);
                  setDate(newDateTime);
                }}
              >
                {time}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
