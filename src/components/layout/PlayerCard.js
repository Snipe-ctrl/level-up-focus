"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/ProfileContext";
import { getTotalXPForNextLevel, calculateXpBarPercentage } from "@/util/xpCalculations";
import Sidebar from "./Sidebar";
import Button from "../ui/Button";

export default function PlayerCard({ isSidebarOpen, onSidebarToggle }) {

    const router = useRouter();

    // user states
    const { user } = useAuth();
    const { profile, loading } = useUserProfile();

    return (
        <div className="fixed top-0 left-0 flex justify-end w-full p-4 bg-transparent" onClick={() => router.push('/profile')}>
            {user ? (
                loading ? (
                    null
                ) : profile ? (
                    <div className="flex items-center justify-center flex-col md:flex px-3 py-1 cursor-pointer rounded-lg bg-white/20 backdrop-blur-sm border-1 border-white/30">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <h3 className="text-white font-semibold">{profile.username}</h3>
                            <p className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Lvl {profile.level}</p>
                        </div>
                        <div className="w-48 h-2.5 bg-white/20 rounded-full shadow-inner overflow-hidden border-1 border-white/30">
                            <div
                                className="h-full transition-all duration-1000"
                                style={{
                                    width: calculateXpBarPercentage(profile.xp, profile.level),
                                    background: 'linear-gradient(to right, #8b5cf6,rgb(236, 72, 107))',
                                    backgroundSize: '200px 100%',
                                    backgroundPosition: '0 0'
                                  }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center w-full text-xs text-white/80 py-1">
                            <p className="">{profile.pomos} Pomos</p>
                            <p className="">{profile.xp}/{getTotalXPForNextLevel(profile.level)} XP</p>
                        </div>
                    </div>
                ) : (
                    ''
                )
            ) : (
                <div className="">
                    <Button
                        className="text-purple-700"
                        size="default"
                        onClick={() => router.push('/login')}
                    >Sign In / Sign Up</Button>
                </div>
            )}
        </div>
    )
}