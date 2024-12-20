import { useState, useCallback } from 'react';

export function useTimer() {
  const [timers, setTimers] = useState<Record<string, number>>({});

  const startTimer = useCallback((id: string) => {
    setTimers(prev => ({
      ...prev,
      [id]: Date.now() + 20 * 60 * 1000 // 20 minutes in milliseconds
    }));
  }, []);

  const clearTimer = useCallback((id: string) => {
    setTimers(prev => {
      const newTimers = { ...prev };
      delete newTimers[id];
      return newTimers;
    });
  }, []);

  const getTimeRemaining = useCallback((id: string): number => {
    const endTime = timers[id];
    if (!endTime) return 0;
    return Math.max(0, endTime - Date.now());
  }, [timers]);

  return {
    timers,
    startTimer,
    clearTimer,
    getTimeRemaining
  };
}