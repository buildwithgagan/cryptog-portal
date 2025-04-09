
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const passwordSchema = z.object({
  oldPassword: z.string().min(1, "Old password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your new password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => data.oldPassword !== data.newPassword, {
  message: "New password must be different from old password",
  path: ["newPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const SecuritySettings = () => {
  const { toast } = useToast();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  // Load 2FA setting from localStorage on component mount
  useEffect(() => {
    const savedTwoFactor = localStorage.getItem("twoFactorEnabled");
    if (savedTwoFactor) {
      setTwoFactorEnabled(savedTwoFactor === "true");
    }
  }, []);

  // Save 2FA setting to localStorage when changed
  useEffect(() => {
    localStorage.setItem("twoFactorEnabled", twoFactorEnabled.toString());
  }, [twoFactorEnabled]);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handlePasswordSubmit = (values: PasswordFormValues) => {
    // Simulate password validation (in a real app, this would be API call)
    if (values.oldPassword !== "password123") {
      form.setError("oldPassword", { 
        message: "Current password is incorrect" 
      });
      
      toast({
        title: "Error",
        description: "Current password is incorrect. Please try again.",
        variant: "destructive",
      });
      
      return;
    }

    // Success case
    toast({
      title: "Success",
      description: "Your password has been updated successfully.",
    });

    // Reset form
    form.reset({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    
    toast({
      title: !twoFactorEnabled ? "2FA Enabled" : "2FA Disabled",
      description: !twoFactorEnabled 
        ? "Two-factor authentication has been enabled for your account." 
        : "Two-factor authentication has been disabled for your account.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Security Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your password and secure your account with two-factor authentication.
        </p>
      </div>
      
      <Separator />
      
      {/* Change Password Card */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="mr-2">
            <Lock className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePasswordSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showOldPassword ? "text" : "password"}
                          placeholder="Enter your current password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowOldPassword(!showOldPassword)}
                      >
                        {showOldPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter your new password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your new password"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-4">
                Update Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Card */}
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="mr-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-2">
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Enable Two-Factor Authentication (2FA) for added security
              </p>
              {twoFactorEnabled && (
                <p className="text-sm text-muted-foreground">
                  An OTP will be sent to your email every time you log in.
                </p>
              )}
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={handleTwoFactorToggle}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
