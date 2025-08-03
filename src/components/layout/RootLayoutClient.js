"use client";

import { useState } from "react";
import AppProviders from "./AppProviders";
import GlobalModalRenderer from "./GlobalModalRenderer";
import Sidebar from "./Sidebar";
import LoadingPage from "./LoadingPage";
import { useLoading } from "@/context/LoadingContext";

export default function RootLayoutClient({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppProviders>
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      {children}
      <GlobalModalRenderer />
    </AppProviders>
  );
}