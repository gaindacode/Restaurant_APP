// Map configuration constants
export const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194]; // San Francisco
export const DEFAULT_ZOOM = 13;

// Restaurant data with locations
export const MAJOR_RESTAURANTS = [
  {
    id: '1',
    name: "McDonald's",
    logo: "https://images.unsplash.com/photo-1540714160288-442f81193ca8?auto=format&fit=crop&w=100",
    cashbackRate: 5,
    locations: [
      { lat: 37.7749, lng: -122.4194, address: "201 Market St, San Francisco" },
      { lat: 37.7829, lng: -122.4074, address: "609 Market St, San Francisco" }
    ]
  },
  {
    id: '2',
    name: "Chipotle",
    logo: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&w=100",
    cashbackRate: 4,
    locations: [
      { lat: 37.7859, lng: -122.4074, address: "126 New Montgomery St, San Francisco" },
      { lat: 37.7879, lng: -122.4037, address: "525 Market St, San Francisco" }
    ]
  },
  {
    id: '3',
    name: "Starbucks",
    logo: "https://images.unsplash.com/photo-1577995350017-c0f0497cf357?auto=format&fit=crop&w=100",
    cashbackRate: 3,
    locations: [
      { lat: 37.7865, lng: -122.4024, address: "201 Powell St, San Francisco" },
      { lat: 37.7835, lng: -122.4082, address: "333 Market St, San Francisco" }
    ]
  },
  {
    id: '4',
    name: "Chick-fil-A",
    logo: "https://images.unsplash.com/photo-1597393353415-b3730f3719fe?auto=format&fit=crop&w=100",
    cashbackRate: 6,
    locations: [
      { lat: 37.7875, lng: -122.4064, address: "525 Market St, San Francisco" }
    ]
  }
];