"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";

export default function ProtectedRoute({ children }) {
    const { isLoading } = useLoading();
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/signin");
        }
    }, [user, loading, router]);

    if (!user) {
        return null;
    }

    return children;
}