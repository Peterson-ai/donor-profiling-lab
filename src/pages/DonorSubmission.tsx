import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { DonorFormContainer } from "@/components/donor/DonorFormContainer";
import { supabase } from "@/lib/supabase";

const DonorSubmission = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    if (!user) return;
    
    setIsSubmitting(true);
    try {
      // First, get the profile data
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      // Prepare donor data with profile information
      const donorData = {
        ...data,
        email: user.email,
        profile_id: user.id,
        organization: profile?.organization || "",
        full_name: profile?.full_name || "",
      };

      const { error } = await supabase
        .from("donors")
        .insert([donorData]);

      if (error) throw error;

      toast.success("Donor information submitted successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting donor:", error);
      toast.error("Failed to submit donor information");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit Donor Information</h1>
        <p className="text-muted-foreground">
          Please fill out the form below with the donor details.
        </p>
      </div>

      <Card className="p-6">
        <DonorFormContainer onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </Card>
    </div>
  );
};

export default DonorSubmission;