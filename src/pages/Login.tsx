import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signIn(email, password);
      navigate("/");
      toast.success("Welcome back!");
    } catch (error: any) {
      console.error("Login error:", error);
      
      // Handle specific error messages
      const errorMessage = error?.message || "Invalid login credentials";
      toast.error(errorMessage);
      
      // Clear password field on error
      setPassword("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0F1C] relative">
      <div className="absolute inset-0 opacity-5 bg-contain bg-center bg-no-repeat" 
           style={{ backgroundImage: "url('/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png')" }}>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-[#0D1425] rounded-lg shadow-lg relative z-10">
        <img 
          src="/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png"
          alt="BSA Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center text-white">BSA Donor Platform</h1>
          <h2 className="text-xl text-center text-gray-400">Login</h2>
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
              required
              disabled={isLoading}
              placeholder="Enter your email"
              className="bg-[#1A2235] border-gray-700 text-white"
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
              required
              disabled={isLoading}
              placeholder="Enter your password"
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
          <div className="text-right">
            <Link 
              to="/reset-password"
              className="text-sm text-[#6366F1] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button 
            type="submit" 
            className="w-full bg-[#6366F1] hover:bg-[#5558DD] text-white" 
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-400">Don't have an account?</p>
          <Button
            type="button"
            variant="outline"
            className="mt-2 w-full border-gray-700 text-gray-200 hover:bg-[#1A2235]"
            onClick={() => navigate("/register")}
            disabled={isLoading}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;