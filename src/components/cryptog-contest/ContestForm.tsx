
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Team } from "./types";
import { contestFormSchema, ContestFormValues } from "./schema/contestFormSchema";
import { TeamSelection } from "./form-fields/TeamSelection";
import { FeeFields } from "./form-fields/FeeFields";
import { DateTimeFields } from "./form-fields/DateTimeFields";
import { FormFooter } from "./form-fields/FormFooter";

// Export the schema for other components to use
export { contestFormSchema } from "./schema/contestFormSchema";

interface ContestFormProps {
  teams: Team[];
  onSubmit: (data: ContestFormValues) => void;
  defaultValues?: ContestFormValues;
  isEditing: boolean;
  onCancel: () => void;
}

const ContestForm = ({ teams, onSubmit, defaultValues, isEditing, onCancel }: ContestFormProps) => {
  const form = useForm<ContestFormValues>({
    resolver: zodResolver(contestFormSchema),
    defaultValues: defaultValues || {
      name: "",
      teamA: "",
      teamB: "",
      joiningFee: 100,
      winningPrize: 200,
      startDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      endDateTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
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

        <TeamSelection form={form} teams={teams} />
        
        <FeeFields form={form} />
        
        <DateTimeFields form={form} />

        <FormFooter 
          isEditing={isEditing} 
          isValid={form.formState.isValid} 
          onCancel={onCancel} 
        />
      </form>
    </Form>
  );
};

export default ContestForm;
