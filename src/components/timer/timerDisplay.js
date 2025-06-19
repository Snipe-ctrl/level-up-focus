"use client";

import { PHASE_LABELS } from "@/constants/timer";

export default function TimerDisplay({ timeLeft, progressBar, currentPhase, completedSessions, formatTime }) {
    return (
        <>
            <div className="flex items-center flex-col">
                <h2 className="text-xl font-semibold text-white">{PHASE_LABELS[currentPhase]}</h2>
                <h3 className="text-sm text-white/70 mt-1">{completedSessions} pomodoros completed</h3>
            </div>
            <div className="text-6xl font-bold text-white my-8">{formatTime(timeLeft)}</div>
            <div className="w-full h-3 bg-white/20 rounded-full shadow-inner overflow-hidden">
                <div 
                    className="w-[40%] h-full bg-white/60 rounded-full transition-all duration-1000"
                    style={{ width: progressBar() }}>
                </div>
            </div>
        </>
    );
}