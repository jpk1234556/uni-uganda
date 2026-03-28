import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";

const OwnerDashboard = lazy(() => import("./pages/OwnerDashboard"));
const Auth = lazy(() => import("@/pages/Auth"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="flex flex-col min-h-screen dark bg-slate-950">
          <Navbar />
          <main className="flex-grow">
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
                  element={<Navigate to="/owner/dashboard" replace />}
                />
                <Route path="/auth" element={<Auth appType="owner" />} />
                <Route
                  path="/owner/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["hostel_owner"]}>
                      <OwnerDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="*"
                  element={<Navigate to="/owner/dashboard" replace />}
                />
              </Routes>
            </Suspense>
          </main>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
