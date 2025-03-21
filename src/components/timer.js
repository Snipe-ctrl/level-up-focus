"use client";

import { useEffect, useState } from "react";
import { Settings } from "lucide-react";
import Button from "./ui/button";
import SettingsModal from "./settings-modal";

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(60 * 25);
    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState("work");
    const [completedSessions, setCompletedSessions] = useState(0);

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    const [timerSettings, setTimerSettings] = useState({
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4,
    });

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

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (timeLeft === 0) {
            if (currentPhase === "work") {
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
        <div className="flex items-center justify-center h-screen bg-blue-500">
            {isSettingsOpen && (
                <SettingsModal 
                    isOpen={isSettingsOpen}
                    onClose={() => setIsSettingsOpen(false)}
                    onSave={(newSettings) => setTimerSettings(newSettings)}
                    settings={timerSettings}
                />
            )}
            <div className="w-[90%] max-w-md">
                <div className="w-full backdrop-blur-lg bg-white/20 rounded-2xl 
                shadow-xl p-8 border border-white/30 flex flex-col items-center justify-center">
                    <div className="flex items-center flex-col">
                        <h2 className="text-xl font-semibold text-white">{currentPhase === "work" ? 'Focus Period' : 'Breaktime'}</h2>
                        <h3 className="text-sm text-white/70 mt-1">{completedSessions} pomodoros completed</h3>
                    </div>
                    <div className="text-6xl font-bold text-white my-8">{formatTime(timeLeft)}</div>
                    <div className="w-full h-3 bg-white/20 rounded-full shadow-inner overflow-hidden">
                        <div 
                            className="w-[40%] h-full bg-white/60 rounded-full transition-all duration-1000"
                            style={{ width: progressBar() }}
                        ></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <Button
                            onClick={handleStartPause}
                        >
                            {!isRunning ? 'Start' : 'Pause'}
                        </Button>
                        <Button 
                            onClick={currentPhase === 'work' ? handleReset : handleSkip}
                        >
                            {currentPhase === 'work' ? 'Reset' : 'Skip'}
                        </Button>
                        <Button 
                            className=""
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsSettingsOpen(true)}
                        >
                            <Settings
                                className="h-5 w-5"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}