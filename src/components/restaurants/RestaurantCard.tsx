import React from 'react';
import { MapPin, Percent } from 'lucide-react';
import type { Restaurant } from '../../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSelect: (id: string) => void;
}

export function RestaurantCard({ restaurant, onSelect }: RestaurantCardProps) {
  return (
    <div 
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      onClick={() => onSelect(restaurant.id)}
    >
      <img 
        src={restaurant.imageUrl} 
        alt={restaurant.name}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2">{restaurant.name}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{restaurant.distance.toFixed(1)} miles away</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-700">{restaurant.rating.toFixed(1)}</span>
          </div>
          
          <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            <Percent className="w-4 h-4" />
            <span className="text-sm font-medium">{restaurant.cashbackRate}% back</span>
          </div>
        </div>
      </div>
    </div>
  );
}