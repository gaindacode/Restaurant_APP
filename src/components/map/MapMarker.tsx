import React, { useEffect, useState } from 'react';
import type { MapMarkerProps } from '../../types/maps';

export function MapMarker({ position, restaurant, map, onClick }: MapMarkerProps & { map?: google.maps.Map }) {
  const [marker, setMarker] = useState<google.maps.Marker>();

  useEffect(() => {
    if (!marker) {
      const newMarker = new google.maps.Marker({
        position,
        map,
        icon: {
          url: restaurant.logo,
          scaledSize: new google.maps.Size(32, 32),
          anchor: new google.maps.Point(16, 16),
        },
      });
      setMarker(newMarker);

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">${restaurant.name}</h3>
            <p class="text-sm text-gray-600">${position.address}</p>
            <p class="text-sm font-medium text-emerald-600">${restaurant.cashbackRate}% cashback</p>
          </div>
        `,
      });

      newMarker.addListener('click', () => {
        infoWindow.open(map, newMarker);
        onClick?.();
      });
    }

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [map, marker, position, restaurant, onClick]);

  return null;
}