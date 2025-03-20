import React from 'react';
import { UserCircle2, User2 } from 'lucide-react';

interface GenderSelectorProps {
  value: 'male' | 'female';
  onChange: (value: 'male' | 'female') => void;
}

export default function GenderSelector({ value, onChange }: GenderSelectorProps) {
  return (
    <div className="flex justify-center mb-8">
      <div className="relative bg-gray-800/50 p-2 rounded-full flex gap-4">
        {/* Animated background */}
        <div
          className="absolute inset-y-2 w-[calc(50%-8px)] bg-gradient-to-r from-purple-600 to-purple-500 rounded-full transition-all duration-500 ease-in-out shadow-lg"
          style={{
            left: value === 'female' ? '8px' : '50%',
            filter: 'blur(4px) brightness(1.2)',
            opacity: 0.5,
          }}
        />
        
        {/* Solid background */}
        <div
          className="absolute inset-y-2 w-[calc(50%-8px)] bg-purple-600 rounded-full transition-all duration-500 ease-in-out"
          style={{
            left: value === 'female' ? '8px' : '50%',
          }}
        />
        
        <button
          onClick={() => onChange('female')}
          className={`relative z-10 px-8 py-4 rounded-full transition-all duration-500 ease-in-out group ${
            value === 'female' 
              ? 'text-white scale-105' 
              : 'text-gray-400 hover:text-purple-400'
          }`}
        >
          <div className="relative flex flex-col items-center gap-2">
            <div className="relative">
              <div className={`absolute inset-0 bg-white/20 rounded-full blur-xl transition-opacity duration-500 ${
                value === 'female' ? 'opacity-100' : 'opacity-0'
              }`} />
              <UserCircle2 className="h-8 w-8 transition-transform duration-500 ease-in-out" />
            </div>
            <span className={`text-sm font-medium transition-all duration-500 ${
              value === 'female' 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-60 transform -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
            }`}>Female</span>
          </div>
        </button>
        
        <button
          onClick={() => onChange('male')}
          className={`relative z-10 px-8 py-4 rounded-full transition-all duration-500 ease-in-out group ${
            value === 'male' 
              ? 'text-white scale-105' 
              : 'text-gray-400 hover:text-purple-400'
          }`}
        >
          <div className="relative flex flex-col items-center gap-2">
            <div className="relative">
              <div className={`absolute inset-0 bg-white/20 rounded-full blur-xl transition-opacity duration-500 ${
                value === 'male' ? 'opacity-100' : 'opacity-0'
              }`} />
              <User2 className="h-8 w-8 transition-transform duration-500 ease-in-out" />
            </div>
            <span className={`text-sm font-medium transition-all duration-500 ${
              value === 'male' 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-60 transform -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0'
            }`}>Male</span>
          </div>
        </button>
      </div>
    </div>
  );
}