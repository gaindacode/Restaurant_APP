import React from 'react';
import { UtensilsCrossed, Cookie } from 'lucide-react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
}

export function Logo({ className = '', showTagline = true }: LogoProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="bg-gradient-to-br from-yellow-500 to-green-500 rounded-full p-2">
            <UtensilsCrossed className="w-6 h-6 text-white" />
          </div>
          <div className="absolute -top-1 -right-1">
            <Cookie className="w-4 h-4 text-green-600 drop-shadow-md" />
          </div>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-green-500 bg-clip-text text-transparent">
          SaverBite
        </span>
      </div>
      {showTagline && (
        <span className="text-sm text-gray-600 ml-10 -mt-1">
          Every bite brings money back™
        </span>
      )}
    </div>
  );
}