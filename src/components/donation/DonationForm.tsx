import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DonationOptions } from "./DonationOptions";
import { PaymentMethods } from "./PaymentMethods";

const COUNTIES = ["Miami-Dade", "Broward", "Monroe"] as const;

interface DonationFormProps {
  onSubmit: (data: {
    amount: number;
    frequency: string;
    paymentMethod: string;
    selectedCounty: string;
  }) => void;
  isSubmitting: boolean;
}

export const DonationForm = ({ onSubmit, isSubmitting }: DonationFormProps) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [selectedCounty, setSelectedCounty] = useState<string>("");

  const donationOptions = [
    {
      amount: 119,
      label: "Basic Support",
      description: "Provides essential supplies for one Scout",
      type: "basic",
      matchPercentage: 90,
    },
    {
      amount: 158,
      label: "Regular Support",
      description: "Funds a Scout's monthly activities and badges",
      type: "regular",
      matchPercentage: 95,
    },
    {
      amount: 386,
      label: "Enhanced Support",
      description: "Sponsors a Scout's camping trip and equipment",
      type: "enhanced",
      matchPercentage: 85,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || Number(customAmount);
    onSubmit({
      amount,
      frequency,
      paymentMethod,
      selectedCounty,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <DonationOptions 
          options={donationOptions}
          selectedAmount={selectedAmount}
          onSelectAmount={setSelectedAmount}
        />
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Select County</label>
          <Select onValueChange={setSelectedCounty} value={selectedCounty}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select a county" />
            </SelectTrigger>
            <SelectContent>
              {COUNTIES.map((county) => (
                <SelectItem key={county} value={county}>
                  {county}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-2">Donation Frequency</label>
          <div className="grid grid-cols-3 gap-4">
            {["one-time", "monthly", "yearly"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFrequency(option)}
                className={`p-3 rounded-lg border ${
                  frequency === option
                    ? "border-blue-500 bg-blue-500/10 text-white"
                    : "border-gray-700 hover:border-gray-600 bg-gray-800 text-gray-300"
                } transition-all capitalize`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <PaymentMethods
          selectedMethod={paymentMethod}
          onSelectMethod={setPaymentMethod}
        />
      </div>

      <Button
        type="submit"
        className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white"
        size="lg"
        disabled={isSubmitting || !selectedCounty || (!selectedAmount && !customAmount)}
      >
        {isSubmitting ? "Processing..." : "Donate"}
      </Button>
    </form>
  );
};