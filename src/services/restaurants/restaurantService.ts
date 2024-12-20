import { getPlacesClient } from './placesClient';
import { MAJOR_RESTAURANT_CHAINS } from '../../config/restaurants.config';
import type { Restaurant } from '../../types/restaurant';
import type { PlacesError } from './types';

export async function searchNearbyRestaurants(
  lat: number, 
  lng: number
): Promise<Restaurant[]> {
  try {
    const placesClient = await getPlacesClient();
    const searchPromises = MAJOR_RESTAURANT_CHAINS.map(chain => 
      placesClient.searchNearby({
        location: { lat, lng },
        radius: 8047, // 5 miles in meters
        keyword: chain.name,
        type: 'restaurant'
      })
    );

    const results = await Promise.all(searchPromises);
    const allResults = results.flat();
    
    // Use a Map to deduplicate results by place_id
    const uniqueResults = new Map<string, google.maps.places.PlaceResult>();
    
    allResults.forEach(place => {
      if (place.place_id && !uniqueResults.has(place.place_id)) {
        uniqueResults.set(place.place_id, place);
      }
    });

    return Array.from(uniqueResults.values())
      .map(place => {
        if (!place.geometry?.location) return null;

        const chain = MAJOR_RESTAURANT_CHAINS.find(
          c => place.name?.toLowerCase().includes(c.name.toLowerCase())
        );

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
    console.error('Error fetching restaurants:', {
      message: placesError.message,
      status: placesError.status
    });
    throw placesError;
  }
}