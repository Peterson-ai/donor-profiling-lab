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

  // If no profile exists, this is a new user - redirect to profile setup
  if (!profile) {
    console.log('ProtectedRoute: New user detected, redirecting to profile setup');
    return <Navigate to="/profile-setup" />;
  }

  // For existing users with profile, check if profile is incomplete
  const isProfileIncomplete = !profile.first_name || 
                            !profile.last_name || 
                            !profile.city || 
                            !profile.state || 
                            !profile.zip;

  // Only redirect to profile setup if the profile is incomplete and we're not already there
  if (isProfileIncomplete && location.pathname !== '/profile-setup') {
    console.log('ProtectedRoute: Profile incomplete, redirecting to profile setup');
    return <Navigate to="/profile-setup" />;
  }

  console.log('ProtectedRoute: User authenticated and profile complete, rendering children');
  return <>{children}</>;
};