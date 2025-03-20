"use client";

import { X } from 'lucide-react';
import Button from './ui/button';
import { useEffect, useState } from 'react';

export default function SettingsModal({ isOpen, onClose, onSave, settings }) {

    const [timerSettings, setTimerSettings] = useState(settings);

    const handleInputChange = (field, value) => {
        setTimerSettings({
            ...timerSettings,
            [field]: parseInt(value) || 0
        });
    };

    const handleSave = () => {
        onSave(timerSettings);
        onClose();
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose])

    return (
        <>
            <div
                className='fixed inset-0 bg-black/50 backdrop-blur-sm z-20'
                onClick={onClose}
            ></div>
            <div className="flex fixed items-center justify-center flex-col z-30 bg-white/90 p-6 max-w-md rounded-2xl">
                <div className="flex justify-between flex-col">
                    <div className='flex justify-between'>
                        <h2 className='text-lg font-semibold leading-none tracking-tight'>Timer Settings</h2>
                        <button className='flex items-center w-4 h-4 cursor-pointer'>
                            <X
                                onClick={onClose}
                            />
                        </button>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1.5">Customize your Pomodoro timer intervals to match your workflow</p>
                </div>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-sm font-medium leading-none text-right'>Work</label>
                        <input 
                            type="number" 
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                            col-span-2 focus:border-blue-400 outline-0'
                            value={timerSettings.workDuration}
                            onChange={(e) => handleInputChange('workDuration', e.target.value)}
                        />
                        <h4 className='text-sm text-muted-foreground'>minutes</h4>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-sm font-medium leading-none text-right'>Short Break</label>
                        <input 
                            type="number" 
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                            col-span-2 focus:border-blue-400 outline-0'
                            value={timerSettings.breakDuration}
                            onChange={(e) => handleInputChange('breakDuration', e.target.value)}
                        />
                        <h4 className='text-sm text-muted-foreground'>minutes</h4>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-sm font-medium leading-none text-right'>Long Break</label>
                        <input 
                            type="number" 
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                            col-span-2 focus:border-blue-400 outline-0'
                            value={timerSettings.longBreakDuration}
                            onChange={(e) => handleInputChange('longBreakDuration', e.target.value)}
                        />    
                        <h4 className='text-sm text-muted-foreground'>minutes</h4>
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label className='text-sm font-medium leading-none text-right'>Long Break After</label>
                        <input 
                            type="number" 
                            className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                            col-span-2 focus:border-blue-400 outline-0'
                            value={timerSettings.longBreakInterval}
                            onChange={(e) => handleInputChange('longBreakInterval', e.target.value)}
                        />
                        <h4 className='text-sm text-muted-foreground'>pomodoros</h4>
                    </div>
                </div>
                <div className='flex justify-end gap-4 w-full pt-6'>
                    <Button 
                        variant='primary' 
                        size='default' 
                        onClick={onClose}>
                        Cancel</Button>
                    <Button 
                        variant='blue' 
                        size='default'
                        onClick={handleSave}>
                        Save Changes</Button>
                </div>
            </div>
        </>
    )
}