import React from 'react';
import { Header } from '../components/Header';
import { CashbackStatus } from '../components/CashbackStatus';
import { SearchPanel } from '../components/SearchPanel';
import { MapContainer } from '../../../components/map';
import { useAuth } from '../../auth/context/AuthContext';

export function HomePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16">
        {/* Cashback Status */}
        <div className="px-4 max-w-7xl mx-auto mb-6">
          <CashbackStatus 
            balance={user.cashbackBalance}
            monthlyEarnings={user.monthlyEarnings}
            monthlyLimit={25}
          />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex max-w-7xl mx-auto px-4 h-[calc(100vh-13rem)]">
          <div className="w-1/3 bg-white rounded-lg shadow-lg overflow-hidden mr-4">
            <SearchPanel />
          </div>
          <div className="w-2/3 h-full">
            <MapContainer />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <div className="sticky top-16 z-20 bg-white shadow-sm">
            <div className="px-4 py-3">
              <SearchPanel compact />
            </div>
          </div>
          <div className="h-[calc(100vh-16rem)] px-4 mt-4">
            <MapContainer />
          </div>
        </div>
      </main>
    </div>
  );
}