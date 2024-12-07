import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate password match
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      // Validate password strength
      const passwordError = validatePassword(password);
      if (passwordError) {
        toast.error(passwordError);
        return;
      }

      console.log("Attempting to register with email:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (error) {
        console.error("Registration error:", error);
        if (error.message.includes("network")) {
          toast.error("Network error. Please check your connection and try again.");
        } else {
          toast.error(error.message || "Failed to register");
        }
        return;
      }

      console.log("Registration response:", data);
      
      if (data?.user) {
        toast.success("Registration successful! Please check your email to confirm your account.");
        navigate("/login");
      }
    } catch (error: any) {
      console.error("Unexpected error during registration:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#0D1425] rounded-lg border border-gray-800">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-white">Create BSA Donor Account</h1>
          <p className="text-gray-400">Enter your details to register</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-200">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#1A2235] border-gray-700 text-white"
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-200">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#1A2235] border-gray-700 text-white"
              required
              disabled={isLoading}
              minLength={6}
            />
            <p className="text-xs text-gray-400">Must be at least 6 characters long</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-[#1A2235] border-gray-700 text-white"
              required
              disabled={isLoading}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#6366F1] hover:bg-[#5558DD]"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-400">Already have an account?</p>
            <Button
              type="button"
              variant="outline"
              className="mt-2 w-full border-gray-700 text-gray-200 hover:bg-[#1A2235]"
              onClick={() => navigate("/login")}
              disabled={isLoading}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;