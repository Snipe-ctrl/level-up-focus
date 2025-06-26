"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";

export default function AuthLayout({ children }) {
  return (
    <AuthProvider>
      <ProfileProvider>
          {children}
      </ProfileProvider>
    </AuthProvider>
  );
}
