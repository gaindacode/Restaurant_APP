import { type Restaurant } from '../types/restaurant';
import { SUPPORTED_RESTAURANTS } from '../config/restaurants.config';

export async function searchNearbyRestaurants(
  location: google.maps.LatLngLiteral,
  radius: number = 2000 // 2km radius
): Promise<Restaurant[]> {
  const service = new google.maps.places.PlacesService(
    document.createElement('div')
  );

  const searchPromises = SUPPORTED_RESTAURANTS.map((brand) =>
    new Promise<google.maps.places.PlaceResult[]>((resolve) => {
      const request: google.maps.places.PlaceSearchRequest = {
        location,
        radius,
        keyword: brand.name,
        type: 'restaurant'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          resolve(results);
        } else {
          resolve([]);
        }
      });
    })
  );

  try {
    const allResults = await Promise.all(searchPromises);
    return allResults
      .flat()
      .map((place, index) => {
        const brand = SUPPORTED_RESTAURANTS.find(
          (b) => place.name?.toLowerCase().includes(b.name.toLowerCase())
        );

        if (!brand || !place.geometry?.location) return null;

        return {
          id: `${place.place_id || index}`,
          name: place.name || '',
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
            address: place.vicinity || ''
          },
          brand: brand.name,
          logo: brand.logo,
          cashbackRate: brand.cashbackRate,
          rating: place.rating || 0,
          userRatingsTotal: place.user_ratings_total || 0
        };
      })
      .filter((place): place is Restaurant => place !== null);
  } catch (error) {
    console.error('Error fetching places:', error);
    return [];
  }
}