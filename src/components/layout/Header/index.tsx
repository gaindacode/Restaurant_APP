import React from 'react';
import { Menu } from 'lucide-react';
import { Logo } from '../../common/Logo';
import { NotificationBell } from './NotificationBell';
import { ProfileMenu } from './ProfileMenu';
import { MobileMenu } from './MobileMenu';
import { useHeader } from './useHeader';

export function Header() {
  const { isMenuOpen, toggleMenu } = useHeader();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-full"
          aria-label="Toggle mobile menu"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        
        {/* Logo */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Logo showTagline={false} className="lg:ml-0" />
        </div>
        
        {/* User Actions */}
        <div className="flex items-center gap-2">
          <NotificationBell />
          <ProfileMenu />
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} />
    </header>
  );
}