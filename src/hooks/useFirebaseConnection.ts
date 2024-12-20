import { useState, useEffect } from 'react';
import { monitorConnectionStatus, ConnectionStatus } from '../services/firebase/core/status';

export function useFirebaseConnection() {
  const [status, setStatus] = useState<ConnectionStatus>('online');

  useEffect(() => {
    const unsubscribe = monitorConnectionStatus(setStatus);
    return () => {
      unsubscribe;
    };
  }, []);

  return {
    isOnline: status === 'online',
    isOffline: status === 'offline',
    hasError: status === 'error'
  };
}