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

  // Only redirect to settings if profile doesn't exist or is incomplete
  const isProfileIncomplete = !profile?.first_name || !profile?.last_name || !profile?.city || !profile?.state || !profile?.zip;
  if (isProfileIncomplete && location.pathname !== '/settings') {
    console.log('ProtectedRoute: Profile incomplete, redirecting to settings');
    return <Navigate to="/settings" />;
  }

  console.log('ProtectedRoute: User authenticated and profile complete, rendering children');
  return <>{children}</>;
};