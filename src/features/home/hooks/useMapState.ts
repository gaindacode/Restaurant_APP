import { useCurrentLocation } from '../../../hooks/useCurrentLocation';
import { useRestaurants } from '../../../hooks/useRestaurants';
import { useRestaurantFilter } from '../../../hooks/useRestaurantFilter';
import { DEFAULT_CENTER } from '../../../config/constants';

export function useMapState() {
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

  return {
    center,
    restaurants: filteredRestaurants,
    loading: locationLoading || restaurantsLoading,
    error: locationError || restaurantsError
  };
}