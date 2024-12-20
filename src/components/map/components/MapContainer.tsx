import React from 'react';
import { GoogleMap } from '../GoogleMap';
import { RestaurantMarkers } from '../RestaurantMarkers';
import { LoadingState } from '../LoadingState';
import { LocationError } from '../LocationError';
import { useMapState } from '../../../hooks/maps/useMapState';

export function MapContainer() {
  const { center, restaurants, loading, error } = useMapState();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <LocationError message={error} />;
  }

  return (
    <div className="w-full h-full">
      <GoogleMap center={center} zoom={13}>
        <RestaurantMarkers restaurants={restaurants} />
      </GoogleMap>
    </div>
  );
}