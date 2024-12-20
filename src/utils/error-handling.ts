import { FirebaseError as FirebaseErrorType } from 'firebase/app';

export class FirebaseError extends Error {
  constructor(
    message: string,
    public code?: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'FirebaseError';
  }
}

export function handleFirebaseError(error: unknown): FirebaseError {
  if (error instanceof FirebaseErrorType) {
    const message = getFirebaseErrorMessage(error.code);
    return new FirebaseError(message, error.code, error);
  }
  
  return new FirebaseError(
    'An unexpected error occurred',
    'unknown',
    error as Error
  );
}

export function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address';
    case 'auth/wrong-password':
      return 'Invalid password';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later';
    case 'permission-denied':
      return 'Access denied. Please sign in again.';
    case 'unavailable':
      return 'Service is temporarily unavailable. Please try again later.';
    default:
      return 'An error occurred. Please try again';
  }
}