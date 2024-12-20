// Auth-related error messages
export const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/user-not-found': 'No account found with this email address',
  'auth/wrong-password': 'Invalid password',
  'auth/email-already-in-use': 'An account already exists with this email address',
  'auth/weak-password': 'Password should be at least 6 characters',
  'auth/invalid-email': 'Invalid email address',
  'auth/network-request-failed': 'Network error. Please check your internet connection',
  'auth/too-many-requests': 'Too many attempts. Please try again later',
} as const;

// Firestore-related error messages
export const FIRESTORE_ERROR_MESSAGES: Record<string, string> = {
  'permission-denied': 'Access denied. Please sign in again.',
  'unavailable': 'Service is temporarily unavailable. Please try again later.',
  'failed-precondition': 'Operation failed. Please try again.',
  'not-found': 'Requested resource was not found.',
} as const;

// Get appropriate error message based on error code
export function getFirebaseErrorMessage(code: string): string {
  return (
    AUTH_ERROR_MESSAGES[code] ||
    FIRESTORE_ERROR_MESSAGES[code] ||
    'An error occurred. Please try again'
  );
}