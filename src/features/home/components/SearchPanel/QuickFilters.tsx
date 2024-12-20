import React from 'react';
import { MAJOR_RESTAURANT_CHAINS } from '../../../../config/restaurants.config';

interface QuickFiltersProps {
  selectedFilter: string | null;
  onSelect: (name: string) => void;
  className?: string;
}

export function QuickFilters({ selectedFilter, onSelect, className = '' }: QuickFiltersProps) {
  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${className}`}>
      {MAJOR_RESTAURANT_CHAINS.map((chain) => (
        <button
          key={chain.name}
          onClick={() => onSelect(chain.name)}
          className={`
            flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap
            transition-colors duration-200 flex-shrink-0
            ${selectedFilter === chain.name
              ? 'bg-gradient-to-r from-yellow-100 to-green-100 text-green-700 border-2 border-green-200'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          <img
            src={chain.logo}
            alt={chain.name}
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-sm font-medium">{chain.name}</span>
          <span className="text-xs text-green-600 font-medium">
            {chain.cashbackRate}%
          </span>
        </button>
      ))}
    </div>
  );
}