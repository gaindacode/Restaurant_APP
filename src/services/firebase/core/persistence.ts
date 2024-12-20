import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { db } from './initialize';
import { FirebaseError } from 'firebase/app';

interface PersistenceResult {
  success: boolean;
  error?: string;
}

export async function setupPersistence(): Promise<PersistenceResult> {
  try {
    await enableMultiTabIndexedDbPersistence(db);
    return { success: true };
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'failed-precondition':
          return {
            success: false,
            error: 'Multiple tabs open, persistence enabled in another tab'
          };
        case 'unimplemented':
          return {
            success: false,
            error: 'Browser does not support offline persistence'
          };
        default:
          return {
            success: false,
            error: `Firebase persistence error: ${error.message}`
          };
      }
    }
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown persistence error'
    };
  }
}