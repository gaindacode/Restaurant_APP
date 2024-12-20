import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/core/initialize';
import type { ConnectionStatus } from '../../services/firebase/types';

export function useFirebaseConnection() {
  const [status, setStatus] = useState<ConnectionStatus>({
    status: 'online'
  });

  useEffect(() => {
    // Use a special Firestore collection for connection status
    const unsubscribe = onSnapshot(
      doc(db, '.info/connected'),
      (snapshot) => {
        setStatus({ status: snapshot.exists() ? 'online' : 'offline' });
      },
      (error) => {
        setStatus({ 
          status: 'error',
          error: error.message 
        });
      },
      // Force long polling for better connection monitoring
      { includeMetadataChanges: true }
    );

    return () => unsubscribe();
  }, []);

  return {
    isOnline: status.status === 'online',
    isOffline: status.status === 'offline',
    hasError: status.status === 'error',
    error: status.error
  };
}