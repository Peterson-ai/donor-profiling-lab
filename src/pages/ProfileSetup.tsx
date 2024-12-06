import { ProfileSettingsSection } from "@/components/settings/ProfileSettingsSection";

const ProfileSetup = () => {
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
      </div>
    </div>
  );
};

export default ProfileSetup;