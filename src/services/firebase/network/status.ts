import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from '../core/firestore';
import type { NetworkStatus } from '../types';

export async function enableFirestoreNetwork(): Promise<NetworkStatus> {
  try {
    await enableNetwork(db);
    return { status: 'online' };
  } catch (error) {
    return { 
      status: 'error',
      error: error instanceof Error ? error.message : 'Failed to enable network'
    };
  }
}

export async function disableFirestoreNetwork(): Promise<NetworkStatus> {
  try {
    await disableNetwork(db);
    return { status: 'offline' };
  } catch (error) {
    return { 
      status: 'error',
      error: error instanceof Error ? error.message : 'Failed to disable network'
    };
  }
}