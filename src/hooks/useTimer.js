import { useState, useEffect } from 'react';

export function useTimer(initialSettings) {
    const [timeLeft, setTimeLeft] = useState(initialSettings.workDuration * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState("work");
    const [completedSessions, setCompletedSessions] = useState(0);
    const [timerSettings, setTimerSettings] = useState(initialSettings);

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
        progressBar: calculateProgressBar(),
        formatTime: (seconds) => {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    };
}