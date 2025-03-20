import React from 'react';
import { useRiskStore } from '../../../store/riskStore';
import { CheckCircle2, XCircle } from 'lucide-react';

interface BinaryInputProps {
  title: string;
  description: string;
  name: 'hypertension' | 'heartDisease';
}

export default function BinaryInput({ title, description, name }: BinaryInputProps) {
  const { [name]: value, setBinaryValue } = useRiskStore();

  return (
    <div>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setBinaryValue(name, true)}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
            value
              ? 'border-green-500 bg-green-500/10 text-green-400'
              : 'border-gray-700 hover:border-green-500/50'
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>Yes</span>
        </button>
        
        <button
          type="button"
          onClick={() => setBinaryValue(name, false)}
          className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
            value === false
              ? 'border-red-500 bg-red-500/10 text-red-400'
              : 'border-gray-700 hover:border-red-500/50'
          }`}
        >
          <XCircle className="w-5 h-5" />
          <span>No</span>
        </button>
      </div>
    </div>
  );
}