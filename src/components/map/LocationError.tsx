import React from 'react';
import { Map as MapIcon } from 'lucide-react';

interface LocationErrorProps {
  message: string;
}

export function LocationError({ message }: LocationErrorProps) {
  return (
    <div className="w-full h-[calc(100vh-16rem)] rounded-xl overflow-hidden shadow-md bg-white flex items-center justify-center">
      <div className="text-center p-4">
        <MapIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Location Error</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}