import React from 'react';

interface WeightMeterProps {
  value: number;
  min: number;
  max: number;
}

export default function WeightMeter({ value, min, max }: WeightMeterProps) {
  const percentage = ((value - min) / (max - min)) * 100;
  
  return (
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
  );
}