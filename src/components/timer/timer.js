"use client";

import { useState } from "react";
import { useUserProfile } from "@/context/ProfileContext";
import { useTimer } from "@/hooks/useTimer";
import { DEFAULT_TIMER_SETTINGS } from "@/constants/timer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import SettingsModal from "../layout/SettingsModal";
import ThemeModal from "../layout/ThemeModal";
import Button from "../ui/Button";
import SessionCompleteModal from "../layout/SessionCompleteModal";

export default function Timer() {
    const { profile } = useUserProfile();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);

    const {
        timeLeft,
        isRunning,
        currentPhase,
        completedSessions,
        timerSettings,
        setTimerSettings,
        isSessionCompleteOpen,
        setIsSessionCompleteOpen,
        startPause,
        reset,
        skip,
        progressBar,
        formatTime
    } = useTimer(DEFAULT_TIMER_SETTINGS);

    return (
        <div className={`flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat ${profile?.theme?.type === 'color' ? profile.theme.value : 'bg-blue-500'}`}
            style={{
                backgroundImage: profile?.theme?.type === 'image'
                    ? `url('${profile.theme.value}')`
                    : 'none',
            }}>
            {isSettingsOpen && (
                <SettingsModal 
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    onSave={(newSettings) => setTimerSettings(newSettings)}
                    settings={timerSettings}
                />
            )}
            {isThemeSettingsOpen && (
                <ThemeModal 
                    isOpen={isThemeSettingsOpen}
                    onClose={() => setIsThemeSettingsOpen(false)}
                />
            )}
            {isSessionCompleteOpen && (
                <SessionCompleteModal 
                    isOpen={isSessionCompleteOpen}
                    onClose={() => setIsSessionCompleteOpen(false)}
                />
            )}
            <div className="w-[90%] max-w-md">
                <div className="w-full backdrop-blur-lg bg-white/20 rounded-2xl 
                shadow-xl p-8 border border-white/30 flex flex-col items-center justify-center">
                    <TimerDisplay
                        timeLeft={timeLeft}
                        progressBar={progressBar}
                        currentPhase={currentPhase}
                        completedSessions={completedSessions}
                        formatTime={formatTime}
                    />
                    <TimerControls
                        isRunning={isRunning}
                        currentPhase={currentPhase}
                        onStartPause={startPause}
                        onReset={reset}
                        onSkip={skip}
                        onOpenSettings={() => setIsSettingsOpen(true)}
                        onOpenThemeSettings={() => setIsThemeSettingsOpen(true)}
                    />
                </div>
            </div>
        </div>
    )
}