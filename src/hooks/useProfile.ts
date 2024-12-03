import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export type ProfileData = {
  full_name: string;
  phone?: string;
  organization?: string;
};

export const useProfile = (user: User | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  const fetchProfile = async () => {
    if (!user?.id) return null;

    try {
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (fetchError && fetchError.code === "PGRST116") {
        // Profile doesn't exist, create it
        const { data: newProfile, error: insertError } = await supabase
          .from("profiles")
          .insert([
            {
              id: user.id,
              full_name: "",
              phone: "",
              organization: "",
            },
          ])
          .select()
          .single();

        if (insertError) throw insertError;
        return newProfile;
      } else if (fetchError) {
        throw fetchError;
      }

      return existingProfile;
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile data");
      return null;
    }
  };

  const updateProfile = async (data: ProfileData) => {
    if (!user?.id) return;
    
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          ...data,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      
      toast.success("Profile updated successfully");
      setProfile(data);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchProfile();
      if (data) {
        setProfile(data);
      }
    };

    if (user) {
      loadProfile();
    }
  }, [user]);

  return { profile, isLoading, updateProfile };
};