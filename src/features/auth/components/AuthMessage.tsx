import React from 'react';
import { useLocation } from 'react-router-dom';

export function AuthMessage() {
  const location = useLocation();
  const message = (location.state as any)?.message;

  if (!message) return null;

  return (
    <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm mb-4">
      {message}
    </div>
  );
}