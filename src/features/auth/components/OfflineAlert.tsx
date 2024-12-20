import React from 'react';
import { WifiOff } from 'lucide-react';

export function OfflineAlert() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-center gap-2">
        <WifiOff className="h-5 w-5 text-yellow-500" />
        <p className="text-sm text-yellow-700">
          You're currently offline. Some features may be limited.
        </p>
      </div>
    </div>
  );
}