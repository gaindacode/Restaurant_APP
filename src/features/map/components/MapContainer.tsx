import React from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import { useCurrentLocation } from '../hooks/useCurrentLocation';
import { useRestaurants } from '../../restaurants/hooks/useRestaurants';
import { useRestaurantSearch } from '../../restaurants/hooks/useRestaurantSearch';
import { RestaurantMarkers } from './RestaurantMarkers';
import { SearchBar } from '../../common/components/SearchBar';
import { LoadingState } from './LoadingState';
import { LocationError } from './LocationError';
import { DEFAULT_CENTER } from '../../../config/constants';
import 'leaflet/dist/leaflet.css';

export function MapContainer() {
  const { coords, error: locationError, loading: locationLoading } = useCurrentLocation();
  const { searchQuery, setSearchQuery, filterRestaurants } = useRestaurantSearch();

  const center = coords 
    ? { lat: coords[0], lng: coords[1] }
    : { lat: DEFAULT_CENTER[0], lng: DEFAULT_CENTER[1] };

  const { restaurants, loading: restaurantsLoading, error: restaurantsError } = 
    useRestaurants(center);

  const filteredRestaurants = filterRestaurants(restaurants);

  if (locationLoading || restaurantsLoading) {
    return <LoadingState />;
  }

  if (locationError || restaurantsError) {
    return <LocationError 
      message={locationError || restaurantsError || 'An error occurred'} 
    />;
  }

  return (
    <div className="space-y-4">
      <SearchBar 
        value={searchQuery}
        onChange={setSearchQuery}
        onClear={() => setSearchQuery('')}
        placeholder="Search for restaurants..."
      />
      <div className="w-full h-[calc(100vh-16rem)] rounded-xl overflow-hidden shadow-lg">
        <LeafletMap
          center={[center.lat, center.lng]}
          zoom={14}
          className="h-full"
          scrollWheelZoom={true}
          doubleClickZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RestaurantMarkers 
            restaurants={filteredRestaurants}
            onSelect={(restaurant) => setSearchQuery(restaurant.name)}
          />
        </LeafletMap>
      </div>
    </div>
  );
}