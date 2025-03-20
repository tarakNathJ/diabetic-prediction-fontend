import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ConfirmButtonProps {
  onClick: () => void;
}

export default function ConfirmButton({ onClick }: ConfirmButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
    >
      <span>Continue</span>
      <ArrowRight className="h-5 w-5" />
    </button>
  );
}