import { useMemo } from 'react';
import { Icon } from 'leaflet';
import type { RestaurantChain } from '../../../types/maps';

export function useRestaurantMarker(restaurant: RestaurantChain) {
  const icon = useMemo(() => new Icon({
    iconUrl: restaurant.logo,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16],
    className: 'rounded-full shadow-md'
  }), [restaurant.logo]);

  return { icon };
}