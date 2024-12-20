import React from 'react';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../features/auth/context/AuthContext';
import { signOut } from '../../../features/auth/services/auth';

interface MobileMenuProps {
  isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className="lg:hidden border-t border-gray-200">
      <div className="bg-white px-4 py-2">
        <div className="flex items-center justify-between py-2 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-700">{user?.displayName}</span>
          <button
            onClick={handleSignOut}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}