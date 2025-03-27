
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Cryptog from "./pages/Cryptog";
import ICO from "./pages/ICO";
import StockFantasy from "./pages/StockFantasy";
import Users from "./pages/Users";
import NotFound from "./pages/NotFound";
import ComingSoon from "./components/shared/ComingSoon";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cryptog" element={<Cryptog />} />
          <Route path="ico" element={<ICO />} />
          <Route path="stock-fantasy" element={<StockFantasy />} />
          <Route path="users" element={<Users />} />
          
          {/* Placeholder routes for sub-pages */}
          <Route path="cryptog/assets" element={<ComingSoon title="Cryptog Assets" description="Manage cryptocurrency assets for the Cryptog platform." />} />
          <Route path="cryptog/team" element={<ComingSoon title="Cryptog Teams" description="Manage teams for the Cryptog platform." />} />
          <Route path="cryptog/contest" element={<ComingSoon title="Cryptog Contests" description="Manage contests for the Cryptog platform." />} />
          
          <Route path="stock-fantasy/assets" element={<ComingSoon title="Stock Fantasy Assets" description="Manage stock assets for the Stock Fantasy platform." />} />
          <Route path="stock-fantasy/team" element={<ComingSoon title="Stock Fantasy Teams" description="Manage teams for the Stock Fantasy platform." />} />
          <Route path="stock-fantasy/contest" element={<ComingSoon title="Stock Fantasy Contests" description="Manage contests for the Stock Fantasy platform." />} />
          
          <Route path="ico/investors" element={<ComingSoon title="ICO Investors" description="Manage and track investors for your ICO." />} />
          <Route path="ico/token" element={<ComingSoon title="Token Management" description="Configure and manage your token settings." />} />
          
          <Route path="subscribers" element={<ComingSoon title="Subscribers" description="Manage your newsletter subscribers." />} />
          <Route path="notifications" element={<ComingSoon title="Notifications" description="Manage platform notifications." />} />
          <Route path="settings" element={<ComingSoon title="Settings" description="Configure platform-level settings." />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
