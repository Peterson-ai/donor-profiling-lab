import { useAuth } from "@/contexts/AuthContext";
import { AccountInfo } from "@/components/AccountInfo";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Your Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <AccountInfo user={user} />
        
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={() => navigate("/donate")}
            >
              Make a Donation
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/donor-submission")}
            >
              Submit Donor Information
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;