
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { DateTimePicker } from "../DateTimePicker";
import { UseFormReturn } from "react-hook-form";
import { ContestFormValues } from "../schema/contestFormSchema";

interface DateTimeFieldsProps {
  form: UseFormReturn<ContestFormValues>;
}

export function DateTimeFields({ form }: DateTimeFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="startDateTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Start Date & Time</FormLabel>
            <FormControl>
              <DateTimePicker
                date={field.value}
                setDate={field.onChange}
              />
            </FormControl>
            <FormDescription>
              The contest will be available starting from this date and time
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="endDateTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>End Date & Time</FormLabel>
            <FormControl>
              <DateTimePicker
                date={field.value}
                setDate={field.onChange}
              />
            </FormControl>
            <FormDescription>
              The contest will close at this date and time
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
