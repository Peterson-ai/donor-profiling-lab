import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { profile } = useProfile(user);
  const location = useLocation();

  console.log('ProtectedRoute: Checking auth state', { user, loading, profile });

  if (loading) {
    console.log('ProtectedRoute: Still loading...');
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute: No user found, redirecting to login');
    return <Navigate to="/login" />;
  }

  // Only check profile completion for non-settings pages
  if (location.pathname !== '/settings') {
    // Check if this is the first login (no profile data yet)
    if (!profile) {
      console.log('ProtectedRoute: No profile found, redirecting to settings');
      return <Navigate to="/settings" />;
    }

    // For subsequent logins, check if required fields are filled
    const isProfileIncomplete = !profile.first_name || 
                              !profile.last_name || 
                              !profile.city || 
                              !profile.state || 
                              !profile.zip;

    if (isProfileIncomplete) {
      console.log('ProtectedRoute: Profile incomplete, redirecting to settings');
      return <Navigate to="/settings" />;
    }
  }

  console.log('ProtectedRoute: User authenticated and profile exists, rendering children');
  return <>{children}</>;
};