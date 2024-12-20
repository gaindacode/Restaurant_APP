import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin mx-auto mb-2" />
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  );
}