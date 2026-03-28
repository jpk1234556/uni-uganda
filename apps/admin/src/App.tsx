import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminSidebar from "./components/admin/AdminSidebar";
import AdminLayout from "./components/admin/AdminLayout";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

const Overview = lazy(() => import("./components/admin/Overview"));
const UsersManager = lazy(() => import("./components/admin/UsersManager"));
const HostelsManager = lazy(() => import("./components/admin/HostelsManager"));
const BookingsManager = lazy(() => import("./components/admin/BookingsManager"));
const PaymentsManager = lazy(() => import("./components/admin/PaymentsManager"));
const ReviewsManager = lazy(() => import("./components/admin/ReviewsManager"));
const ReportsManager = lazy(() => import("./components/admin/ReportsManager"));
const Settings = lazy(() => import("./components/admin/Settings"));
const Auth = lazy(() => import("@/pages/Auth"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense
          fallback={
            <div className="container mx-auto px-4 py-16 text-center text-slate-500">
              Loading page...
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/admin/dashboard" replace />}
            />
            <Route path="/auth" element={<Auth appType="admin" />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Admin Dashboard with Sidebar Layout */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute allowedRoles={["super_admin"]}>
                  <AdminLayout sidebar={<AdminSidebar />}>
                    <div className="p-4 md:p-8">
                      <Routes>
                        <Route path="dashboard" element={<Overview />} />
                        <Route path="users" element={<UsersManager />} />
                        <Route path="hostels" element={<HostelsManager />} />
                        <Route path="bookings" element={<BookingsManager />} />
                        <Route path="payments" element={<PaymentsManager />} />
                        <Route path="reviews" element={<ReviewsManager />} />
                        <Route path="reports" element={<ReportsManager />} />
                        <Route path="settings" element={<Settings />} />
                        <Route
                          path="*"
                          element={<Navigate to="dashboard" replace />}
                        />
                      </Routes>
                    </div>
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path="*"
              element={<Navigate to="/admin/dashboard" replace />}
            />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
