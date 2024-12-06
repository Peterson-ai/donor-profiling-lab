import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const ProfileSettingsSection = () => {
  const { user } = useAuth();
  const { profile } = useProfile(user);

  return (
    <Card className="p-6 bg-[#0D1425] border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-[#6366F1]" />
        <h2 className="text-lg font-medium text-white">Profile Settings</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">First Name</label>
          <Input 
            placeholder="Enter your first name"
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Last Name</label>
          <Input 
            placeholder="Enter your last name"
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Organization</label>
          <Input 
            placeholder="Enter your organization"
            value={profile?.organization || ''}
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Email</label>
          <Input 
            type="email"
            value={user?.email || ''}
            readOnly
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Phone Number</label>
          <Input 
            placeholder="Enter your phone number"
            value={profile?.phone || ''}
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">City</label>
          <Input 
            placeholder="Enter your city"
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">State</label>
          <Input 
            placeholder="Enter your state"
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">ZIP Code</label>
          <Input 
            placeholder="Enter your ZIP code"
            className="bg-[#1A2235] border-gray-700 text-white"
          />
        </div>
      </div>
    </Card>
  );
};