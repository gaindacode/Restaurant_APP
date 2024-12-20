import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MAJOR_RESTAURANT_CHAINS } from '../../config/restaurants.config';

interface RestaurantFiltersProps {
  selectedChain: string | null;
  onSelectChain: (chain: string | null) => void;
  restaurantCounts: Record<string, number>;
}

export function RestaurantFilters({ 
  selectedChain, 
  onSelectChain,
  restaurantCounts 
}: RestaurantFiltersProps) {
  const [rotation, setRotation] = useState(0);
  const itemCount = MAJOR_RESTAURANT_CHAINS.length;
  const angleStep = 360 / itemCount;

  const rotate = (direction: 'left' | 'right') => {
    setRotation(prev => {
      const newRotation = direction === 'left' 
        ? prev + angleStep 
        : prev - angleStep;
      return newRotation;
    });
  };

  return (
    <div className="relative h-[300px] flex items-center justify-center">
      {/* Navigation buttons */}
      <button
        onClick={() => rotate('left')}
        className="absolute left-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-gray-700"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => rotate('right')}
        className="absolute right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 text-gray-700"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Center "All Restaurants" button */}
      <button
        onClick={() => onSelectChain(null)}
        className={`
          absolute z-20 transform -translate-x-1/2 -translate-y-1/2
          w-24 h-24 rounded-full flex flex-col items-center justify-center
          transition-all duration-200
          ${!selectedChain
            ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white shadow-lg scale-110'
            : 'bg-white text-gray-700 border-2 border-gray-200 hover:bg-gray-50'
          }
        `}
      >
        <span className="text-sm font-medium text-center">All{'\n'}Restaurants</span>
      </button>

      {/* Circular restaurant buttons */}
      <div 
        className="relative w-[250px] h-[250px] transition-transform duration-500"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {MAJOR_RESTAURANT_CHAINS.map((chain, index) => {
          const count = restaurantCounts[chain.name.split(' ')[0]] || 0;
          const angle = (index * angleStep) * (Math.PI / 180);
          const radius = 125; // Half of container width/height
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <button
              key={chain.name}
              onClick={() => onSelectChain(selectedChain === chain.name ? null : chain.name)}
              disabled={count === 0}
              className={`
                absolute left-1/2 top-1/2
                w-16 h-16 rounded-full
                flex flex-col items-center justify-center
                transition-all duration-200
                ${selectedChain === chain.name
                  ? 'bg-gradient-to-r from-yellow-500 to-green-500 text-white shadow-lg scale-110'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                }
                ${count === 0 ? 'opacity-50' : ''}
              `}
              style={{
                transform: `
                  translate(${x}px, ${y}px) 
                  rotate(${-rotation}deg)
                `
              }}
            >
              <div className="relative">
                <img
                  src={chain.logo}
                  alt={chain.name}
                  className="w-8 h-8 rounded-full object-cover mb-1"
                />
                {count > 0 && (
                  <span className={`
                    absolute -top-1 -right-1 
                    text-xs px-1.5 rounded-full
                    ${selectedChain === chain.name
                      ? 'bg-white/20 text-white'
                      : 'bg-yellow-500 text-white'
                    }
                  `}>
                    {count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium text-center leading-tight">
                {chain.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}