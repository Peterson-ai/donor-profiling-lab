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

  // Only redirect to settings if this is a new user (no profile data exists)
  const isNewUser = !profile?.first_name && !profile?.last_name;
  if (isNewUser && location.pathname !== '/settings') {
    console.log('ProtectedRoute: New user detected, redirecting to settings');
    return <Navigate to="/settings" />;
  }

  console.log('ProtectedRoute: User authenticated and profile exists, rendering children');
  return <>{children}</>;
};