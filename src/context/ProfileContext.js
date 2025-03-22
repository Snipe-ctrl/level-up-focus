"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/services/supabase";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            return { data };
        } catch (error) {
            console.error('Error updating profile:', error);
            return { error };
        }
    };

    useEffect(() => {
        async function fetchUserProfile() {
            if (!user) {
                setProfile(null);
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
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchUserProfile();
    }, [user]);

    return (
        <ProfileContext.Provider value={{ profile, loading, error, updateUserProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useUserProfile() {
    return useContext(ProfileContext);
}