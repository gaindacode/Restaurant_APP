import { enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { db } from '../core/firestore';
import { PERSISTENCE_SETTINGS } from '../../../config/firebase/constants';
import type { PersistenceResult } from '../types';

export async function setupPersistence(): Promise<PersistenceResult> {
  try {
    await enableMultiTabIndexedDbPersistence(db);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
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
      error: 'Unknown persistence error'
    };
  }
}