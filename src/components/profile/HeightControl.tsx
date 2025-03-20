import React from 'react';

interface HeightControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function HeightControl({ value, onChange }: HeightControlProps) {
  const min = 140;
  const max = 220;
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Convert cm to feet (1 cm = 0.0328084 feet)
  const heightInFeet = (value * 0.0328084).toFixed(1);

  return (
    <div className="relative bg-gray-800/50 p-6 rounded-2xl">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Height</h3>
      
      {/* Height meter */}
      <div className="relative h-48 flex items-center justify-center mb-6">
        {/* Vertical bar */}
        <div className="relative w-4 h-full bg-gray-700/30 rounded-full overflow-hidden">
          <div 
            className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400/50 transition-all duration-300 rounded-b-full"
            style={{ height: `${percentage}%` }}
          />
        </div>
        
        {/* Height measurement in feet */}
        <div className="absolute right-0 inset-y-0 flex flex-col justify-between py-4 pl-6">
          {[...Array(6)].map((_, i) => {
            const heightCm = max - (i * (max - min) / 5);
            const heightFt = (heightCm * 0.0328084).toFixed(1);
            return (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-px bg-gray-500" />
                <span className="text-xs text-gray-500">{heightFt}ft</span>
              </div>
            );
          })}
        </div>
        
        {/* Current height indicator */}
        <div 
          className="absolute left-0 w-4 h-1 bg-white shadow-lg transition-all duration-300"
          style={{ bottom: `${percentage}%` }}
        >
          <div className="absolute left-full ml-2 -translate-y-1/2 bg-purple-600/20 px-2 py-1 rounded-lg">
            <span className="text-sm font-medium text-white">{heightInFeet}ft</span>
          </div>
        </div>
      </div>
      
      {/* Slider */}
      <div className="relative">
        <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-600/50 to-purple-600 rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        {/* Tick marks */}
        <div className="absolute top-full left-0 right-0 flex justify-between px-2 mt-2">
          {[min, min + 20, min + 40, min + 60, max].map((tick) => (
            <div key={tick} className="flex flex-col items-center">
              <div className="w-px h-2 bg-gray-600" />
              <span className="text-xs text-gray-400 mt-1">{tick}</span>
            </div>
          ))}
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
      </div>
      
      {/* Value display */}
      <div className="mt-8 text-center">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="ml-2 text-gray-400">cm</span>
      </div>
    </div>
  );
}