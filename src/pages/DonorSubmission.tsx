import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { DonorFormFields } from "@/components/DonorFormFields";
import { generateAppealCode, APPEAL_OPTIONS } from "@/utils/donorUtils";

const donorFormSchema = z.object({
  appeal_code: z.string().min(1, "Appeal code is required"),
  year: z.number().min(2000).max(2100),
  appeal_name: z.string().min(1, "Appeal name is required"),
  structure: z.string().min(1, "Structure is required"),
  giving_category: z.string().min(1, "Giving category is required"),
  last_org_name: z.string().min(1, "Last name or organization name is required"),
  first_name: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().length(2, "Please use 2-letter state code"),
  zip: z.string().min(5, "ZIP code must be at least 5 digits"),
  email: z.string().email("Invalid email address"),
  donation_amount: z.number().min(0, "Donation amount must be positive"),
});

type DonorFormValues = z.infer<typeof donorFormSchema>;

const DonorSubmission = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appealCode, setAppealCode] = useState("");

  const form = useForm<DonorFormValues>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      appeal_code: "",
      year: new Date().getFullYear(),
      appeal_name: APPEAL_OPTIONS[0],
      structure: "",
      giving_category: "",
      last_org_name: "",
      first_name: "",
      city: "",
      state: "",
      zip: "",
      email: user?.email || "",
      donation_amount: 0,
    },
  });

  useEffect(() => {
    const year = form.getValues("year");
    const appealName = form.getValues("appeal_name");
    if (appealName) {
      const code = generateAppealCode(appealName, year);
      setAppealCode(code);
      form.setValue("appeal_code", code);
    }
  }, [form.watch("appeal_name"), form.watch("year")]);

  const onSubmit = async (data: DonorFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("donors").insert([
        {
          ...data,
          user_id: user?.id,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your donation information has been submitted successfully.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to submit donation information. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Submit Donation Information</h1>
        <p className="text-muted-foreground">
          Please fill out the form below with your donation details.
        </p>
      </div>

      <div className="p-6 border rounded-lg bg-card">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DonorFormFields control={form.control} appealCode={appealCode} />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="last_org_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last/Org Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter last name or organization" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="FL" 
                        maxLength={2}
                        {...field} 
                        onChange={e => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ZIP</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ZIP code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="donation_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Amount ($)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      step="0.01" 
                      {...field} 
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Donation"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DonorSubmission;