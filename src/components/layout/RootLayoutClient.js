"use client";

import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext"
import { ProfileProvider } from "@/context/ProfileContext";
import Timer from "../timer/Timer";
import PlayerCard from "./PlayerCard"
import Sidebar from "./Sidebar";

export default function RootLayoutClient({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <ProfileProvider>
        <PlayerCard
          isSidebarOpen={isSidebarOpen}
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        <Timer></Timer>
        {children}
      </ProfileProvider>
    </AuthProvider>
  );
}