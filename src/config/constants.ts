// Map defaults
export const DEFAULT_CENTER: [number, number] = [37.7749, -122.4194]; // San Francisco
export const DEFAULT_ZOOM = 14;

// Restaurant data
export const SUPPORTED_RESTAURANTS = [
  {
    name: "McDonald's",
    logo: "https://images.unsplash.com/photo-1540714160288-442f81193ca8?auto=format&fit=crop&w=100",
    cashbackRate: 5
  },
  {
    name: "Chipotle",
    logo: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&w=100",
    cashbackRate: 4
  },
  {
    name: "Starbucks",
    logo: "https://images.unsplash.com/photo-1577995350017-c0f0497cf357?auto=format&fit=crop&w=100",
    cashbackRate: 3
  },
  {
    name: "Chick-fil-A",
    logo: "https://images.unsplash.com/photo-1597393353415-b3730f3719fe?auto=format&fit=crop&w=100",
    cashbackRate: 6
  }
] as const;