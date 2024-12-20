import React from 'react';
import { WifiOff } from 'lucide-react';
import { useNetworkStatus } from '../../../hooks/useNetworkStatus';

export function NetworkStatus() {
  const isOnline = useNetworkStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
      <WifiOff className="w-4 h-4" />
      <span>You're offline</span>
    </div>
  );
}