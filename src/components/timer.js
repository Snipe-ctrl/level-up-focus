"use client";

import { useEffect, useState } from "react";
import Button from "./ui/button";

export default function Timer() {
    const [timeLeft, setTimeLeft] = useState(10);
    const [isRunning, setIsRunning] = useState(false)

    const handlePomodoroStart = () => {
        const intervalId = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleStartPause= () => {
        setIsRunning(!isRunning);
      };

    return (
        <div className="flex items-center justify-center h-screen bg-blue-500">
            <div className="w-[90%] max-w-md">
                <div className="w-full backdrop-blur-lg bg-white/20 rounded-2xl 
                shadow-xl p-8 border border-white/30 flex flex-col items-center justify-center">
                    <div className="flex items-center flex-col">
                        <h2 className="text-xl font-semibold text-white">Pomodoro Timer</h2>
                        <h3 className="text-sm text-white/70 mt-1">0 pomodoros completed</h3>
                    </div>
                    <div className="text-6xl font-bold text-white my-8">{formatTime(timeLeft)}</div>
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-[40%] h-full bg-white/60 rounded-full transition-all duration-1000"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <Button
                            className="bg-white hover:bg-white/90 text-gray-800 border border-white/50"
                            onClick={handleStartPause}
                        >
                            {!isRunning ? 'Start' : 'Pause'}
                        </Button>
                        <Button disabled={true}>Reset</Button>
                        <Button>Settings</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}