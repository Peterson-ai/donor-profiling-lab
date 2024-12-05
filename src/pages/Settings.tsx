import { User } from "@/components/ui/user";
import { Bell, Settings as SettingsIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

const Settings = () => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile(user);

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold text-white">Settings</h1>

      {/* Profile Settings Section */}
      <Card className="p-6 bg-[#0D1425] border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <User className="h-5 w-5 text-[#6366F1]" />
          <h2 className="text-lg font-medium text-white">Profile Settings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Full Name</label>
            <Input 
              placeholder="Enter your full name"
              value={profile?.full_name || ''}
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
            <label className="text-sm text-gray-400">Organization</label>
            <Input 
              placeholder="Enter your organization"
              value={profile?.organization || ''}
              className="bg-[#1A2235] border-gray-700 text-white"
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings Section */}
      <Card className="p-6 bg-[#0D1425] border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <Bell className="h-5 w-5 text-[#6366F1]" />
          <h2 className="text-lg font-medium text-white">Notification Settings</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="donation-confirmations" className="border-gray-600" />
            <label htmlFor="donation-confirmations" className="text-gray-300">
              Donation Confirmations
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="platform-updates" className="border-gray-600" />
            <label htmlFor="platform-updates" className="text-gray-300">
              Platform Updates
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="event-notifications" className="border-gray-600" />
            <label htmlFor="event-notifications" className="text-gray-300">
              Event Notifications
            </label>
          </div>
        </div>
      </Card>

      {/* Preferences Section */}
      <Card className="p-6 bg-[#0D1425] border-gray-800">
        <div className="flex items-center gap-2 mb-6">
          <SettingsIcon className="h-5 w-5 text-[#6366F1]" />
          <h2 className="text-lg font-medium text-white">Preferences</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Language</label>
            <Select defaultValue="en">
              <SelectTrigger className="bg-[#1A2235] border-gray-700 text-white">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A2235] border-gray-700">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="dark-mode" className="border-gray-600" defaultChecked />
            <label htmlFor="dark-mode" className="text-gray-300">
              Dark Mode
            </label>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-[#6366F1] hover:bg-[#5558DD]">
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default Settings;