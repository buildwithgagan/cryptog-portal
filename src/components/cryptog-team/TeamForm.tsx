
import { Save, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Asset, TEAM_NAME_SUGGESTIONS } from "./types";

// Form validation schema
const teamFormSchema = z.object({
  name: z.string().min(1, "Team name is required"),
  players: z
    .array(z.string())
    .min(10, "You must select exactly 10 players")
    .max(10, "You must select exactly 10 players"),
});

interface TeamFormProps {
  isEditMode: boolean;
  assets: Asset[];
  onSubmit: (data: z.infer<typeof teamFormSchema>) => void;
  defaultValues?: {
    name: string;
    players: string[];
  };
  onCancel: () => void;
}

const TeamForm = ({ 
  isEditMode, 
  assets, 
  onSubmit, 
  defaultValues = { name: "", players: [] },
  onCancel
}: TeamFormProps) => {
  const { toast } = useToast();
  
  // Initialize form
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues,
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
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter team name" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Example names: {TEAM_NAME_SUGGESTIONS[0]}, {TEAM_NAME_SUGGESTIONS[1]}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="players"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Select Players (
                <span
                  className={cn(
                    field.value.length === 10
                      ? "text-green-500"
                      : "text-muted-foreground"
                  )}
                >
                  {field.value.length}/10
                </span>
                )
              </FormLabel>
              <ScrollArea className="h-[300px] border rounded-md p-4">
                <div className="space-y-2">
                  {assets.map((asset) => (
                    <div
                      key={asset.id}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        id={`${isEditMode ? 'edit-' : ''}player-${asset.id}`}
                        checked={field.value.includes(asset.id)}
                        onChange={(e) => {
                          const isChecked = e.target.checked;
                          let newValue = [...field.value];

                          if (isChecked && newValue.length < 10) {
                            newValue.push(asset.id);
                          } else if (isChecked && newValue.length >= 10) {
                            toast({
                              title: "Team is full",
                              description:
                                "A team can have exactly 10 players. Please remove a player before adding a new one.",
                              variant: "destructive",
                            });
                            return;
                          } else {
                            newValue = newValue.filter(
                              (id) => id !== asset.id
                            );
                          }

                          field.onChange(newValue);
                        }}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label
                        htmlFor={`${isEditMode ? 'edit-' : ''}player-${asset.id}`}
                        className="flex items-center cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          {asset.icon}
                          {asset.name}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          {isEditMode ? (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
          ) : (
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          )}
          <Button
            type="submit"
            disabled={
              form.getValues().players.length !== 10 ||
              !form.getValues().name
            }
          >
            {isEditMode ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Update Team
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Team
              </>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default TeamForm;
