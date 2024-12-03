import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useQuery } from "@tanstack/react-query";
import { getDonors } from "@/lib/donors";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user);

  const { data: donations, isLoading } = useQuery({
    queryKey: ['donors', user?.id],
    queryFn: getDonors,
    enabled: !!user?.id,
  });

  const displayName = profile?.full_name || user?.email || "Guest";

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {displayName}</h1>
          <p className="text-muted-foreground">Manage your donations and profile</p>
        </div>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate("/profile")}>
            Profile Settings
          </Button>
          <Button variant="outline" onClick={() => signOut()}>
            Sign Out
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Button 
              className="w-full"
              onClick={() => navigate("/donor-submission")}
            >
              Submit New Donation
            </Button>
          </div>
        </div>

        <div className="p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-semibold mb-4">Donation History</h2>
          {isLoading ? (
            <p>Loading donations...</p>
          ) : donations && donations.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Appeal</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {donations.map((donation) => (
                  <TableRow key={donation.id}>
                    <TableCell>
                      {donation.created_at ? 
                        format(new Date(donation.created_at), 'MMM dd, yyyy') : 
                        'N/A'}
                    </TableCell>
                    <TableCell>{donation.appeal_name}</TableCell>
                    <TableCell>${donation.donation_amount.toFixed(2)}</TableCell>
                    <TableCell>{donation.giving_category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground">No donations found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;