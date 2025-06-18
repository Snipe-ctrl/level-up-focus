"use client";

import { Home, Users, ShoppingBag, ChartPie } from "lucide-react";
import Button from "../ui/Button";

export default function Sidebar({ isOpen }) {

    return (
        <>
            <div className="fixed p-6" role="navigation" aria-label="Sidebar">
                <div className="flex items-center flex-col text-white rounded-lg bg-white/20 backdrop-blur-sm overflow-hidden">
                    <div className="hover:bg-white/30 w-full py-3 px-4 transition-all cursor-pointer">
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
                </div>
            </div>
        </>
    )
}