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
    console.log('AuthProvider: Checking session...');
    
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('AuthProvider: Session check complete', { session });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('AuthProvider: Auth state changed', { event: _event, session });
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('AuthProvider: Signing in...');
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
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
      // Attempt to sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error('AuthProvider: Sign out error', error);
        throw error;
      }
      
      // Only clear the user state after successful sign out
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