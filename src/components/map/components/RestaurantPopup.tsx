import React from 'react';
import { MapPin, Percent } from 'lucide-react';
import type { RestaurantChain, Location } from '../../../types/maps';

interface RestaurantPopupProps {
  restaurant: RestaurantChain;
  location: Location;
}

export function RestaurantPopup({ restaurant, location }: RestaurantPopupProps) {
  return (
    <div className="p-3 min-w-[240px]">
      <div className="flex items-center gap-2 mb-2">
        <img 
          src={restaurant.logo} 
          alt={restaurant.name} 
          className="w-8 h-8 rounded-full"
        />
        <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
      </div>
      
      <div className="flex items-center gap-2 text-gray-600 mb-2">
        <MapPin className="w-4 h-4" />
        <p className="text-sm">{location.address}</p>
      </div>
      
      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full w-fit">
        <Percent className="w-4 h-4" />
        <span className="text-sm font-medium">{restaurant.cashbackRate}% back</span>
      </div>
    </div>
  );
}