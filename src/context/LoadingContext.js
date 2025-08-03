"use client";

import { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loadingTasks, setLoadingTasks] = useState(new Set());
  
    const startLoading = (task) => {
      setLoadingTasks(prev => new Set([...prev, task]));
    };
  
    const finishLoading = (task) => {
      setLoadingTasks(prev => {
        const updated = new Set(prev);
        updated.delete(task);
        return updated;
      });
    };
  
    const isLoading = loadingTasks.size > 0;
  
    return (
      <LoadingContext.Provider value={{ startLoading, finishLoading, isLoading }}>
        {children}
      </LoadingContext.Provider>
    );
  };

  export const useLoading = () => useContext(LoadingContext);

