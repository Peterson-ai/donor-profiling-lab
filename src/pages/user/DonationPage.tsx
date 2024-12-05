import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Heart, CreditCard, Building2, Wallet } from "lucide-react";

interface DonationOption {
  amount: number;
  label: string;
  description: string;
  type: string;
  matchPercentage: number;
}

const DonationPage = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const { toast } = useToast();
  const navigate = useNavigate();

  const donationOptions: DonationOption[] = [
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
      amount: 237,
      label: "Enhanced Support",
      description: "Sponsors a Scout's camping trip and equipment",
      type: "enhanced",
      matchPercentage: 85,
    },
  ];

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount || Number(customAmount);
    
    toast({
      title: "Thank you for your donation!",
      description: `Your ${frequency} donation of $${amount} will help support our Scouts.`,
    });
    
    navigate("/");
  };

  return (
    <div className="container max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Support Our Scouts</h1>
        <p className="text-gray-500">Your generosity helps create opportunities for young Scouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-3">
          <Card className="p-6 bg-[#0A0F1C] border-gray-800">
            <div className="mb-6">
              <div className="flex items-center gap-2 text-blue-500 mb-2">
                <div className="p-1 bg-blue-500/10 rounded">
                  <Heart size={16} className="text-blue-500" />
                </div>
                <span className="font-medium">Personalized Donation Suggestions</span>
              </div>
              <p className="text-sm text-gray-400">Based on community needs and impact analysis</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {donationOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => setSelectedAmount(option.amount)}
                  className={`p-4 rounded-lg border ${
                    selectedAmount === option.amount
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-800 hover:border-gray-700"
                  } text-left transition-all`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xl font-bold">${option.amount}</span>
                    <span className="text-sm text-emerald-500">{option.matchPercentage}% Match</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-1">{option.description}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Heart size={14} />
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm text-gray-400 mb-2">Custom Amount</label>
              <Input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                placeholder="Enter amount"
                className="bg-[#1A2235] border-gray-800 focus:border-blue-500"
              />
              <p className="text-sm text-gray-500 mt-1">Could provide essential supplies and badges</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Donation Frequency</label>
                <div className="grid grid-cols-3 gap-4">
                  {["one-time", "monthly", "yearly"].map((option) => (
                    <button
                      key={option}
                      onClick={() => setFrequency(option)}
                      className={`p-3 rounded-lg border ${
                        frequency === option
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-800 hover:border-gray-700"
                      } transition-all capitalize`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: "credit-card", label: "Credit Card", icon: CreditCard },
                    { id: "bank-transfer", label: "Bank Transfer", icon: Building2 },
                    { id: "paypal", label: "PayPal", icon: Wallet },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border ${
                        paymentMethod === method.id
                          ? "border-blue-500 bg-blue-500/10"
                          : "border-gray-800 hover:border-gray-700"
                      } transition-all`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <method.icon size={20} />
                        <span className="text-sm">{method.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button
              onClick={handleDonation}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              Donate
            </Button>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="p-6 bg-[#0A0F1C] border-gray-800">
            <h2 className="font-semibold mb-4">Your Impact</h2>
            <div className="space-y-4">
              {[
                { label: "Help provide Scout uniforms", icon: "👕" },
                { label: "Support merit badge activities", icon: "🏅" },
                { label: "Contribute to camping equipment", icon: "⛺" },
              ].map((impact, index) => (
                <div key={index} className="flex items-center gap-3 text-gray-400">
                  <span className="text-xl">{impact.icon}</span>
                  <span className="text-sm">{impact.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;