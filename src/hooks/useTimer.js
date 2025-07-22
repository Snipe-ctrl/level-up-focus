import { useState, useEffect } from 'react';
import { useUserProfile } from "@/context/ProfileContext";
import { checkLevelUp } from "@/util/xpCalculations";
import { XP_REWARDS } from "@/constants/timer";
import { useModal } from '@/context/ModalContext';

export function useTimer(initialSettings) {
    const { profile, updateUserProfile } = useUserProfile();
    const { openSessionComplete } = useModal();

    const [timeLeft, setTimeLeft] = useState(initialSettings.workDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState("work");
    const [completedSessions, setCompletedSessions] = useState(0);
    const [timerSettings, setTimerSettings] = useState(initialSettings);

    const awardXpForSession = async () => {
        if (!profile) return;

        const xpToAward = XP_REWARDS.WORK_SESSION;
        const newTotalXp = profile.xp + xpToAward;

        const { shouldLevelUp, newLevel } = checkLevelUp(newTotalXp, profile.level);

        await updateUserProfile({
            xp: newTotalXp,
            pomos: profile.pomos + 1,
            level: shouldLevelUp ? newLevel : profile.level,
            total_pomodoros: profile.total_pomodoros + 1,
            user_focus_time: profile.user_focus_time + timerSettings.workDuration * 60
        });
    };

    const calculateProgressBar = () => {
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

    // Timer countdown logic
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

    // Phase transition logic
    useEffect(() => {
        if (timeLeft === 0) {
            if (currentPhase === "work") {
                awardXpForSession();
                openSessionComplete();

                const newCompletedSessions = completedSessions + 1;
                setCompletedSessions(newCompletedSessions);

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
    }, [timeLeft, completedSessions, timerSettings, currentPhase]);

    // Reset timer when settings change
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
    }, [timerSettings, currentPhase, isRunning]);

    return {
        timeLeft,
        isRunning,
        currentPhase,
        completedSessions,
        timerSettings,
        setTimerSettings,
        startPause: () => setIsRunning(!isRunning),
        reset: handleReset,
        skip: handleSkip,
        progressBar: calculateProgressBar,
        formatTime: (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    };
}