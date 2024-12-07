import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log("Attempting to sign in with email:", email);
      await signIn(email, password);
      console.log("Sign in successful");
      navigate("/");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      console.error("Login error details:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "Please check your email and password and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative">
      <div className="absolute inset-0 opacity-5 bg-contain bg-center bg-no-repeat" 
           style={{ backgroundImage: "url('/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png')" }}>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg relative z-10">
        <img 
          src="/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png"
          alt="BSA Logo"
          className="w-24 h-24 mx-auto mb-4"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-center">BSA Donor Platform</h1>
          <h2 className="text-xl text-center text-muted-foreground">Login</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
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
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
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
            />
          </div>
          <div className="text-right">
            <Link 
              to="/reset-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <Button
            variant="outline"
            className="mt-2 w-full"
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