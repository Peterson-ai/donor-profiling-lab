import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signIn: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthProvider: Initializing");
    
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        console.log("AuthProvider: Initial session retrieved", { session });
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error getting initial session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", { event: _event, session });
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      console.log("AuthProvider: Cleaning up subscription");
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("Attempting sign in for:", email);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error("Sign in error:", error);
        toast.error(error.message);
        throw error;
      }
      
      console.log("Sign in successful", data);
      toast.success("Successfully signed in!");
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("Failed to sign in. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    console.log("Attempting sign out");
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
        toast.error("Error signing out");
        throw error;
      }
      
      // Clear the local state
      setUser(null);
      setSession(null);
      
      console.log("Sign out successful");
      toast.success("Successfully signed out");
      navigate("/login");
    } catch (error) {
      console.error("Error during sign out:", error);
      // Even if there's an error, we should clear the local state
      setUser(null);
      setSession(null);
      toast.error("Error during sign out");
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};