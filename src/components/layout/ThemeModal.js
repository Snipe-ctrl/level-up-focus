"use client";

import { useEffect, useState } from "react";
import { X, Check, Lock } from 'lucide-react';
import Image from 'next/image';
import { useUserProfile } from "@/context/ProfileContext";

export default function ThemeModal({ onClose, isOpen }) {
    
    const { profile, unlockedThemes, updateUserProfile } = useUserProfile();

    const themeOptions = {
        colors: [
            { name: 'Blue', value: 'bg-blue-500' },
            { name: 'Purple', value: 'bg-purple-500' },
            { name: 'Green', value: 'bg-emerald-500' },
            { name: 'Orange', value: 'bg-orange-500' },
            { name: 'Red', value: 'bg-red-500' },
            { name: 'Gray', value: 'bg-gray-500' },
        ],
        images: [
            {
                name: 'Japanese Garden',
                value: '/background-images/japanese-garden.png'
            },
            {
                name: 'Arctic',
                value: '/background-images/arctic.png',
            },
            {
                name: 'Desert',
                value: '/background-images/desert.png',
            },
            {
                name: 'Serene Beach',
                value: '/background-images/serene-beach.png',
            },
            {
                name: 'Valcano',
                value: '/background-images/volcano.png',
            },
            {
                name: 'Forest Clearing',
                value: '/background-images/forest-clearing.png',
            },
        ]
    }

    const isUnlocked = (value) => {
        if (value.startsWith('bg-')) return true;

        return unlockedThemes?.some(theme => theme.value === value);
    }

    const handleThemeSelect = async (type, value) => {
        if (!isUnlocked(value)) return;
        try {
            await updateUserProfile({
                ...profile,
                theme: { type, value }
            });
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    };

    return (
        <>
            <div
                className='fixed inset-0 bg-black/60 z-20'
            ></div>
            <div className="flex fixed items-center justify-center flex-col z-30 bg-neutral-100 p-6 w-2xl rounded-2xl">
                <div className="flex justify-between flex-col w-full">
                    <div className='flex justify-between'>
                        <h2 className='text-lg font-semibold leading-none tracking-tight'>Theme Settings</h2>
                        <button className='flex items-center w-4 h-4 cursor-pointer'>
                            <X
                                onClick={onClose}
                            />
                        </button>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1.5">Select a theme to customize the appearance of your application.</p>
                </div>
                <div className="grid grid-cols-3 gap-4 overflow-y-scroll max-w-full max-h-[405px] mt-6 px-2 py-2">
                    {themeOptions.colors.map((color, idx) => {
                        const isSelected = profile?.theme?.type === "color" && profile?.theme?.value === color.value;

                        return (
                            <div key={idx} 
                                onClick={() => handleThemeSelect('color', color.value)}
                                className={`relative w-full h-47 aspect-square rounded-lg cursor-pointer hover:scale-105 duration-200 transition-transform ${color.value}` }
                            >
                            {isSelected && (
                                <div className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">
                                    <Check className="w-4 h-4"/>
                                </div>
                            )}
                            </div>
                        );
                    })}
                    {themeOptions.images.map((image, idx) => {
                        const isSelected = profile?.theme?.type === "image" && profile?.theme?.value === image.value;
                        const unlocked = isUnlocked(image.value);
                        
                        return (
                            <div 
                                key={idx}
                                onClick={() => unlocked && handleThemeSelect('image', image.value)}
                                className={`w-full h-47 aspect-square relative hover:scale-105 duration-200 transition-transform cursor-pointer ${!unlocked ? 'opacity-50' : ''}`}
                            >
                                <Image 
                                    className="rounded-lg object-cover cursor-popinter"
                                    src={image.value}
                                    alt={image.name}
                                    fill
                                />
                                {isSelected && (
                                    <div className="absolute top-1 right-1 bg-white rounded-full p-1 shadow">
                                        <Check className="w-4 h-4"/>
                                    </div>
                                )}
                                {!unlocked && (
                                    <>
                                        <div className="absolute inset-0 bg-black/40 rounded-lg"></div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Lock className="w-6 h-6 text-white drop-shadow-lg"/>
                                        </div>
                                    </>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}