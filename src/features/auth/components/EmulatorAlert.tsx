import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { isDevelopment } from '../../../utils/environment';

export function EmulatorAlert() {
  if (!isDevelopment()) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-50 border-t border-blue-200 p-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-sm text-blue-700">
        <AlertTriangle className="w-4 h-4" />
        <span>Running in emulator mode. Do not use with production credentials.</span>
      </div>
    </div>
  );
}