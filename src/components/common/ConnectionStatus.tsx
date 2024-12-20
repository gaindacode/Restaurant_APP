import React from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';
import { useFirebaseConnection } from '../../hooks/firebase/useFirebaseConnection';

export function ConnectionStatus() {
  const { isOffline, hasError, error } = useFirebaseConnection();

  if (!isOffline && !hasError) return null;

  return (
    <div className={`
      fixed bottom-4 right-4 px-4 py-2 rounded-lg shadow-lg
      flex items-center gap-2
      ${hasError ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}
    `}>
      {isOffline ? (
        <>
          <WifiOff className="w-4 h-4" />
          <span>You're offline</span>
        </>
      ) : (
        <>
          <AlertTriangle className="w-4 h-4" />
          <span>{error || 'Connection error'}</span>
        </>
      )}
    </div>
  );
}