import React from 'react';
import { Marker } from './Marker';
import type { Restaurant } from '../../types/restaurant';

interface RestaurantMarkersProps {
  restaurants: Restaurant[];
  map?: google.maps.Map;
}

export function RestaurantMarkers({ restaurants, map }: RestaurantMarkersProps) {
  if (!map) return null;

  return (
    <>
      {restaurants.map(restaurant => (
        <Marker
          key={restaurant.id}
          map={map}
          position={{
            lat: restaurant.location.lat,
            lng: restaurant.location.lng
          }}
          title={restaurant.name}
          icon={{
            url: restaurant.logo || '',
            scaledSize: new google.maps.Size(32, 32),
            anchor: new google.maps.Point(16, 16),
          }}
        />
      ))}
    </>
  );
}