import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { BarChart, DollarSign, Users } from "lucide-react";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const handleAnalyze = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/981f166c-061c-421c-9ded-5dbab55ad9f3.png"
            alt="BSA Logo"
            className="w-24 h-24 mb-4"
          />
        </div>
        
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome, {user?.email}</h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Total Donors</h3>
            </div>
            <p className="text-3xl font-bold">150</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Total Donations</h3>
            </div>
            <p className="text-3xl font-bold">$45,250</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center space-x-2">
              <BarChart className="h-5 w-5" />
              <h3 className="text-lg font-semibold">Analysis Done</h3>
            </div>
            <p className="text-3xl font-bold">24</p>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Quick Actions</h2>
          <div className="flex gap-4">
            <Button onClick={handleAnalyze}>
              New Analysis
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Recent Activities</h2>
          <Card className="divide-y">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-4">
                <p className="text-sm text-muted-foreground">
                  Donor analysis completed - {new Date().toLocaleDateString()}
                </p>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;