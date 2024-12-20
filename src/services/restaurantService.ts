import { RestaurantChain } from '../types/maps';

const RESTAURANT_BRANDS = {
  "McDonald's": {
    logo: "https://images.unsplash.com/photo-1540714160288-442f81193ca8?auto=format&fit=crop&w=100",
    cashbackRate: 5
  },
  "Chipotle": {
    logo: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&w=100",
    cashbackRate: 4
  },
  "Starbucks": {
    logo: "https://images.unsplash.com/photo-1577995350017-c0f0497cf357?auto=format&fit=crop&w=100",
    cashbackRate: 3
  },
  "Chick-fil-A": {
    logo: "https://images.unsplash.com/photo-1597393353415-b3730f3719fe?auto=format&fit=crop&w=100",
    cashbackRate: 6
  }
};

interface OverpassResult {
  elements: Array<{
    id: number;
    lat: number;
    lon: number;
    tags: {
      name?: string;
      'addr:street'?: string;
      'addr:housenumber'?: string;
      'addr:city'?: string;
      'addr:postcode'?: string;
    };
  }>;
}

function formatAddress(tags: any): string {
  const parts = [];
  if (tags['addr:housenumber']) parts.push(tags['addr:housenumber']);
  if (tags['addr:street']) parts.push(tags['addr:street']);
  if (tags['addr:city']) parts.push(tags['addr:city']);
  if (tags['addr:postcode']) parts.push(tags['addr:postcode']);
  return parts.join(', ') || 'Address unavailable';
}

export async function getNearbyRestaurants(lat: number, lng: number): Promise<RestaurantChain[]> {
  // Create a bounding box around the location (roughly 2km radius)
  const radius = 0.02; // approximately 2km in degrees
  const bbox = `${lat - radius},${lng - radius},${lat + radius},${lng + radius}`;
  
  // Overpass query to find restaurants of specific brands
  const query = `
    [out:json][timeout:25];
    (
      node["amenity"="restaurant"]["name"~"McDonald's|Chipotle|Starbucks|Chick-fil-A",i](${bbox});
      way["amenity"="restaurant"]["name"~"McDonald's|Chipotle|Starbucks|Chick-fil-A",i](${bbox});
    );
    out body;
    >;
    out skel qt;
  `;

  try {
    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: query
    });

    if (!response.ok) {
      throw new Error('Failed to fetch restaurant data');
    }

    const data: OverpassResult = await response.json();
    
    // Group restaurants by brand
    const restaurantsByBrand = new Map<string, any[]>();
    
    data.elements.forEach(element => {
      if (element.tags?.name) {
        const name = element.tags.name;
        const brand = Object.keys(RESTAURANT_BRANDS).find(b => 
          name.toLowerCase().includes(b.toLowerCase())
        );
        
        if (brand) {
          if (!restaurantsByBrand.has(brand)) {
            restaurantsByBrand.set(brand, []);
          }
          
          restaurantsByBrand.get(brand)?.push({
            lat: element.lat,
            lng: element.lon,
            address: formatAddress(element.tags)
          });
        }
      }
    });

    // Convert to RestaurantChain format
    return Array.from(restaurantsByBrand.entries()).map(([brand, locations], index) => ({
      id: String(index + 1),
      name: brand,
      logo: RESTAURANT_BRANDS[brand as keyof typeof RESTAURANT_BRANDS].logo,
      cashbackRate: RESTAURANT_BRANDS[brand as keyof typeof RESTAURANT_BRANDS].cashbackRate,
      locations
    }));
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    return [];
  }
}