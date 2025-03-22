"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/hooks/useUserProfile";
import Button from "./ui/button";
import { useEffect } from "react";

export default function Header() {

    const router = useRouter();
    const { user } = useAuth();
    const { profile, loading } = useUserProfile();

    useEffect(() => {
        console.log(profile)
    })

    return (
        <div className="fixed top-0 left-0 w-full flex justify-between z-20 items-center p-4 bg-transparent">
            <button
                className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
            >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
            </button>
            {user ? (
                loading ? (
                    ''
                ) : profile ? (
                    <div className="flex items-center justify-center flex-col md:flex cursor-pointer">
                        <div className="flex items-center justify-center gap-2 mb-1">
                            <h3 className="text-white font-semibold">{profile.username}</h3>
                            <p className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">Lvl {profile.level}</p>
                        </div>
                        <div className="w-48 h-2.5 bg-white/20 rounded-full shadow-inner overflow-hidden border-1 border-white/30">
                            <div
                                className="h-full transition-all duration-1000"
                                style={{
                                    width: '100%',
                                    background: 'linear-gradient(to right, #8b5cf6,rgb(236, 72, 107))',
                                    backgroundSize: '200px 100%',
                                    backgroundPosition: '0 0'
                                  }}
                            ></div>
                        </div>
                        <div className="flex justify-between items-center w-full text-xs text-white/80 py-1">
                            <p className="">{profile.pomos} Pomos</p>
                            <p className="">340/500 XP</p>
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