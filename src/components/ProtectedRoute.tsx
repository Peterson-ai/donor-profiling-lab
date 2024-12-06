import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const { profile } = useProfile(user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const isProfileIncomplete = profile && (!profile.first_name || !profile.last_name || !profile.city || !profile.state || !profile.zip);

  if (isProfileIncomplete && window.location.pathname !== "/settings") {
    return <Navigate to="/settings" />;
  }

  return <>{children}</>;
};