import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-900">How It Works</h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-yellow-500 hover:text-yellow-600 text-sm font-medium flex items-center gap-1"
        >
          <Play className="w-4 h-4" />
          {isOpen ? 'Close Video' : 'Watch Video'}
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-3xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
            <div className="aspect-video rounded-xl overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="How SaverBite Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-yellow-600 font-semibold">1</span>
          </div>
          <p className="text-sm text-gray-600">Search nearby restaurants</p>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-yellow-600 font-semibold">2</span>
          </div>
          <p className="text-sm text-gray-600">Pay with linked card</p>
        </div>
        <div className="space-y-2">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-100 to-green-100 rounded-full flex items-center justify-center mx-auto">
            <span className="text-yellow-600 font-semibold">3</span>
          </div>
          <p className="text-sm text-gray-600">Earn instant cashback</p>
        </div>
      </div>
    </div>
  );
}