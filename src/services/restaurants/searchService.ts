import { getPlacesClient } from './placesClient';
import { MAJOR_RESTAURANT_CHAINS } from '../../config/restaurants.config';
import type { Restaurant } from '../../types/restaurant';
import type { PlacesError } from './types';

export async function searchRestaurants(
  query: string,
  location: google.maps.LatLngLiteral
): Promise<Restaurant[]> {
  try {
    const placesClient = await getPlacesClient();
    
    const results = await placesClient.searchNearby({
      location,
      keyword: query,
      radius: 8047 // 5 miles in meters
    });

    return results
      .map(place => {
        if (!place.geometry?.location) return null;

        const chain = MAJOR_RESTAURANT_CHAINS.find(
          c => place.name?.toLowerCase().includes(c.name.toLowerCase())
        );

        // Only include restaurants from our supported chains
        if (!chain) return null;

        return {
          id: place.place_id || `temp-${Date.now()}-${Math.random()}`,
          name: place.name || chain.name,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.vicinity || 'Address unavailable'
          },
          logo: chain.logo,
          cashbackRate: chain.cashbackRate,
          rating: place.rating || 0,
          userRatingsTotal: place.user_ratings_total || 0
        };
      })
      .filter((r): r is Restaurant => r !== null);
  } catch (error) {
    const placesError = error as PlacesError;
    console.error('Error searching restaurants:', {
      message: placesError.message,
      status: placesError.status
    });
    throw placesError;
  }
}