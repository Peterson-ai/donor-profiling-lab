import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DollarSign, Heart, Award, Calendar } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile(user);

  if (!user) return null;

  const displayName = profile?.full_name || user?.email?.split('@')[0] || "Guest";

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-[#0D1425] border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img 
            src="/lovable-uploads/21caf5a2-65cb-46fb-ad61-4c8eb907c114.png" 
            alt="BSA Logo" 
            className="h-8 w-auto"
          />
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
        <h1 className="text-2xl font-bold mb-8">Welcome, {displayName}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Donations */}
          <div className="bg-[#1A2235] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Total Donations</h3>
              <DollarSign className="text-[#6366F1] h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">$0</p>
            <p className="text-sm text-gray-400">Your lifetime contributions</p>
          </div>

          {/* Active Campaigns */}
          <div className="bg-[#1A2235] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Active Campaigns</h3>
              <Heart className="text-[#6366F1] h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-gray-400">Campaigns you can support</p>
          </div>

          {/* Merit Badges */}
          <div className="bg-[#1A2235] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Merit Badges</h3>
              <Award className="text-[#6366F1] h-5 w-5" />
            </div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-gray-400">Badges in progress</p>
          </div>

          {/* Next Event */}
          <div className="bg-[#1A2235] p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400">Next Event</h3>
              <Calendar className="text-[#6366F1] h-5 w-5" />
            </div>
            <p className="text-xl font-bold">Summer Camp</p>
            <p className="text-sm text-gray-400">July 15-22, 2024</p>
          </div>
        </div>

        {/* Recent Donations Section */}
        <div className="bg-[#1A2235] rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
          <p className="text-gray-400">No recent donations to display.</p>
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
  );
};

export default UserDashboard;