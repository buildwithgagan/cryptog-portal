
import { z } from "zod";
import { UserProfile } from "./profile";

export const profileFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().regex(/^\d+$/, "Phone number must contain only digits"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.date().nullable(),
  profilePhoto: z.string().nullable(),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
