import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Cryptog from "./pages/Cryptog";
import ICO from "./pages/ICO";
import ICOInvestors from "./pages/ICOInvestors";
import ICOToken from "./pages/ICOToken"; // Import the ICOToken component
import StockFantasy from "./pages/StockFantasy";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import ComingSoon from "@/components/shared/ComingSoon";
import CryptogAssets from "./pages/CryptogAssets";
import CryptogTeam from "./pages/CryptogTeam";
import CryptogContest from "./pages/CryptogContest";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Subscribers from "./pages/Subscribers";
import { AreaChart, Users as UsersIcon, Trophy } from "lucide-react";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="cryptog" element={<Cryptog />} />
              <Route path="ico" element={<ICO />} />
              <Route path="stock-fantasy" element={<StockFantasy />} />
              <Route path="users" element={<Users />} />
              <Route path="settings" element={<Settings />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="subscribers" element={<Subscribers />} />
              
              {/* Cryptog subpages */}
              <Route path="cryptog/assets" element={<CryptogAssets />} />
              <Route path="cryptog/team" element={<CryptogTeam />} />
              <Route path="cryptog/contest" element={<CryptogContest />} />
              
              {/* Stock Fantasy subpages - both old and new routes for compatibility */}
              <Route path="stock-fantasy/assets" element={
                <ComingSoon 
                  title="Stock Fantasy Assets" 
                  description="Manage stock assets for the Stock Fantasy platform." 
                  icon={AreaChart}
                />
              } />
              
              <Route path="stock-fantasy/team" element={
                <ComingSoon 
                  title="Stock Fantasy Teams" 
                  description="Manage teams for the Stock Fantasy platform." 
                  icon={UsersIcon}
                />
              } />
              
              <Route path="stock-fantasy/contest" element={
                <ComingSoon 
                  title="Stock Fantasy Contests" 
                  description="Manage contests for the Stock Fantasy platform." 
                  icon={Trophy}
                />
              } />
              
              {/* New paths as requested */}
              <Route path="stock-fantasy/manage-asset" element={
                <ComingSoon 
                  title="Stock Fantasy Assets" 
                  description="This section is under development and will be available soon." 
                  icon={AreaChart}
                />
              } />
              
              <Route path="stock-fantasy/manage-team" element={
                <ComingSoon 
                  title="Stock Fantasy Teams" 
                  description="This section is under development and will be available soon." 
                  icon={UsersIcon}
                />
              } />
              
              <Route path="stock-fantasy/manage-contest" element={
                <ComingSoon 
                  title="Stock Fantasy Contests" 
                  description="This section is under development and will be available soon." 
                  icon={Trophy}
                />
              } />
              
              {/* ICO subpages */}
              <Route path="ico/investors" element={<ICOInvestors />} />
              <Route path="ico/token" element={<ICOToken />} /> {/* Updated to use ICOToken component */}
              
              {/* Other pages */}
              <Route path="subscribers" element={<ComingSoon title="Subscribers" description="Manage your newsletter subscribers." />} />
              <Route path="notifications" element={<ComingSoon title="Notifications" description="Manage platform notifications." />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
