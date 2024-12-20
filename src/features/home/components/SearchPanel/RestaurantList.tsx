import React from 'react';
import { Loader2, MapPin } from 'lucide-react';
import type { Restaurant } from '../../../../types/restaurant';

interface RestaurantListProps {
  restaurants: Restaurant[];
  loading?: boolean;
}

export function RestaurantList({ restaurants, loading }: RestaurantListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-8 h-8 text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (!restaurants.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No restaurants found in this area.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {restaurants.map(restaurant => (
        <div 
          key={restaurant.id}
          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start gap-3">
            <img
              src={restaurant.logo}
              alt={restaurant.name}
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{restaurant.name}</h3>
              <div className="flex items-center gap-1 text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <p className="truncate">{restaurant.location.address}</p>
              </div>
              {restaurant.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm text-gray-700">{restaurant.rating.toFixed(1)}</span>
                  {restaurant.userRatingsTotal && (
                    <span className="text-sm text-gray-500">
                      ({restaurant.userRatingsTotal})
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="bg-gradient-to-r from-yellow-100 to-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-medium">
              {restaurant.cashbackRate}% back
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}