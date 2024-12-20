import React, { useEffect, useState } from 'react';
import type { Restaurant } from '../../types/restaurant';

interface RestaurantMarkerProps {
  restaurant: Restaurant;
  map: google.maps.Map;
  onSelect?: (restaurant: Restaurant) => void;
}

export function RestaurantMarker({ restaurant, map, onSelect }: RestaurantMarkerProps) {
  const [marker, setMarker] = useState<google.maps.Marker>();
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();

  useEffect(() => {
    const newMarker = new google.maps.Marker({
      position: {
        lat: restaurant.location.lat,
        lng: restaurant.location.lng
      },
      map,
      title: restaurant.name,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#EAB308', // yellow-500
        fillOpacity: 1,
        strokeColor: '#22C55E', // green-500
        strokeWeight: 2,
        scale: 8
      }
    });

    const newInfoWindow = new google.maps.InfoWindow({
      content: `
        <div class="p-3 min-w-[240px]">
          <div class="mb-2">
            <h3 class="font-semibold text-gray-900">${restaurant.name}</h3>
            ${restaurant.rating ? `
              <div class="flex items-center gap-1 text-sm">
                <span class="text-yellow-500">★</span>
                <span>${restaurant.rating.toFixed(1)}</span>
                ${restaurant.userRatingsTotal ? `
                  <span class="text-gray-500">(${restaurant.userRatingsTotal})</span>
                ` : ''}
              </div>
            ` : ''}
          </div>
          <p class="text-sm text-gray-600 mb-2">${restaurant.location.address}</p>
          <div class="text-sm font-medium text-green-600">
            ${restaurant.cashbackRate}% cashback
          </div>
        </div>
      `
    });

    newMarker.addListener('click', () => {
      infoWindow?.close();
      newInfoWindow.open(map, newMarker);
      onSelect?.(restaurant);
    });

    setMarker(newMarker);
    setInfoWindow(newInfoWindow);

    return () => {
      newMarker.setMap(null);
      newInfoWindow.close();
    };
  }, [map, restaurant, onSelect]);

  return null;
}