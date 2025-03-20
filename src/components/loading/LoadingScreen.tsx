import React from 'react';
import { Activity } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gray-900 grid-pattern flex items-center justify-center z-[9999]">
      <div className="text-center px-4">
        <div className="relative">
          {/* Glowing background effect */}
          <div 
            className="absolute inset-0 bg-purple-600/20 rounded-full blur-2xl" 
            style={{ animation: 'breathing 2s ease-in-out infinite' }} 
          />
          
          {/* Icon with breathing animation */}
          <div 
            className="relative inline-block"
            style={{ animation: 'breathing 2s ease-in-out infinite' }}
          >
            <Activity className="w-16 h-16 text-purple-400" />
          </div>
          
          {/* Pulsing rings */}
          <div className="absolute inset-0 -m-4">
            <div 
              className="absolute inset-0 border-2 border-purple-400/20 rounded-full"
              style={{ animation: 'breathing 2s ease-in-out infinite' }} 
            />
            <div 
              className="absolute inset-0 border-2 border-purple-400/10 rounded-full"
              style={{ animation: 'breathing 2s ease-in-out infinite', animationDelay: '0.5s' }} 
            />
          </div>
        </div>
        
        <h2 className="mt-8 text-2xl font-bold text-white">
          Diabetes Check
        </h2>
        <p className="mt-2 text-purple-400">Loading your health dashboard...</p>
      </div>
    </div>
  );
}