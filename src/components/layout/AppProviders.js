"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { ModalProvider } from "@/context/ModalContext";

export default function AppProviders({ children }) {
    return (
        <AuthProvider>
            <ProfileProvider >
                <ModalProvider >
                    {children}
                </ModalProvider>
            </ProfileProvider>
        </AuthProvider>
    )
}