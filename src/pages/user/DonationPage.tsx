import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    // Donation logic will be implemented later
    toast({
      title: "Thank you for your donation!",
      description: "Your contribution helps support our mission.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Make a Donation</h1>
      
      <div className="max-w-md mx-auto">
        <form onSubmit={handleDonation} className="space-y-6">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-2">
              Donation Amount ($)
            </label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
              min="1"
              step="0.01"
            />
          </div>
          <Button type="submit" className="w-full">
            Donate Now
          </Button>
        </form>
      </div>
    </div>
  );
};

export default DonationPage;