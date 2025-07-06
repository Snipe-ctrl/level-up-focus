"use client";

import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/ProfileContext";
import { calculateXpBarPercentage, getTotalXPForNextLevel } from "@/util/xpCalculations";
import { Award, User, LineChart, Trophy } from "lucide-react";

export default function ProfileForm() {
    const { user } = useAuth();
    const { profile, loading } = useUserProfile();

    const formatMemberSince = (timestamp) => {
        if (!timestamp) return '';

        return new Date(timestamp).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };


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
        <>
            <div className="flex items-center flex-col w-full h-full bg-neutral-900">
                <div className="fixed w-full h-50"
                    style={{
                        backgroundImage: `url(${profile?.theme?.value})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                </div>
                <div className="flex flex-col justify-start w-[70%] p-5 bg-neutral-800 z-10 mt-35 rounded-lg border-neutral-500">
                    <div className="flex justify-start mb-9">
                        <div className="w-30 h-30 rounded-lg bg-white border-1 border-white"
                            style={{
                                backgroundImage: "url('/profile-icons/itachi.jpg')",
                                backgroundSize: "100%",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center"
                            }}>
                        </div>
                        <div className="flex justify-start flex-col px-3">
                            <div className="flex justify-start items-center gap-2">
                                <a className="text-gray-200 text-3xl font-bold">{profile?.username}</a>
                                <div className="flex items-center justify-center px-2 bg-emerald-900 rounded-md h-6">
                                    <a className="text-cyan-100 text-sm font-medium">Level {profile?.level}</a>
                                </div>
                            </div>
                            <a className="text-gray-400 text-sm">Account created {formatMemberSince(profile?.created_at)}</a>
                            <div className="flex flex-col justify-start">
                                <div className="mt-2 flex">
                                    <User className="text-gray-400 h-5 w-5"/>
                                    <a className="ml-1 text-md text-gray-400 font-bold">Friends</a>
                                </div>
                                <a className="text-gray-100 font-bold text-2xl left-0">28</a>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <a className="text-white font-light text-sm">{profile?.xp} / {getTotalXPForNextLevel(profile?.level)} XP</a>
                        <h4 className="text-white text-sm font-light">Level {profile?.level + 1}</h4>
                    </div>
                    <div className="w-full h-3 mt-2 bg-white/20 rounded-full shadow-inner overflow-hidden border-white">
                        <div
                            className="h-full transition-all duration-1000 rounded-2xl"
                            style={{
                                width: calculateXpBarPercentage(profile?.xp, profile?.level),
                                background: 'linear-gradient(to right, #22c55e, #059669)',
                                backgroundSize: '100% 100%',
                                backgroundPosition: '0 0'
                            }}
                        ></div>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-1 mt-8 w-[70%]">
                    <LineChart className="text-white"/>
                    <a className="text-white text-2xl font-bold">Stats</a>
                </div>
                <div className="flex justify-between w-[70%] h-full mt-2">
                    <div className="flex flex-col bg-neutral-800 w-[30%] h-fit rounded-lg p-4">
                        <a className="text-2xl text-gray-400 font-bold">Total Pomodoros</a>
                        <a className="text-2xl text-white font-medium">189</a>
                    </div>
                    <div className="flex flex-col bg-neutral-800 w-[30%] h-fit rounded-lg p-4">
                        <a className="text-2xl text-gray-400 font-bold">Total Focus Time</a>
                        <a className="text-2xl text-white font-medium">108H 22M</a>
                    </div>
                    <div className="flex flex-col bg-neutral-800 w-[30%] h-fit rounded-lg p-4">
                        <a className="text-2xl text-gray-400 font-bold">Total XP</a>
                        <a className="text-2xl text-white font-medium">21,890</a>
                    </div>
                </div>
                <div className="flex justify-start items-center gap-1 w-[70%] mt-8">
                    <Award className="text-white"/>
                    <a className="text-white text-2xl font-bold">Achievements</a>
                </div>
                <div className="grid grid-cols-6 gap-2 w-[70%] h-full mt-2 mb-16">
                    <div className="flex flex-col bg-neutral-800 h-fit rounded-lg p-10 gap-4 justify-between items-center">
                        <div className="flex-1 flex items-center justify-center">
                            <Trophy className="text-2xl text-[#ffb31b] font-bold w-20 h-20"></Trophy>
                        </div>
                        <div className="h-12 flex items-center">
                            <a className="text-2xl text-white font-bold text-center">First Crack</a>
                        </div>
                    </div>
                    <div className="flex flex-col bg-neutral-800 h-fit rounded-lg p-10 gap-4 justify-between items-center">
                        <div className="flex-1 flex items-center justify-center">
                            <Trophy className="text-2xl text-[#ffb31b] font-bold w-20 h-20"></Trophy>
                        </div>
                        <div className="h-12 flex items-center">
                            <a className="text-2xl text-white font-bold text-center">Ripe Tomato</a>
                        </div>
                    </div>
                    <div className="flex flex-col bg-neutral-800 h-fit rounded-lg p-10 gap-4 justify-between items-center">
                        <div className="flex-1 flex items-center justify-center">
                            <Trophy className="text-2xl text-[#ffb31b] font-bold w-20 h-20"></Trophy>
                        </div>
                        <div className="h-12 flex items-center">
                            <a className="text-2xl text-white font-bold text-center">Pomodoro Fiend</a>
                        </div>
                    </div>
                    <div className="flex flex-col bg-neutral-800 h-fit rounded-lg p-10 gap-4 justify-between items-center">
                        <div className="flex-1 flex items-center justify-center">
                            <Trophy className="text-2xl text-[#ffb31b] font-bold w-20 h-20"></Trophy>
                        </div>
                        <div className="h-12 flex items-center">
                            <a className="text-2xl text-white font-bold text-center">Focus Fortress</a>
                        </div>
                    </div>
                    <div className="flex flex-col bg-neutral-800 h-fit rounded-lg p-10 gap-4 justify-between items-center">
                        <div className="flex-1 flex items-center justify-center">
                            <Trophy className="text-2xl text-[#ffb31b] font-bold w-20 h-20"></Trophy>
                        </div>
                        <div className="h-12 flex items-center">
                            <a className="text-2xl text-white font-bold text-center">Goated</a>
                        </div>
                    </div>
                    <div className="flex flex-col bg-neutral-800 h-fit rounded-lg p-10 gap-4 justify-between items-center">
                        <div className="flex-1 flex items-center justify-center">
                            <Trophy className="text-2xl text-[#ffb31b] font-bold w-20 h-20"></Trophy>
                        </div>
                        <div className="h-12 flex items-center">
                            <a className="text-center text-2xl text-white font-bold">Zen Master</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}