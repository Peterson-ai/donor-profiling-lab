import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DollarSign, Heart, Award, Calendar, LogOut, Search } from "lucide-react";
import { navigationItems } from "@/config/navigation";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user);

  if (!user) return null;

  const displayName = profile?.full_name || user?.email?.split('@')[0] || "Guest";

  const upcomingEvents = [
    {
      title: "Summer Camp",
      date: "July 15-22, 2024",
      location: "Camp Emerald Bay"
    },
    {
      title: "Merit Badge Workshop",
      date: "August 5, 2024",
      location: "Scout Center"
    },
    {
      title: "Leadership Training",
      date: "August 20, 2024",
      location: "Virtual Meeting"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white flex">
      {/* Navigation Sidebar */}
      <nav className="w-64 bg-[#0D1425] border-r border-gray-800 p-4 fixed h-full flex flex-col">
        <div className="flex items-center space-x-3 mb-8">
          <img 
            src="/lovable-uploads/d73c5a4d-124a-4e2e-b3e8-4af49f90719d.png"
            alt="BSA Logo" 
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold">Donor Portal</span>
        </div>

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
          className="w-full flex items-center space-x-3 text-gray-400 hover:text-white hover:bg-[#1A2235]"
          onClick={() => signOut()}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </nav>

      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-[#0D1425] border-b border-gray-800">
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                type="search"
                placeholder="Search..."
                className="w-full pl-10 bg-[#1A2235] border-gray-700 text-white placeholder:text-gray-400 focus:ring-[#6366F1]"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7" />
              <AvatarFallback>
                {displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">Welcome, {displayName}</h1>
            <Button 
              variant="secondary"
              onClick={() => navigate("/donate")}
              className="bg-[#6366F1] hover:bg-[#5355E8] text-white"
            >
              Make a Donation
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Stats Cards */}
            <div className="bg-[#1A2235] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Total Donations</h3>
                <DollarSign className="text-[#6366F1] h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">$0</p>
              <p className="text-sm text-gray-400">Your lifetime contributions</p>
            </div>

            <div className="bg-[#1A2235] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Active Campaigns</h3>
                <Heart className="text-[#6366F1] h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-gray-400">Campaigns you can support</p>
            </div>

            <div className="bg-[#1A2235] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Merit Badges</h3>
                <Award className="text-[#6366F1] h-5 w-5" />
              </div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-gray-400">Badges in progress</p>
            </div>

            <div className="bg-[#1A2235] p-6 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Next Event</h3>
                <Calendar className="text-[#6366F1] h-5 w-5" />
              </div>
              <p className="text-xl font-bold">Summer Camp</p>
              <p className="text-sm text-gray-400">July 15-22, 2024</p>
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-[#1A2235] rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="bg-[#1E2943] p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#6366F1]">{event.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Impact Section */}
          <div className="bg-[#1A2235] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
            <p className="text-gray-400 mb-6">Your total contribution of $0.00 has helped:</p>
            
            <div className="space-y-4">
              <div className="bg-[#1E2943] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Scouts Supported</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
              <div className="bg-[#1E2943] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Camping Trips Funded</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
              <div className="bg-[#1E2943] p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span>Merit Badges Enabled</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;