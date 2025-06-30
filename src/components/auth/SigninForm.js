"use client";

import { useRef, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Mail, Lock, User } from "lucide-react";
import { FaApple } from 'react-icons/fa';
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../services/supabase";

export default function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            router.push("/timer");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="fixed w-screen h-screen bg-neutral-900 shadow-xl py-8 flex items-center justify-center">
                <div className="hidden md:flex items-center justify-center w-320 h-full rounded-2xl border border-white/30 ml-16 mr-4 px-8"
                    style = {{ 
                        backgroundImage: "url('/branding/green-swirl-bg.png')",
                        backgroundSize: "auto 105%",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                    }}>
                    <div className="flex flex-col items-center text-center">
                        <Image 
                            src="/branding/icon-white-arrow.png"
                            alt="Level Up Focus icon"
                            className="object-cover object-center p-0"
                            width={200}
                            height={200}
                        />
                        <h2 className="text-white text-4xl font-bold mb-4">Welcome Back</h2>
                        <p className="text-white/80 text-lg">Stay focused. Earn XP. Hit your goals.</p>
                    </div>
                </div>
                <div className="bg-neutral-900 w-full h-full flex items-center justify-center font-bold mx-4 px-6">
                    <div className="flex justify-start flex-col w-100">
                        <h2 className="text-white text-3xl text-center md:text-left mb-2">Sign In</h2>
                        <div className="flex justify-center md:justify-start gap-1 mb-6">
                            <p className="text-neutral-400 font-light text-sm p-0 justify-center md:justify-start">Don't have an account? </p>
                            <Link href="/" className="text-[#49ae2f] font-medium text-sm hover:cursor-pointer hover:text-[#77e35a]">
                                Sign Up
                            </Link>
                        </div>
                        <div className="flex items-center justify-start flex-col gap-3 mb-8 w-full">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Username or Email" 
                                icon={User} 
                            />
                            <Input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" 
                                icon={Lock} 
                                type="password"
                            />
                        </div>
                        <Button 
                            className="w-full mb-6" 
                            variant="green"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-[30%] h-[0.5px] bg-neutral-400"></div>
                            <p className="text-[13px] text-neutral-400 font-light">Or sign in with</p>
                            <div className="w-[30%] h-[1px] bg-neutral-400"></div>
                        </div>
                        <div className="flex alig-items justify-between">
                            <button
                                className="flex items-center justify-center w-[48%] h-12 px-4 py-3 mb-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium text-sm hover:cursor-pointer transition-colors"
                            >
                                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                Google
                            </button>
                            <button
                                className="flex items-center justify-center w-[48%] h-12 px-4 py-3 bg-black border border-gray-800 rounded-lg text-white font-medium text-sm hover:cursor-pointer transition-colors"
                            >
                                <FaApple className="pb-0.5 left-1 mr-2" size={20} color="#FFF" />
                                Apple
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}