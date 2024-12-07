import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { generateAppealCode } from "@/utils/donorUtils";
import { DonationForm } from "@/components/donation/DonationForm";
import { DonationImpact } from "@/components/donation/DonationImpact";
import { useProfile } from "@/hooks/useProfile";

const DonationPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: profile } = useProfile();

  const handleDonation = async (data: {
    amount: number;
    frequency: string;
    paymentMethod: string;
    selectedCounty: string;
  }) => {
    if (!user || !profile) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to make a donation",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const currentYear = new Date().getFullYear();
    const appealCode = generateAppealCode("Annual Appeal", currentYear);
    
    try {
      const { error } = await supabase
        .from('donors')
        .insert([{
          user_id: user.id,
          email: user.email,
          donation_amount: data.amount,
          county: data.selectedCounty,
          structure: "Individual",
          giving_category: "Regular Donor",
          appeal_code: appealCode,
          appeal_name: "Annual Appeal",
          year: currentYear,
          first_name: profile.first_name,
          last_org_name: profile.last_name,
          city: profile.city,
          state: profile.state,
          zip: profile.zip
        }]);

      if (error) throw error;
      
      toast({
        title: "Thank you for your donation!",
        description: `Your ${data.frequency} donation of $${data.amount} will help support our Scouts in ${data.selectedCounty}.`,
      });
      
      navigate("/");
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast({
        title: "Error",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Support Our Scouts</h1>
        <p className="text-gray-400">Your generosity helps create opportunities for young Scouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="p-6 bg-gray-900 border-gray-700">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <div className="p-1 bg-blue-500/10 rounded">
                  <Heart size={16} className="text-blue-400" />
                </div>
                <span className="font-medium">Personalized Donation Suggestions</span>
              </div>
              <p className="text-sm text-gray-300">Based on community needs and impact analysis</p>
            </div>

            <DonationForm onSubmit={handleDonation} isSubmitting={isSubmitting} />
          </Card>
        </div>

        <div className="md:col-span-1">
          <DonationImpact />
        </div>
      </div>
    </div>
  );
};

export default DonationPage;