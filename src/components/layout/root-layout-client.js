"use client";

import { useState } from "react";
import { AuthProvider } from "@/context/AuthContext"
import { ProfileProvider } from "@/context/ProfileContext";
import PlayerCard from "./player-card"
import Sidebar from "./sidebar";
import Timer from "../timer/timer";

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
        <Timer />
        {children}
      </ProfileProvider>
    </AuthProvider>
  );
}