import React from 'react';
import { Bell } from 'lucide-react';

export function NotificationBell() {
  return (
    <button 
      className="p-2 hover:bg-gray-100 rounded-full relative"
      aria-label="Notifications"
    >
      <Bell className="w-6 h-6 text-gray-700" />
      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
    </button>
  );
}