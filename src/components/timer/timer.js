"use client";

import { useState, useEffect } from "react";
import { useUserProfile } from "@/context/ProfileContext";
import { useTimer } from "@/hooks/useTimer";
import { DEFAULT_TIMER_SETTINGS } from "@/constants/timer";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import { useModal } from "@/context/ModalContext";
import { useLoading } from "@/context/LoadingContext";

export default function Timer() {
    const { profile } = useUserProfile();
    const { openSettings, openTheme } = useModal();
    const { isLoading, finishLoading, startLoading } = useLoading();
    const [imageError, setImageError] = useState(false);
    const [imageTaskId, setImageTaskId] = useState(null);

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

    const getBackgroundImage = () => {
        if (!profile?.theme) {
            return { backgroundClass: 'bg-neutral-900', backgroundImage: 'none' };
        }

        if (profile.theme.type == 'color') {
            return {
                backgroundClass: profile.theme.value,
                backgroundImage: 'none'
            };
        }

        if (profile.theme.type === 'image') {
            return {
                backgroundClass: '',
                backgroundImage: `url('/${profile.theme.value}')`
            };
        }
    }

    useEffect(() => {
        if (profile?.theme?.type == 'image') {

            const img = new Image();
            img.src = `/${profile.theme.value}`;
            img.onload = () => finishLoading('timer');
            img.onerror = () => finishLoading('timer');

            return () => {
                img.onload = null;
                img.onerror = null;
            }
        }
    }, [profile?.theme]);

    const { backgroundClass, backgroundImage } = getBackgroundImage();

    return (
        <div className={`flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat ${backgroundClass}`}
            style={{
                backgroundImage: backgroundImage,
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