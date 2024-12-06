import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const AppLayout = () => {
  const { user } = useAuth();
  const { profile } = useProfile(user);

  const displayName = profile ? `${profile.first_name} ${profile.last_name}` : user?.email || "Guest";

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-xl">Welcome, {displayName}</h1>
      </header>
      <main className="flex-grow">
        <Navigation />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;