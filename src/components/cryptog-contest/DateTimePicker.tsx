
import * as React from "react";
import { DatePopover } from "./DatePopover";
import { TimePopover } from "./TimePopover";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
}

export function DateTimePicker({ date, setDate, disabled }: DateTimePickerProps) {
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

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      const newDateTime = combineDateAndTime(
        newDate,
        getTimeFromDate(date)
      );
      setDate(newDateTime);
    } else {
      setDate(undefined);
    }
  };

  const handleTimeSelect = (time: string) => {
    const newDateTime = combineDateAndTime(date, time);
    setDate(newDateTime);
  };

  return (
    <div className="flex gap-2 w-full">
      <DatePopover 
        date={date} 
        onDateSelect={handleDateSelect} 
        disabled={disabled} 
      />
      <TimePopover 
        date={date} 
        onTimeSelect={handleTimeSelect} 
        disabled={disabled} 
      />
    </div>
  );
}
