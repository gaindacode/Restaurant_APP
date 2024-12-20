export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  phoneNumber?: string;
  cashbackBalance: number;
  monthlyEarnings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentCard {
  id: string;
  userId: string;
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Transaction {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  amount: number;
  cashbackAmount: number;
  cashbackRate: number;
  cardLast4: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}