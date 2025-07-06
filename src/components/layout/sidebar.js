"use client";

import { Home, Users, ShoppingBag, ChartPie, Settings } from "lucide-react";
import Image from "next/image";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

export default function Sidebar({ isOpen }) {

    const router = useRouter();

    return (
        <>
            <div className="fixed p-1 h-screen z-10" role="navigation" aria-label="Sidebar">
                <div className="flex items-center flex-col h-full text-white rounded-lg bg-white/20 backdrop-blur-sm overflow-hidden">
                    <Image 
                        src="/branding/icon-white-arrow.png"
                        alt="Level Up Focus icon"
                        className="object-cover object-center py-2"
                        width={50}
                        height={50}
                    />
                    <div className="hover:bg-white/30 w-full py-3 px-4 transition-all cursor-pointer" onClick={() => router.push('/timer')}>
                        <Home />
                    </div>
                    <div className="hover:bg-white/30 w-full py-3 px-4 transition-all cursor-pointer">
                        <Users />
                    </div>
                    <div className="hover:bg-white/30 w-full py-3 px-4 transition-all cursor-pointer">
                        <ShoppingBag />
                    </div>
                    <div className="hover:bg-white/30 w-full py-3 px-4 transition-all cursor-pointer">
                        <ChartPie />
                    </div>
                    <div className="hover:bg-white/30 w-full py-3 px-4 transition-all cursor-pointer">
                        <Settings />
                    </div>
                </div>
            </div>
        </>
    )
}