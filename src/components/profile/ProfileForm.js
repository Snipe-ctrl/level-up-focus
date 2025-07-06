"use client";

import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/ProfileContext";
import { calculateXpBarPercentage, getTotalXPForNextLevel } from "@/util/xpCalculations";
import { Tag, Timer, Clock, Zap } from "lucide-react";

export default function ProfileForm() {
    const { user } = useAuth();
    const { profile, loading } = useUserProfile();

    if (!user) {
        return null;
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center bg-neutral-900 w-screen h-screen">
                <div className="text-white">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="flex justify-center bg-neutral-900 w-screen h-screen">
            <div className="flex items-center justify-center flex-col w-240 p-8 rounded-2xl bg-neutral-800  h-fit mt-8">
                <div className="w-30 h-30 rounded-full bg-white border-3 border-black"
                    style={{
                        backgroundImage: "url('/profile-icons/itachi.jpg')",
                        backgroundSize: "100%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}
                ></div>
                <h2 className="text-white text-3xl font-bold mt-4">{profile?.username}</h2>
                <div className="flex items-center justify-center gap-2 mt-2">
                    <div className="flex items-center justify-center px-3 py-1 bg-gradient-to-r from-[#22c55e] to-[#059669] rounded-2xl">
                        <a className="text-white text-sm">Lvl 3</a>
                    </div>
                    <div className="flex items-center justify-center px-3 py-1 border-1 border-white rounded-2xl gap-1.5">
                        <Tag className="text-white h-4 w-4"/>
                        <a className="text-white text-sm">Chopped</a>
                    </div>
                </div>
                <div className="flex items-center justify-between w-150 mt-4">
                    <a className="text-white font-light text-sm">XP Progress</a>
                    <h4 className="text-white text-sm font-light">{profile?.xp} / {getTotalXPForNextLevel(profile?.level)} XP</h4>
                </div>
                <div className="w-150 h-3 mt-2 bg-white/20 rounded-full shadow-inner overflow-hidden border-1 border-white">
                    <div
                        className="h-full transition-all duration-1000 rounded-2xl"
                        style={{
                            width: calculateXpBarPercentage(profile?.xp, profile?.level),
                            background: 'linear-gradient(to right, #22c55e, #059669)',
                            backgroundSize: '360px 100%',
                            backgroundPosition: '0 0'
                        }}
                    ></div>
                </div>
                <a className="text-white text-sm font-light mt-2">{getTotalXPForNextLevel(profile?.level) - profile?.xp} XP until Level {profile?.level}</a>
                <div className="flex justify-between items-center w-full mt-4">
                    <div className="flex items-center justify-center flex-col w-[30%] h-fit mt-8">
                        {/* change to pomodoro icon */}
                        <div className="relative flex align-items justify-center">
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-pink-500 z-0"
                            />
                            <Timer className="z-10 text-white"/>
                        </div>
                        <a className="text-white text-3xl mt-5 font-bold">{profile?.pomos}</a>
                        <a className="text-white text-lg font-medium">Total Pomos</a>
                    </div>
                    <div className="flex items-center justify-center flex-col w-[30%] h-fit mt-8">
                        <div className="relative flex align-items justify-center">
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-blue-500 z-0"
                            />
                            <Clock className="z-10 text-white"/>
                        </div>
                        <a className="text-white text-3xl mt-5 font-bold">10.5</a>
                        <a className="text-white text-lg font-medium">Focus Hours</a>
                    </div>
                    <div className="flex items-center flex-col w-[30%] h-fit mt-8">
                        <div className="relative flex align-items justify-center">
                            <div
                                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-green-500 z-0"
                            />
                            <Zap className="z-10 text-white"/>
                        </div>
                        <a className="text-white text-3xl mt-5 font-bold">{profile?.xp}</a>
                        <a className="text-white text-lg font-medium">Weekly XP</a>
                    </div>
                </div>
            </div>
        </div>
    );
}