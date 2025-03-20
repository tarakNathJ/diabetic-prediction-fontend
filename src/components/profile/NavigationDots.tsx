import React from 'react';

interface NavigationDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

export default function NavigationDots({ total, current, onChange }: NavigationDotsProps) {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === current ? 'bg-purple-600 w-4' : 'bg-gray-600 hover:bg-purple-400'
          }`}
        />
      ))}
    </div>
  );
}