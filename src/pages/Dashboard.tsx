import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
          <p className="text-muted-foreground">Manage your donations and profile</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate("/profile")}>
            Profile Settings
          </Button>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={() => navigate("/donor-submission")}
            >
              Submit New Donation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;