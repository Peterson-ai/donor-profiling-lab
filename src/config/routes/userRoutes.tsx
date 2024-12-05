import { ProtectedRoute } from "@/components/ProtectedRoute";
import UserDashboard from "@/pages/user/UserDashboard";
import DonationPage from "@/pages/user/DonationPage";
import DonorSubmission from "@/pages/DonorSubmission";
import Profile from "@/pages/Profile";

export const userRoutes = [
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <UserDashboard />
      </ProtectedRoute>
    )
  },
  {
    path: "/donate",
    element: (
      <ProtectedRoute>
        <DonationPage />
      </ProtectedRoute>
    )
  },
  {
    path: "/donor-submission",
    element: (
      <ProtectedRoute>
        <DonorSubmission />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: "/campaigns",
    element: (
      <ProtectedRoute>
        <div>Campaigns Page</div>
      </ProtectedRoute>
    )
  },
  {
    path: "/youth-needs",
    element: (
      <ProtectedRoute>
        <div>Youth Needs Page</div>
      </ProtectedRoute>
    )
  },
  {
    path: "/events",
    element: (
      <ProtectedRoute>
        <div>Events Page</div>
      </ProtectedRoute>
    )
  },
  {
    path: "/merit-badges",
    element: (
      <ProtectedRoute>
        <div>Merit Badges Page</div>
      </ProtectedRoute>
    )
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <div>Settings Page</div>
      </ProtectedRoute>
    )
  }
];