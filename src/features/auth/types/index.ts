export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  cashbackBalance: number;
  monthlyEarnings: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthError {
  code?: string;
  message: string;
}