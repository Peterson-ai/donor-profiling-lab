import { ProfileSettingsSection } from "@/components/settings/ProfileSettingsSection";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile } = useProfile(user);

  const handleGoToDashboard = () => {
    // Only allow navigation if profile is complete
    if (profile?.first_name && 
        profile?.last_name && 
        profile?.city && 
        profile?.state && 
        profile?.zip) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Complete Your Profile</h1>
        <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-500">
            Please complete your profile information to access the dashboard.
          </p>
        </div>
        <ProfileSettingsSection />
        {profile?.first_name && 
         profile?.last_name && 
         profile?.city && 
         profile?.state && 
         profile?.zip && (
          <div className="mt-6 flex justify-end">
            <Button 
              onClick={handleGoToDashboard}
              className="bg-[#6366F1] hover:bg-[#5355E8]"
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSetup;