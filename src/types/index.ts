export interface User {
  id: string;
  email: string;
  name: string;
  cashbackBalance: number;
  monthlyEarnings: number;
}

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  rating: number;
  imageUrl: string;
  distance: number;
  cashbackRate: number;
}

export interface Transaction {
  id: string;
  restaurantId: string;
  amount: number;
  cashbackAmount: number;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
  receiptUrl: string;
}