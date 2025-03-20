import React from 'react';

interface HeightDisplayProps {
  value: number;
}

export default function HeightDisplay({ value }: HeightDisplayProps) {
  return (
    <div className="mt-8 text-center">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="ml-2 text-gray-400">cm</span>
    </div>
  );
}