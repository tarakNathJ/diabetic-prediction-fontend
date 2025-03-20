import React from 'react';
import HeightHologram from './HeightHologram';
import HeightSlider from './HeightSlider';
import HeightDisplay from './HeightDisplay';

interface HeightControlProps {
  value: number;
  onChange: (value: number) => void;
}

export default function HeightControl({ value, onChange }: HeightControlProps) {
  return (
    <div className="relative bg-gray-800/50 p-6 rounded-2xl">
      <h3 className="text-sm font-medium text-gray-400 mb-2">Height</h3>
      <HeightHologram height={value} />
      <HeightSlider value={value} onChange={onChange} />
      <HeightDisplay value={value} />
    </div>
  );
}