
import { Team } from "../types";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { ContestFormValues } from "../schema/contestFormSchema";

interface TeamSelectionProps {
  form: UseFormReturn<ContestFormValues>;
  teams: Team[];
}

export function TeamSelection({ form, teams }: TeamSelectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <FormField
        control={form.control}
        name="teamA"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team A</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select team A" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem
                    key={`teamA-${team.id}`}
                    value={team.id}
                    disabled={team.id === form.getValues().teamB}
                  >
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="teamB"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Team B</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select team B" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {teams.map((team) => (
                  <SelectItem
                    key={`teamB-${team.id}`}
                    value={team.id}
                    disabled={team.id === form.getValues().teamA}
                  >
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Teams must be different
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
