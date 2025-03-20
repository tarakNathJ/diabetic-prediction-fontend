import React, { useState } from 'react';
import GenderSelector from './GenderSelector';
import WeightControl from './WeightControl';
import HeightControl from './HeightControl';
import PredictionHistory from './PredictionHistory';
import { Card } from '../ui/Card';
import { History } from 'lucide-react';
import { useProfileStore } from '../../store/profileStore';

export default function ProfileInputs() {
  const { gender, height, weight, updateProfile } = useProfileStore();
  const [showHistory, setShowHistory] = useState(false);

  const handleHeightChange = (value: number) => {
    updateProfile({ height: value });
  };

  const handleWeightChange = (value: number) => {
    updateProfile({ weight: value });
  };

  const handleGenderChange = (value: 'male' | 'female') => {
    updateProfile({ gender: value });
  };

  return (
    <Card className="p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex-1">
          <GenderSelector value={gender} onChange={handleGenderChange} />
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full sm:w-auto px-4 py-3 sm:p-3 rounded-full bg-purple-600/20 hover:bg-purple-600/30 transition-colors text-purple-400 hover:text-purple-300 flex items-center justify-center gap-2"
          title="View Prediction History"
        >
          <History className="h-6 w-6" />
          <span className="sm:hidden">View History</span>
        </button>
      </div>
      
      {showHistory ? (
        <div className="fixed inset-0 z-50 bg-gray-900/95 sm:relative sm:bg-transparent sm:z-auto overflow-y-auto">
          <div className="min-h-screen sm:min-h-0 p-4 sm:p-0">
            <PredictionHistory onClose={() => setShowHistory(false)} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <WeightControl value={weight} onChange={handleWeightChange} />
          <HeightControl value={height} onChange={handleHeightChange} />
        </div>
      )}
    </Card>
  );
}