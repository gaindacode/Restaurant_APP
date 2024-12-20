import React from 'react';
import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full h-[calc(100vh-16rem)] rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center">
      <div className="text-center p-4">
        <Loader2 className="w-12 h-12 text-emerald-600 mx-auto mb-4 animate-spin" />
        <p className="text-gray-600">Finding restaurants near you...</p>
      </div>
    </div>
  );
}