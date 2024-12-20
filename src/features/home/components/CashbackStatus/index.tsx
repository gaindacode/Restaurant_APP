import React from 'react';
import { Wallet, TrendingUp } from 'lucide-react';

interface CashbackStatusProps {
  balance: number;
  monthlyEarnings: number;
  monthlyLimit: number;
}

export function CashbackStatus({ balance, monthlyEarnings, monthlyLimit }: CashbackStatusProps) {
  const progress = (monthlyEarnings / monthlyLimit) * 100;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Your Cashback</h2>
          <p className="text-sm text-gray-500">Available balance</p>
        </div>
        <Wallet className="w-8 h-8 text-yellow-500" />
      </div>
      
      <div className="mb-6">
        <span className="text-3xl font-bold text-gray-900">${balance.toFixed(2)}</span>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-600">Monthly Progress</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            ${monthlyEarnings.toFixed(2)} / ${monthlyLimit}
          </span>
        </div>
        
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-yellow-500 to-green-500 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}