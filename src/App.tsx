import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { AdminRoute } from "@/components/AdminRoute";
import { Layout } from "@/components/Layout";

// Public Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";

// User Pages
import UserDashboard from "./pages/user/UserDashboard";
import DonationPage from "./pages/user/DonationPage";
import DonorSubmission from "./pages/DonorSubmission";
import Profile from "./pages/Profile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import DonorList from "./pages/donors/DonorList";
import Analytics from "./pages/Analytics";
import DonorAnalytics from "./pages/donors/DonorAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Protected Routes with Layout */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/donate"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DonationPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/donor-submission"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DonorSubmission />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Profile />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/campaigns"
              element={
                <ProtectedRoute>
                  <Layout>
                    <div>Campaigns Page</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/youth-needs"
              element={
                <ProtectedRoute>
                  <Layout>
                    <div>Youth Needs Page</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/events"
              element={
                <ProtectedRoute>
                  <Layout>
                    <div>Events Page</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/merit-badges"
              element={
                <ProtectedRoute>
                  <Layout>
                    <div>Merit Badges Page</div>
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Layout>
                    <div>Settings Page</div>
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Admin Routes with Layout */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/donors"
              element={
                <AdminRoute>
                  <Layout>
                    <DonorList />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/analytics"
              element={
                <AdminRoute>
                  <Layout>
                    <Analytics />
                  </Layout>
                </AdminRoute>
              }
            />
            <Route
              path="/admin/donor-analytics"
              element={
                <AdminRoute>
                  <Layout>
                    <DonorAnalytics />
                  </Layout>
                </AdminRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;