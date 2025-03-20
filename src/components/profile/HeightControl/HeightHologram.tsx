import React from 'react';

interface HeightHologramProps {
  height: number;
}

export default function HeightHologram({ height }: HeightHologramProps) {
  const scale = height / 170;
  
  return (
    <div className="relative w-full h-64">
      <div 
        className="absolute left-1/2 bottom-0 transform -translate-x-1/2 w-24 transition-transform duration-300"
        style={{ transform: `translate(-50%) scale(${scale})` }}
      >
        <div className="relative">
          <div className="absolute bottom-0 left-1/2 w-16 h-2 bg-purple-500/30 rounded-full blur-md transform -translate-x-1/2" />
          
          <div className="relative z-10 w-full h-48 bg-gradient-to-t from-purple-500/40 to-transparent 
                        backdrop-blur-sm rounded-full transform hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            
            <div className="absolute inset-0 overflow-hidden rounded-full">
              <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-purple-400/20 to-transparent" />
            </div>
            
            <div className="absolute left-0 w-full h-full flex flex-col justify-between py-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-full h-px bg-purple-400/30" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}