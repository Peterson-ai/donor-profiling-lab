import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      navigate("/dashboard");
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Invalid email or password.",
      });
    }
  };

  const handleRegister = () => {
    navigate("/register");
    toast({
      title: "Registration",
      description: "Please create your account.",
    });
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
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">Don't have an account?</p>
          <Button
            variant="outline"
            className="mt-2 w-full"
            onClick={handleRegister}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;