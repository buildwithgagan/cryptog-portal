
import { Save, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Team, Contest } from "./types";

// Form validation schema
export const contestFormSchema = z.object({
  name: z.string().min(1, "Contest name is required"),
  teamA: z.string().min(1, "First team is required"),
  teamB: z.string().min(1, "Second team is required"),
  joiningFee: z.number().min(1, "Joining fee must be greater than 0 CTOG"),
  winningPrize: z.number().min(1, "Winning prize must be greater than 0 CTOG"),
}).refine((data) => data.teamA !== data.teamB, {
  message: "Team A and Team B must be different",
  path: ["teamB"],
}).refine((data) => data.winningPrize > data.joiningFee, {
  message: "Winning prize must be greater than joining fee",
  path: ["winningPrize"],
});

interface ContestFormProps {
  teams: Team[];
  onSubmit: (data: z.infer<typeof contestFormSchema>) => void;
  defaultValues?: z.infer<typeof contestFormSchema>;
  isEditing: boolean;
  onCancel: () => void;
}

const ContestForm = ({ teams, onSubmit, defaultValues, isEditing, onCancel }: ContestFormProps) => {
  const form = useForm<z.infer<typeof contestFormSchema>>({
    resolver: zodResolver(contestFormSchema),
    defaultValues: defaultValues || {
      name: "",
      teamA: "",
      teamB: "",
      joiningFee: 100,
      winningPrize: 200,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contest Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter contest name" {...field} />
              </FormControl>
              <FormDescription>
                Enter a unique name for this contest
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <DialogFooter>
          {isEditing ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
              >
                <Check className="mr-2 h-4 w-4" /> Update Contest
              </Button>
            </>
          ) : (
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={!form.formState.isValid}
              >
                <Save className="mr-2 h-4 w-4" /> Create Contest
              </Button>
            </>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ContestForm;
