import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DonorFormFields } from "@/components/DonorFormFields";

const donorFormSchema = z.object({
  appeal_code: z.string(),
  year: z.number(),
  appeal_name: z.string(),
  structure: z.string(),
  giving_category: z.string(),
  county: z.string(),
  donation_amount: z.number().min(0, "Amount must be positive"),
});

type DonorFormValues = z.infer<typeof donorFormSchema>;

interface DonorFormContainerProps {
  onSubmit: (data: DonorFormValues) => void;
  isSubmitting: boolean;
}

export const DonorFormContainer = ({ onSubmit, isSubmitting }: DonorFormContainerProps) => {
  const form = useForm<DonorFormValues>({
    resolver: zodResolver(donorFormSchema),
    defaultValues: {
      year: new Date().getFullYear(),
      appeal_code: "",
      appeal_name: "",
      structure: "",
      giving_category: "",
      county: "",
      donation_amount: 0,
    },
  });

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <DonorFormFields control={form.control} />
          
          <div className="flex justify-end space-x-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Donation"}
            </Button>
          </div>
        </form>
      </Form>
    </FormProvider>
  );
};