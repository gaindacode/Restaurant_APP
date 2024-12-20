import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationErrorProps {
  message: string;
}

export function LocationError({ message }: LocationErrorProps) {
  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white flex items-center justify-center">
      <div className="text-center p-4">
        <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
        <h3 className="text-lg font-semibold text-gray-900 mb-1">Location Error</h3>
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}