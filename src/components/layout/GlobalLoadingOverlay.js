"use client";

import { useLoading } from "@/context/LoadingContext";
import LoadingSpinner from "../ui/LoadingSpinner";

export default function GlobalLoadingOverlay() {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-4 p-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <LoadingSpinner size="xl" color="green" />
            </div>
        </div>
    )

}