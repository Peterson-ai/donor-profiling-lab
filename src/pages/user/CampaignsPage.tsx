import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import CampaignCard from "@/components/campaigns/CampaignCard";
import { Campaign } from "@/types/campaign";
import { Skeleton } from "@/components/ui/skeleton";

const CampaignsPage = () => {
  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: async () => {
      console.log("Fetching campaigns...");
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) {
        console.error("Error fetching campaigns:", error);
        throw error;
      }
      
      // If no campaigns exist, return sample data for testing
      if (!data || data.length === 0) {
        console.log("No campaigns found, using sample data");
        return [
          {
            id: "1",
            name: "Summer Camp Fund",
            description: "Help send scouts to summer camp",
            goal: 10000,
            raised: 5000,
            start_date: "2024-01-01",
            end_date: "2024-12-31",
            status: "active"
          },
          {
            id: "2",
            name: "Equipment Drive",
            description: "New camping equipment for troops",
            goal: 5000,
            raised: 1000,
            start_date: "2024-02-01",
            end_date: "2024-11-30",
            status: "active"
          },
          {
            id: "3",
            name: "Leadership Training",
            description: "Support leadership development programs",
            goal: 7500,
            raised: 6000,
            start_date: "2024-03-01",
            end_date: "2024-10-31",
            status: "active"
          }
        ] as Campaign[];
      }

      console.log("Fetched campaigns:", data);
      return data as Campaign[];
    },
  });

  if (isLoading) {
    return (
      <div className="container max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#1A2235] p-6 rounded-lg">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3 mb-4" />
              <Skeleton className="h-2 w-full mb-2" />
              <div className="flex justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.error("Error in CampaignsPage:", error);
    return (
      <div className="container max-w-7xl mx-auto p-6">
        <div className="text-red-500">
          Error loading campaigns. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Active Campaigns</h1>
        <p className="text-gray-400">Support our ongoing initiatives and make a difference</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns?.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
};

export default CampaignsPage;