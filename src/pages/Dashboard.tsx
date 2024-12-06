import { useProfile } from "@/contexts/ProfileContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle, Users, DollarSign, Calendar } from "lucide-react";

const Dashboard = () => {
  const { profile } = useProfile();
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {profile?.first_name} {profile?.last_name}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-500" />
            <div>
              <h3 className="text-sm font-medium">Total Donors</h3>
              <p className="text-2xl font-bold">2,543</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <DollarSign className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="text-sm font-medium">Total Donations</h3>
              <p className="text-2xl font-bold">$1.2M</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-6 w-6 text-purple-500" />
            <div>
              <h3 className="text-sm font-medium">Active Appeals</h3>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-orange-500" />
            <div>
              <h3 className="text-sm font-medium">New Donors</h3>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button className="w-full justify-start" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Donor
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Appeal
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Record Donation
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New donation received</p>
                <p className="text-sm text-gray-500">John Doe - $1,000</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Appeal created</p>
                <p className="text-sm text-gray-500">Summer Campaign 2024</p>
              </div>
              <span className="text-sm text-gray-500">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New donor registered</p>
                <p className="text-sm text-gray-500">Jane Smith</p>
              </div>
              <span className="text-sm text-gray-500">1 day ago</span>
            </div>
          </div>
          <Link to="/activity" className="text-sm text-blue-500 hover:underline block mt-4">
            View all activity →
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;