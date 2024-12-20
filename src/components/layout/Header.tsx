import React, { useState } from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { useAuth } from '../../features/auth/context/AuthContext';
import { signOut } from '../../features/auth/services/auth';

export function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        
        {/* Logo */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Logo showTagline={false} className="lg:ml-0" />
        </div>
        
        {/* User Actions */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full relative">
            <Bell className="w-6 h-6 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="relative group">
            <button className="hidden lg:flex p-2 hover:bg-gray-100 rounded-full items-center gap-2">
              <span className="text-sm font-medium text-gray-700">{user?.displayName}</span>
            </button>
            
            {/* Desktop Dropdown */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden group-hover:block">
              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
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
      )}
    </header>
  );
}