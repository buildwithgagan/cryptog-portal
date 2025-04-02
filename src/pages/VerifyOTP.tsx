
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Get admin email from localStorage
  const adminEmail = localStorage.getItem("admin_email");

  useEffect(() => {
    // Redirect to login if no email is stored
    if (!adminEmail) {
      navigate("/login");
      return;
    }

    // Countdown timer for resend OTP button
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [adminEmail, navigate]);

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter a 6-digit OTP code.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock OTP verification - in real app this would connect to a backend
      if (otp === "123456") { // Demo purpose only - real app would validate against server
        // Clear admin email from localStorage
        localStorage.removeItem("admin_email");
        
        // Set authentication token (in a real app, this would be a JWT)
        localStorage.setItem("admin_token", "dummy-auth-token");
        
        toast({
          title: "Authentication Successful",
          description: "Welcome to the Cryptog Admin Panel!",
        });
        
        // Navigate to dashboard
        navigate("/");
      } else {
        toast({
          title: "Invalid OTP",
          description: "The OTP you entered is incorrect. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setTimeLeft(30);
    
    // Start countdown again
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Mock resend OTP
    toast({
      title: "OTP Resent",
      description: "A new 6-digit code has been sent to your email.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Two-Factor Authentication
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Enter the 6-digit OTP sent to {adminEmail || "your email"}
          </p>
        </div>

        <div className="mt-8 rounded-lg border bg-card p-8 shadow-sm">
          <div className="space-y-6">
            <div className="space-y-2">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
                disabled={isLoading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
              
              <p className="text-xs text-muted-foreground text-center mt-2">
                OTP must be exactly 6 digits
              </p>
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                onClick={handleVerifyOTP}
                className="w-full"
                disabled={otp.length !== 6 || isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP & Login"
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={!canResend || isLoading}
                className="w-full"
                type="button"
              >
                {canResend ? "Resend OTP" : `Resend OTP (${timeLeft}s)`}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
