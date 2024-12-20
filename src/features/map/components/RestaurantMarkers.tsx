import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';
import type { Restaurant } from '../../restaurants/types';

interface RestaurantMarkersProps {
  restaurants: Restaurant[];
  onSelect?: (restaurant: Restaurant) => void;
}

export function RestaurantMarkers({ restaurants, onSelect }: RestaurantMarkersProps) {
  return (
    <>
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={[restaurant.location.lat, restaurant.location.lng]}
          icon={icon({
            iconUrl: restaurant.logo,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
            className: 'rounded-full'
          })}
          eventHandlers={{
            click: () => onSelect?.(restaurant)
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{restaurant.location.address}</p>
              {restaurant.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-yellow-500">★</span>
                  <span className="text-sm">{restaurant.rating.toFixed(1)}</span>
                  {restaurant.userRatingsTotal && (
                    <span className="text-sm text-gray-500">
                      ({restaurant.userRatingsTotal})
                    </span>
                  )}
                </div>
              )}
              <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                {restaurant.cashbackRate}% cashback
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
}