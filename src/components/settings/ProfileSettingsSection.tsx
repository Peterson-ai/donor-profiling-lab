import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { ProfileForm } from "@/components/ProfileForm";
import { toast } from "sonner";

export const ProfileSettingsSection = () => {
  const { user } = useAuth();
  const { profile, updateProfile, isLoading } = useProfile(user);

  const handleUpdateProfile = async (data: any) => {
    try {
      await updateProfile(data);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    // Reset form to current profile values
    toast.info("Changes cancelled");
  };

  const isProfileIncomplete = !profile?.first_name || !profile?.last_name || !profile?.city || !profile?.state || !profile?.zip;

  return (
    <Card className="p-6 bg-[#0D1425] border-gray-800">
      <div className="flex items-center gap-2 mb-6">
        <User className="h-5 w-5 text-[#6366F1]" />
        <h2 className="text-lg font-medium text-white">Profile Settings</h2>
      </div>

      {isProfileIncomplete && (
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-500">
            Please complete your profile information to access the dashboard.
          </p>
        </div>
      )}

      {profile && (
        <ProfileForm
          initialData={profile}
          onSubmit={handleUpdateProfile}
          isLoading={isLoading}
          onCancel={handleCancel}
        />
      )}
    </Card>
  );
};