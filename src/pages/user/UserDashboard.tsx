import { useProfile } from "@/contexts/ProfileContext";

const UserDashboard = () => {
  const { profile } = useProfile();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Welcome back, {profile?.first_name} {profile?.last_name}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Donations</h2>
          <p className="text-gray-600">No recent donations</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Active Appeals</h2>
          <p className="text-gray-600">No active appeals</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Profile Status</h2>
          <p className="text-gray-600">Your profile is complete</p>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;