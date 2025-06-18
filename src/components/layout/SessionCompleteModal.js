"use client";

import { useAuth } from "@/context/AuthContext";
import { useUserProfile } from "@/context/ProfileContext";
import { Trophy, Zap } from "lucide-react";
import Button from "../ui/Button";
import { getTotalXPForNextLevel, calculateXpBarPercentage } from "@/util/xpCalculations";
import { AnimatePresence, motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from "react";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.6 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

export default function SessionCompleteModal({ isOpen, onClose }) {
    const { user } = useAuth();
    const { profile, loading } = useUserProfile();

    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        const animation = animate(25, {
            duration: 1,
            ease: "easeOut",
        });

        return animation.stop;
    }, []);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        className="fixed inset-0 bg-black/80 z-20"
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={onClose} 
                    />

                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-30 p-4"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={modalVariants}
                    >
                        <div className={
                            `flex items-center justify-center flex-col bg-white/90 p-10 z-30 max-w-md rounded-2xl
                            transition-all duration-300
                            ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                            `}>
                            <div className="relative flex align-items justify-center">
                                <div
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#059669] z-0"
                                />
                                <Trophy className="z-10 text-white"/>
                            </div>
                            <h2 className="pt-6 font-bold text-3xl">Session Complete!</h2>
                            <h3 className="text-slate-500 text-lg pt-2">+1 Pomodoro</h3>
                            <motion.div 
                                className="flex items-center justify-center h-10 px-4 mt-4 gap-2 rounded-4xl bg-gradient-to-r from-[#22c55e] to-[#059669]"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeOut",
                                    delay: 0.2
                                }}
                            >
                                <Zap className="text-white" size={20}/>
                                <motion.h3 
                                    className="text-white font-extrabold text-xl"
                                >
                                    +<motion.span>{rounded}</motion.span> XP
                                </motion.h3>
                            </motion.div>
                            <h4 className="text-sm text-slate-500 font-medium pt-10">Experience Points</h4>
                            {profile && (
                                <div className="w-90 h-3 mt-2 bg-white/20 rounded-full shadow-inner overflow-hidden">
                                    <div
                                        className="h-full transition-all duration-1000 rounded-2xl"
                                        style={{
                                            width: calculateXpBarPercentage(profile.xp, profile.level),
                                            background: 'linear-gradient(to right, #22c55e, #059669)',
                                            backgroundSize: '360px 100%',
                                            backgroundPosition: '0 0'
                                        }}
                                    ></div>
                                </div>
                            )}
                            {profile && (
                            <div className="pt-2 flex items-center justify-between w-full">
                                <h4 className="text-sm font-medium">{profile.xp} / {getTotalXPForNextLevel(profile.level)} XP</h4>
                                <h4 className="text-slate-500 text-sm">Level {profile.level}</h4>
                            </div>
                            )}
                            <Button 
                                className="w-full mt-6" 
                                variant="green" 
                                size="lg"
                                onClick={onClose}
                                >
                                    Continue
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}