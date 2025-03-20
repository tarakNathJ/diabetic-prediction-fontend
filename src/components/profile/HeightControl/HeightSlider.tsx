import React from 'react';

interface HeightSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export default function HeightSlider({ value, onChange }: HeightSliderProps) {
  const min = 140;
  const max = 220;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative mt-4">
      {/* Track */}
      <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
        {/* Fill */}
        <div 
          className="h-full bg-gradient-to-r from-purple-600/50 to-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Slider thumb */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg cursor-grab transition-all duration-300"
        style={{ left: `${percentage}%`, transform: `translate(-50%, -50%)` }}
      />
      
      {/* Tick marks */}
      <div className="absolute top-full left-0 right-0 flex justify-between px-2 mt-2">
        {[min, min + 20, min + 40, min + 60, max].map((tick) => (
          <div key={tick} className="flex flex-col items-center">
            <div className="w-px h-2 bg-gray-600" />
            <span className="text-xs text-gray-400 mt-1">{tick}</span>
          </div>
        ))}
      </div>
      
      {/* Hidden range input */}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
      />
    </div>
  );
}