"use client";

import { X } from 'lucide-react';
import Button from '../ui/Button';
import { useEffect, useState, useCallback } from 'react';

export default function SettingsModal({ isOpen, onClose, onSave, settings }) {

    // *TEMPORARY* using hardcoded settings until the database contains user settings
    const [timerSettings, setTimerSettings] = useState(settings || {
        workDuration: 25,
        breakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4
    });

    const handleInputChange = (field, value) => {

        const parsedValue = parseFloat(value) || 0;

        setTimerSettings({
            ...timerSettings,
            [field]: parsedValue
        });
    };

    const handleSave = useCallback(() => {
        onSave(timerSettings);
        onClose();
    }, [onSave, onClose, timerSettings]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (e.key === 'Enter' && e.target.tagName !== 'INPUT') {
                handleSave();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose, handleSave])

    return (
        <>
            <div className="flex fixed items-center justify-center flex-col z-30 bg-neutral-100 p-6 max-w-md rounded-2xl">
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
                            max="60"
                            min="0"
                            step="0.1"
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
                            max="60"
                            min="0"
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
                            max="60"
                            min="0"
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
                            max="60"
                            min="1"
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