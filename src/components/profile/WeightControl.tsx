import React from 'react';

interface WeightControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function WeightControl({ value, onChange }: WeightControlProps) {
  const min = 40;
  const max = 120;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative bg-gray-800/50 p-6 rounded-2xl">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Weight</h3>
      
      {/* Weight meter */}
      <div className="relative h-48 w-16 mx-auto mb-4">
        {/* Meter background */}
        <div className="absolute inset-0 bg-gray-700/30 rounded-full overflow-hidden">
          {/* Meter fill */}
          <div 
            className="absolute bottom-0 w-full bg-gradient-to-t from-purple-600 to-purple-400/50 transition-all duration-300 rounded-b-full"
            style={{ height: `${percentage}%` }}
          />
          
          {/* Measurement lines */}
          <div className="absolute inset-0 flex flex-col justify-between py-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center w-full gap-1">
                <div className="w-3 h-px bg-gray-500" />
                <span className="text-xs text-gray-500">
                  {Math.round(max - (i * (max - min) / 5))}
                </span>
              </div>
            ))}
          </div>
          
          {/* Current value indicator */}
          <div 
            className="absolute left-0 w-full h-1 bg-white shadow-lg transition-all duration-300"
            style={{ bottom: `${percentage}%` }}
          >
            <div className="absolute right-0 w-4 h-4 bg-white rounded-full -translate-y-1.5 translate-x-2 shadow-lg" />
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
        
        {/* Hidden input for functionality */}
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
        <span className="ml-2 text-gray-400">kg</span>
      </div>
    </div>
  );
}