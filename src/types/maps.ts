export interface MapProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface RestaurantChain {
  id: string;
  name: string;
  logo: string;
  cashbackRate: number;
  locations: Location[];
}