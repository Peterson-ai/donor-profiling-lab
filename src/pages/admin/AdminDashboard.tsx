import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { DollarSign, Users, Award, CalendarDays } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data: donationStats } = useQuery({
    queryKey: ['donation-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('donors')
        .select('donation_amount, created_at');
      
      if (error) throw error;
      return data;
    },
  });

  const { data: donorCount } = useQuery({
    queryKey: ['donor-count'],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('donors')
        .select('*', { count: 'exact' });
      
      if (error) throw error;
      return count;
    },
  });

  const { data: campaignCount } = useQuery({
    queryKey: ['campaign-count'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('campaigns')
        .select('*');
      
      if (error) throw error;
      return data?.length || 0;
    },
  });

  // Calculate monthly donations for chart
  const monthlyDonations = donationStats?.reduce((acc: any, curr) => {
    const month = new Date(curr.created_at).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + curr.donation_amount;
    return acc;
  }, {});

  const chartData = Object.entries(monthlyDonations || {}).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Calculate total donations
  const totalDonations = donationStats?.reduce((sum, donation) => 
    sum + (donation.donation_amount || 0), 0
  ) || 0;

  // Calculate growth percentages (mock data for now)
  const growthData = {
    donations: '+14.5%',
    donors: '+5.2%',
    campaigns: '+2',
    monthly: '+4%'
  };

  const stats = [
    {
      title: "Total Donations",
      value: `$${totalDonations.toLocaleString()}`,
      growth: growthData.donations,
      icon: DollarSign,
      iconBg: "bg-blue-500"
    },
    {
      title: "Active Donors",
      value: donorCount?.toString() || "0",
      growth: growthData.donors,
      icon: Users,
      iconBg: "bg-blue-500"
    },
    {
      title: "Campaigns",
      value: campaignCount?.toString() || "0",
      growth: growthData.campaigns,
      icon: Award,
      iconBg: "bg-blue-500"
    },
    {
      title: "Monthly Growth",
      value: growthData.monthly,
      icon: CalendarDays,
      iconBg: "bg-blue-500"
    }
  ];

  if (!user) return null;

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="p-6 bg-[#1A2235] border-gray-800">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                {stat.growth && (
                  <p className="text-emerald-500 text-sm">{stat.growth}</p>
                )}
              </div>
              <div className={`${stat.iconBg} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-[#1A2235] border-gray-800">
        <h2 className="text-xl font-semibold mb-6">Monthly Donations</h2>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2A3447" />
              <XAxis 
                dataKey="month" 
                stroke="#8884d8"
                tick={{ fill: '#8884d8' }}
              />
              <YAxis 
                stroke="#8884d8"
                tick={{ fill: '#8884d8' }}
              />
              <Bar 
                dataKey="amount" 
                fill="#3B82F6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;