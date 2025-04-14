
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ContestFormValues } from "../schema/contestFormSchema";

interface FeeFieldsProps {
  form: UseFormReturn<ContestFormValues>;
}

export function FeeFields({ form }: FeeFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="joiningFee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Joining Fee (CTOG)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min={1}
                placeholder="Enter joining fee"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Must be greater than 0
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="winningPrize"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Winning Prize (CTOG)</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                min={1}
                placeholder="Enter winning prize"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormDescription>
              Must be greater than joining fee
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
