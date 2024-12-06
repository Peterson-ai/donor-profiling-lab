import { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { toast } from "sonner";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth subscriptions...');
    
    // Initial session check
    const initializeAuth = async () => {
      try {
        // Get the current session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
          throw error;
        }

        console.log('AuthProvider: Initial session check:', { session });
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('AuthProvider: Session initialization error:', error);
        toast.error('There was an error initializing your session');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state changed:', { event, session });
      
      if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        setUser(session?.user ?? null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Signing in...');
    try {
      const { error } = await supabase.auth.signInWithPassword({ 
        email, 
        password,
        options: {
          persistSession: true // Ensure session persistence
        }
      });
      
      if (error) throw error;
      
      console.log('AuthProvider: Sign in successful');
      toast.success('Successfully signed in');
    } catch (error: any) {
      console.error('AuthProvider: Sign in error', error);
      toast.error(error.message || 'Failed to sign in');
      throw error;
    }
  };

  const signOut = async () => {
    if (isSigningOut) {
      console.log('AuthProvider: Already signing out, skipping...');
      return;
    }

    console.log('AuthProvider: Starting sign out process...');
    setIsSigningOut(true);

    try {
      const { error } = await supabase.auth.signOut({
        scope: 'local' // Only sign out from this tab/window
      });
      
      if (error) throw error;
      
      setUser(null);
      console.log('AuthProvider: Sign out successful');
      toast.success('Successfully signed out');
      
      // Force navigation to login page
      window.location.href = '/login';
    } catch (error: any) {
      console.error('AuthProvider: Sign out error', error);
      // If there's an error, we'll still try to clear the local state and redirect
      setUser(null);
      window.location.href = '/login';
      toast.error('There was an issue signing out, but you have been logged out locally');
    } finally {
      setIsSigningOut(false);
    }
  };

  const isAdmin = () => {
    return user?.user_metadata?.role === 'admin';
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};