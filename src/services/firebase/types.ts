export type NetworkStatus = {
  status: 'online' | 'offline' | 'error';
  error?: string;
};

export interface PersistenceResult {
  success: boolean;
  error?: string;
}

export interface FirestoreError extends Error {
  code?: string;
  details?: unknown;
}