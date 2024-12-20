import { enableNetwork, disableNetwork } from 'firebase/firestore';
import { db } from './initialize';
import type { ConnectionStatus } from '../types';

export async function enableFirestoreNetwork(): Promise<ConnectionStatus> {
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

export async function disableFirestoreNetwork(): Promise<ConnectionStatus> {
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