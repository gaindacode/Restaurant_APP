import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { useRestaurantMarker } from '../hooks/useRestaurantMarker';
import { RestaurantPopup } from './RestaurantPopup';
import type { RestaurantChain, Location } from '../../../types/maps';

interface RestaurantMarkerProps {
  restaurant: RestaurantChain;
  location: Location;
}

export function RestaurantMarker({ restaurant, location }: RestaurantMarkerProps) {
  const { icon } = useRestaurantMarker(restaurant);

  return (
    <Marker 
      position={[location.lat, location.lng]} 
      icon={icon}
    >
      <Popup>
        <RestaurantPopup restaurant={restaurant} location={location} />
      </Popup>
    </Marker>
  );
}