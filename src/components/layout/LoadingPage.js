"use client";

import LoadingSpinner from "../ui/LoadingSpinner";
import { useLoading } from "@/context/LoadingContext";

export default function LoadingPage() {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-900 z-100">
            <div className="flex flex-col items-center space-y-6">
                <LoadingSpinner size="xl" color="white" />
                <div className="text-center">
                    <h2 className="text-white text-xl font-semibold mb-2">Level Up Focus</h2>
                    <p className="text-white/70 text-sm">Loading your workspace...</p>
                </div>
            </div>
        </div>
    );
} 