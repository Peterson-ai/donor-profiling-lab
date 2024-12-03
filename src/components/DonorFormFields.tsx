import { Control } from "react-hook-form";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { generateAppealCode } from "@/utils/donorUtils";
import { AppealSection } from "./donor/fields/AppealSection";
import { DonorTypeSection } from "./donor/fields/DonorTypeSection";
import { DonationSection } from "./donor/fields/DonationSection";

interface DonorFormFieldsProps {
  control: Control<any>;
}

export const DonorFormFields = ({ control }: DonorFormFieldsProps) => {
  const { watch, setValue } = useFormContext();
  const appealName = watch("appeal_name");
  const year = watch("year");

  useEffect(() => {
    if (appealName && year) {
      const generatedCode = generateAppealCode(appealName, year);
      setValue("appeal_code", generatedCode);
    }
  }, [appealName, year, setValue]);

  return (
    <>
      <AppealSection control={control} />
      <DonorTypeSection control={control} />
      <DonationSection control={control} />
    </>
  );
};