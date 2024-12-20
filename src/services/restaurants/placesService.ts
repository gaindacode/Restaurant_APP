import { SUPPORTED_RESTAURANTS } from '../../config/constants';
import type { Restaurant } from '../../types/restaurant';

let placesService: google.maps.places.PlacesService | null = null;

function getPlacesService(): google.maps.places.PlacesService {
  if (!placesService) {
    // Create a temporary div for the PlacesService
    const div = document.createElement('div');
    placesService = new google.maps.places.PlacesService(div);
  }
  return placesService;
}

function searchPlace(
  request: google.maps.places.PlaceSearchRequest
): Promise<google.maps.places.PlaceResult[]> {
  const service = getPlacesService();
  
  return new Promise((resolve, reject) => {
    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        resolve(results);
      } else if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
        resolve([]);
      } else {
        reject(new Error(`Places API error: ${status}`));
      }
    });
  });
}

export async function searchNearbyRestaurants(
  lat: number,
  lng: number,
  radius: number = 2000 // 2km radius
): Promise<Restaurant[]> {
  try {
    // Search for each supported restaurant chain
    const searchPromises = SUPPORTED_RESTAURANTS.map(brand => 
      searchPlace({
        location: { lat, lng },
        radius,
        keyword: brand.name,
        type: 'restaurant'
      })
    );

    const results = await Promise.all(searchPromises);
    
    // Process and combine results
    return results
      .flat()
      .map((place, index) => {
        if (!place.geometry?.location) return null;

        const brand = SUPPORTED_RESTAURANTS.find(
          b => place.name?.toLowerCase().includes(b.name.toLowerCase())
        );

        if (!brand) return null;

        return {
          id: place.place_id || `temp-${index}`,
          name: place.name || brand.name,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.vicinity || 'Address unavailable'
          },
          brand: brand.name,
          logo: brand.logo,
          cashbackRate: brand.cashbackRate,
          rating: place.rating || 0,
          userRatingsTotal: place.user_ratings_total || 0
        };
      })
      .filter((r): r is Restaurant => r !== null);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    throw error;
  }
}