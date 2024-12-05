import { AdminRoute } from "@/components/AdminRoute";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import DonorList from "@/pages/donors/DonorList";
import Analytics from "@/pages/Analytics";
import DonorAnalytics from "@/pages/donors/DonorAnalytics";

export const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    )
  },
  {
    path: "/admin/donors",
    element: (
      <AdminRoute>
        <DonorList />
      </AdminRoute>
    )
  },
  {
    path: "/admin/analytics",
    element: (
      <AdminRoute>
        <Analytics />
      </AdminRoute>
    )
  },
  {
    path: "/admin/donor-analytics",
    element: (
      <AdminRoute>
        <DonorAnalytics />
      </AdminRoute>
    )
  }
];