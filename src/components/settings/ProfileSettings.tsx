
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { profileFormSchema, ProfileFormValues } from "@/types/profile.schema";
import ProfilePhotoSection from "./ProfilePhotoSection";
import PersonalInfoForm from "./PersonalInfoForm";

const ProfileSettings = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize with mock data (replace with real data in a production app)
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "John",
      lastName: "Doe",
      phoneNumber: "1234567890",
      email: "john.doe@example.com",
      dateOfBirth: new Date("1990-01-01"),
      profilePhoto: null,
    },
  });

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting profile data:", values);
      // This would be an API call to save profile in a real app
      // await updateProfileAPI(values);
      
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "There was a problem updating your profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-1">Profile</h2>
        <p className="text-muted-foreground">
          Manage your personal information and how it appears on the platform.
        </p>
        <Separator className="my-6" />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Profile Photo Section */}
          <ProfilePhotoSection form={form} formSchema={profileFormSchema} />

          {/* Personal Information Form */}
          <PersonalInfoForm form={form} />
          
          <Button type="submit" className="mt-6" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProfileSettings;
