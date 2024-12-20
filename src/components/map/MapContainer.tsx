import React from 'react';
import { GoogleMap } from '../common/GoogleMap';
import { RestaurantMarkers } from './RestaurantMarkers';
import { LoadingState } from './LoadingState';
import { LocationError } from './LocationError';
import { useMapState } from '../../hooks/maps/useMapState';

export function MapContainer() {
  const { center, restaurants, loading, error } = useMapState();

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <LocationError message={error} />;
  }

  return (
    <div className="w-full h-full rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white">
      <GoogleMap center={center} zoom={13}>
        <RestaurantMarkers restaurants={restaurants} />
      </GoogleMap>
    </div>
  );
}