
import * as z from "zod";

// Form validation schema
export const contestFormSchema = z.object({
  name: z.string().min(1, "Contest name is required"),
  teamA: z.string().min(1, "First team is required"),
  teamB: z.string().min(1, "Second team is required"),
  joiningFee: z.number().min(1, "Joining fee must be greater than 0 CTOG"),
  winningPrize: z.number().min(1, "Winning prize must be greater than 0 CTOG"),
  startDateTime: z.date({
    required_error: "Start date and time is required",
    invalid_type_error: "Start date and time is required",
  }).refine((date) => {
    return date > new Date();
  }, {
    message: "Start date and time must be in the future",
  }),
  endDateTime: z.date({
    required_error: "End date and time is required",
    invalid_type_error: "End date and time is required",
  }),
}).refine((data) => data.teamA !== data.teamB, {
  message: "Team A and Team B must be different",
  path: ["teamB"],
}).refine((data) => data.winningPrize > data.joiningFee, {
  message: "Winning prize must be greater than joining fee",
  path: ["winningPrize"],
}).refine((data) => data.endDateTime > data.startDateTime, {
  message: "End date and time must be after start date and time",
  path: ["endDateTime"],
});

export type ContestFormValues = z.infer<typeof contestFormSchema>;
