"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/services/supabase";
import { useLoading } from "./LoadingContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const { user } = useAuth();
    const [profile, setProfile] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const cached = localStorage.getItem('userProfile');
                if (!cached) return null;
                return JSON.parse(cached);
            } catch (error) {
                localStorage.removeItem('userProfile');
                return null;
            }
        }
    });
    const [unlockedThemes, setUnlockedThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { isLoading, startLoading, finishLoading } = useLoading();

    const updateUserProfile = async (updates) => {
        if (!user || !profile) return { error: "No user profile found" };;

        try {
            const { data, error } = await supabase
            .from('user_profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

            if (error) throw error;
            setProfile(data);
            localStorage.setItem('userProfile', JSON.stringify(data));
            return { data };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { error };
        }
    };

    const fetchUnlockedThemes = async (userId) => {
        const { data, error } = await supabase
            .from('user_themes')
            .select('type, value')
            .eq('user_id', userId);

            if (error) {
                console.error("Error fetching unlocked themes: ", error);
                return;
            }

            setUnlockedThemes(data);
    }

    const preloadThemeImage = (theme) => {
        if (theme?.type === 'image') {
            const img = new Image();
            img.src = `/${theme.value}`;

            img.onload = () => finishLoading('timer');
            img.onerror = () => finishLoading('timer');

            return img;
        } else {
            finishLoading('timer');
        }
    };

    useEffect(() => {
        async function fetchUserProfile() {
            if (!user) {
                setProfile(null);
                localStorage.removeItem('userProfile');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();

                if (error) throw error;

                setProfile(data);
                localStorage.setItem('userProfile', JSON.stringify(data));
                await fetchUnlockedThemes(user.id);
                preloadThemeImage(data?.theme);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError(error.message);
            } finally {
                setLoading(false);
                finishLoading('profile-fetch');
            }
        }

        if (!profile || profile.id !== user?.id) {
            fetchUserProfile();
        }
    }, [user]);

    return (
        <ProfileContext.Provider value={{ profile, unlockedThemes, loading, error, updateUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useUserProfile() {
    return useContext(ProfileContext);
}