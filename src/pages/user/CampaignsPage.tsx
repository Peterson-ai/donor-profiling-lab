import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { CreditCard, Building2, Wallet } from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  description: string;
  goal: number;
  raised: number;
  start_date: string;
  end_date: string;
  status: string;
}

const CampaignsPage = () => {
  const [selectedAmounts, setSelectedAmounts] = useState<Record<string, number>>({});
  const [paymentMethods, setPaymentMethods] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      return data as Campaign[];
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: async ({ campaignId, amount }: { campaignId: string; amount: number }) => {
      const { data: campaign } = await supabase
        .from("campaigns")
        .select("raised")
        .eq("id", campaignId)
        .single();

      const { error } = await supabase
        .from("campaigns")
        .update({ raised: (campaign?.raised || 0) + amount })
        .eq("id", campaignId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
    },
  });

  const handleDonate = async (campaignId: string) => {
    const amount = selectedAmounts[campaignId];
    const paymentMethod = paymentMethods[campaignId];

    if (!amount || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid donation amount",
        variant: "destructive",
      });
      return;
    }

    if (!paymentMethod) {
      toast({
        title: "Payment method required",
        description: "Please select a payment method",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateCampaignMutation.mutateAsync({ campaignId, amount });
      toast({
        title: "Thank you for your donation!",
        description: `Your donation of ${formatCurrency(amount)} has been processed.`,
      });
      setSelectedAmounts((prev) => ({ ...prev, [campaignId]: 0 }));
      setPaymentMethods((prev) => ({ ...prev, [campaignId]: "" }));
    } catch (error) {
      toast({
        title: "Error processing donation",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-pulse text-gray-400">Loading campaigns...</div>
      </div>
    );
  }

  const calculateProgress = (raised: number, goal: number) => {
    return ((raised || 0) / goal) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500';
      case 'upcoming':
        return 'bg-amber-500/10 text-amber-500';
      default:
        return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Active Campaigns</h1>
        <p className="text-gray-400">Support our ongoing initiatives and make a difference</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns?.map((campaign) => (
          <Card key={campaign.id} className="bg-[#1A2235] border-gray-800 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">{campaign.name}</h2>
                <Badge 
                  className={`${getStatusColor(campaign.status)} border-0`}
                  variant="outline"
                >
                  {campaign.status}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-gray-400">
                  {format(new Date(campaign.start_date), 'MMM dd, yyyy')} - {format(new Date(campaign.end_date), 'MMM dd, yyyy')}
                </div>

                <div>
                  <div className="mb-2">
                    <div className="text-xs text-gray-400 mb-1">
                      {calculateProgress(campaign.raised, campaign.goal).toFixed(1)}% Complete
                    </div>
                    <Progress 
                      value={calculateProgress(campaign.raised, campaign.goal)} 
                      className="h-2 bg-gray-700"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Goal: {formatCurrency(campaign.goal)}</span>
                    <span className="text-gray-400">Raised: {formatCurrency(campaign.raised)}</span>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-800">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Donation Amount ($)</label>
                    <Input
                      type="number"
                      value={selectedAmounts[campaign.id] || ""}
                      onChange={(e) => setSelectedAmounts(prev => ({
                        ...prev,
                        [campaign.id]: parseFloat(e.target.value) || 0
                      }))}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Enter amount"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Payment Method</label>
                    <Select
                      value={paymentMethods[campaign.id] || ""}
                      onValueChange={(value) => setPaymentMethods(prev => ({
                        ...prev,
                        [campaign.id]: value
                      }))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" />
                            <span>Credit Card</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="bank-transfer">
                          <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4" />
                            <span>Bank Transfer</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="paypal">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-4 w-4" />
                            <span>PayPal</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={() => handleDonate(campaign.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    disabled={updateCampaignMutation.isPending}
                  >
                    {updateCampaignMutation.isPending ? "Processing..." : "Donate Now"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsPage;