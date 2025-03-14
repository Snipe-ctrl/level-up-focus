"use client";

import Button from "./ui/button";

export default function Timer() {

    const handleClick = () => {
        alert("Button clicked!");
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
                    <div className="text-6xl font-bold text-white my-8">25:00</div>
                    <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-[40%] h-full bg-white/60 rounded-full transition-all duration-1000"></div>
                    </div>
                    <div className="flex justify-center gap-4 mt-6">
                        <Button
                            className="bg-white hover:bg-white/90 text-gray-800 border border-white/50"
                            onClick={handleClick}
                        >
                            Start
                        </Button>
                        <Button onClick={handleClick} disabled={true}>Reset</Button>
                        <Button onClick={handleClick}>Settings</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}