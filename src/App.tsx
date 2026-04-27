import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";

import { PhoneFrame } from "@/components/PhoneFrame";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Setup from "./pages/Setup";
import SecurityPin from "./pages/SecurityPin";
import Wallet from "./pages/Wallet";
import AssetDetail from "./pages/AssetDetail";
import Send from "./pages/Send";
import Receive from "./pages/Receive";
import Browser from "./pages/Browser";
import History from "./pages/History";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ThemeBoot = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeBoot />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Standalone (no bottom nav) */}
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/security" element={<SecurityPin />} />

          {/* App shell with bottom nav */}
          <Route element={<PhoneFrame />}>
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/send" element={<Send />} />
            <Route path="/receive" element={<Receive />} />
            <Route path="/browser" element={<Browser />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          <Route path="/index" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
