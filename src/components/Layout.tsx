import { useAuth } from "@/contexts/AuthContext";
import { navigationItems } from "@/config/navigation";
import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.email?.split('@')[0] || "Guest";

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex">
      {/* Navigation Sidebar */}
      <nav className="w-64 bg-[#0D1425] border-r border-gray-800 p-4 fixed h-full flex flex-col">
        {/* Logo and Portal Name */}
        <div className="flex items-center space-x-2 mb-8">
          <img 
            src="/lovable-uploads/993b3e2e-960a-44e8-9e47-aa3a278f9908.png" 
            alt="BSA Logo" 
            className="h-12 w-12"
          />
          <span className="font-semibold text-lg">Donor Portal</span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-[#1A2235] transition-colors"
              >
                <Icon className="h-5 w-5 text-[#6366F1]" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full mt-auto flex items-center justify-start space-x-3 text-gray-400 hover:text-white hover:bg-[#1A2235]"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </nav>

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#0D1425] border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-semibold">Scout Donor</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300">{displayName}</span>
            <Button 
              variant="secondary"
              onClick={() => navigate("/donate")}
              className="bg-[#6366F1] hover:bg-[#5355E8] text-white"
            >
              Make a Donation
            </Button>
          </div>
        </header>

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};