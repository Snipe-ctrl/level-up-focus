"use client";

import { useState } from "react";
import { useUserProfile } from "@/context/ProfileContext";
import { useTimer } from "@/hooks/useTimer";
import { DEFAULT_TIMER_SETTINGS } from "@/constants/timer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { useModal } from "@/context/ModalContext";

export default function Timer() {
    const { profile } = useUserProfile();
    const { openSettings, openTheme } = useModal();

    const {
        timeLeft,
        isRunning,
        currentPhase,
        completedSessions,
        timerSettings,
        setTimerSettings,
        startPause,
        reset,
        skip,
        progressBar,
        formatTime
    } = useTimer(DEFAULT_TIMER_SETTINGS);

    const handleOpenSettings = () => {
        openSettings({
            settings: timerSettings,
            onSave: setTimerSettings
        });
    };

    return (
        <div className={`flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat ${profile?.theme?.type === 'color' ? profile.theme.value : 'bg-blue-500'}`}
            style={{
                backgroundImage: profile?.theme?.type === 'image'
                    ? `url('${profile.theme.value}')`
                    : 'none',
            }}>
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
                        onOpenSettings={handleOpenSettings}
                        onOpenThemeSettings={openTheme}
                    />
                </div>
            </div>
        </div>
    )
}