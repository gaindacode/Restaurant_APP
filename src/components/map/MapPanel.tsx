import React from 'react';
import { useCurrentLocation } from '../../hooks/useCurrentLocation';
import { useRestaurants } from '../../hooks/useRestaurants';
import { useRestaurantFilter } from '../../hooks/useRestaurantFilter';
import { GoogleMap } from './GoogleMap';
import { RestaurantMarkers } from './RestaurantMarkers';
import { LoadingState } from './LoadingState';
import { LocationError } from './LocationError';
import { DEFAULT_CENTER } from '../../config/constants';

export function MapPanel() {
  const { coords, error: locationError, loading: locationLoading } = useCurrentLocation();
  const { selectedChain } = useRestaurantFilter();
  
  const center = coords 
    ? { lat: coords[0], lng: coords[1] }
    : { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };

  const { restaurants, loading: restaurantsLoading, error: restaurantsError } = 
    useRestaurants(center);

  const filteredRestaurants = selectedChain
    ? restaurants.filter(r => r.name.toLowerCase().includes(selectedChain.toLowerCase()))
    : restaurants;

  if (locationLoading || restaurantsLoading) {
    return <LoadingState />;
  }

  const error = locationError || restaurantsError;
  if (error) {
    return <LocationError message={error} />;
  }

  return (
    <div className="w-full h-full">
      <GoogleMap center={center} zoom={13}>
        <RestaurantMarkers restaurants={filteredRestaurants} />
      </GoogleMap>
    </div>
  );
}