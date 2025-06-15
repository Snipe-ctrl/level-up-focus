import { Settings, Images } from "lucide-react";
import Button from "../ui/button";

export default function TimerControls({
    isRunning,
    currentPhase,
    onStartPause,
    onReset,
    onSkip,
    onOpenSettings,
    onOpenThemeSettings
}) {
    return (
        <div className="flex justify-center gap-4 mt-6">
            <Button
                className="text-gray-800"
                onClick={onStartPause}
            >
                {!isRunning ? 'Start' : 'Pause'}
            </Button>
            <Button 
                className="text-gray-800"
                onClick={currentPhase === 'work' ? onReset : onSkip}
            >
                {currentPhase === 'work' ? 'Reset' : 'Skip'}
            </Button>
            <Button 
                variant="ghost"
                size="icon"
                onClick={() => onOpenSettings(true)}
            >
                <Settings
                    className="h-5 w-5"
                />
            </Button>
            <Button 
                variant="ghost"
                size="icon"
                onClick={() => onOpenThemeSettings(true)}
            >
                <Images
                    className="h-5 w-5"
                />
            </Button>
        </div>
    );
}