"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { ModalProvider } from "@/context/ModalContext";
import { LoadingProvider } from "@/context/LoadingContext";
import LoadingPage from "./LoadingPage";

export default function AppProviders({ children }) {
    return (
        <LoadingProvider>
            <AuthProvider>
                <ProfileProvider >
                    <ModalProvider >
                        {children}
                        <LoadingPage />
                    </ModalProvider>
                </ProfileProvider>
            </AuthProvider>
        </LoadingProvider>
    )
}