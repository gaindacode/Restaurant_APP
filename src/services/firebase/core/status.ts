import { db } from './initialize';
import { onSnapshotError } from '../utils/error-handlers';

export type ConnectionStatus = 'online' | 'offline' | 'error';

export function monitorConnectionStatus(
  onStatusChange: (status: ConnectionStatus) => void
) {
  return db.enableNetwork()
    .then(() => {
      onStatusChange('online');
    })
    .catch((error) => {
      if (error?.code === 'unavailable') {
        onStatusChange('offline');
      } else {
        onStatusChange('error');
        onSnapshotError(error);
      }
    });
}