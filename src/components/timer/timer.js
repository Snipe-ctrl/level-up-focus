"use client";

import { useEffect, useState } from "react";
import { Settings, Images } from "lucide-react";
import { useUserProfile } from "@/context/ProfileContext";
import { checkLevelUp } from "@/util/xpCalculations";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";
import SettingsModal from "../layout/SettingsModal";
import ThemeModal from "../layout/ThemeModal";
import Button from "../ui/Button";
import SessionCompleteModal from "../layout/SessionCompleteModal";
import { TIMER_PHASES, XP_REWARDS, DEFAULT_TIMER_SETTINGS } from "@/constants/timer";

export default function Timer() {

    const { profile, unlockedThemes, updateUserProfile } = useUserProfile();

    const [timeLeft, setTimeLeft] = useState(60 * 25);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState("work");
    const [completedSessions, setCompletedSessions] = useState(0);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isThemeSettingsOpen, setIsThemeSettingsOpen] = useState(false);
    const [isSessionCompleteOpen, setIsSessionCompleteOpen] = useState(false);

    const [timerSettings, setTimerSettings] = useState(DEFAULT_TIMER_SETTINGS);

    const xpRewards = {
        workSession: 25,
        fullCycle: 10,
    };

    const awardXpForSession = async () => {
        if (!profile) return;

        const xpToAward = xpRewards.workSession;
        const newTotalXp = profile.xp + xpToAward;

        const { shouldLevelUp, newLevel } = checkLevelUp(newTotalXp, profile.level);

        await updateUserProfile({
            xp: newTotalXp,
            pomos: profile.pomos + 1,
            level: shouldLevelUp ? newLevel : profile.level,
        });
    };

    // handles progress bar completion
    const progressBar = () => {
        let totalDuration;
        if (currentPhase === "work") {
            totalDuration = timerSettings.workDuration * 60;
        } else if (currentPhase === "break") {
            totalDuration = timerSettings.breakDuration * 60;
        } else if (currentPhase === "longBreak") {
            totalDuration = timerSettings.longBreakDuration * 60;
        }

        const percentageComplete = ((totalDuration - timeLeft) / totalDuration) * 100;

        return `${Math.min(Math.max(percentageComplete, 0), 100)}%`;
    }

    // handles time formatting
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // sets next pomodoro phase
    useEffect(() => {
        if (timeLeft === 0) {
            if (currentPhase === "work") {
                awardXpForSession();

                const newCompletedSessions = completedSessions + 1;
                setCompletedSessions(newCompletedSessions)

                if (newCompletedSessions % timerSettings.longBreakInterval === 0) {
                    setCurrentPhase("longBreak");
                    setTimeLeft(timerSettings.longBreakDuration * 60);
                } else {
                    setCurrentPhase("break");
                    setTimeLeft(timerSettings.breakDuration * 60);
                }
            } else if (currentPhase === "break" || currentPhase === "longBreak") {
                setTimeLeft(timerSettings.workDuration * 60);
                setCurrentPhase("work");
            }
        }
    }, [timeLeft, completedSessions, timerSettings]);

    
    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 1) {
                    return prevTime - 1;
                } else {
                    setIsRunning(false);
                    return 0;
                }
            });
        }, 1000);
        
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    useEffect(() => {
        if (!isRunning) {
            if (currentPhase === "work") {
                setTimeLeft(timerSettings.workDuration * 60);
            } else if (currentPhase === "break") {
                setTimeLeft(timerSettings.breakDuration * 60);
            } else if (currentPhase === "longBreak") {
                setTimeLeft(timerSettings.longBreakDuration * 60);
            }
        }
    }, [timerSettings, currentPhase])
    
    const handleStartPause = () => {
        setIsRunning(!isRunning);
      };

    const handleReset = () => {
        if (currentPhase === "work") {
            setTimeLeft(timerSettings.workDuration * 60);
        } else if (currentPhase === "break") {
            setTimeLeft(timerSettings.breakDuration * 60);
        } else if (currentPhase === "longBreak") {
            setTimeLeft(timerSettings.longBreakDuration * 60);
        }
        setIsRunning(false);
    };

    const handleSkip = () => {
        setTimeLeft(0);
        setIsRunning(false);
    };

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
            <Button onClick={() => setIsSessionCompleteOpen(true)}></Button>
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
                        onStartPause={handleStartPause}
                        onReset={handleReset}
                        onSkip={handleSkip}
                        onOpenSettings={() => setIsSettingsOpen(true)}
                        onOpenThemeSettings={() => setIsThemeSettingsOpen(true)}
                    />
                </div>
            </div>
        </div>
    )
}