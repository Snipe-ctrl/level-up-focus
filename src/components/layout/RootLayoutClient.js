"use client";

import { useState } from "react";
import AppProviders from "./AppProviders";
import { AuthProvider } from "@/context/AuthContext"
import { ProfileProvider } from "@/context/ProfileContext";
import GlobalModalRenderer from "./GlobalModalRenderer";
import Sidebar from "./Sidebar";
import { ModalProvider } from "@/context/ModalContext";

export default function RootLayoutClient({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AppProviders >
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      {children}
      <GlobalModalRenderer />
    </AppProviders>
  );
}