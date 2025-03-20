import React, { useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { useRiskStore } from '../../../store/riskStore';
import { useProfileStore } from '../../../store/profileStore';

export default function AgeInput() {
  const { setAge } = useRiskStore();
  const { age, updateProfile } = useProfileStore();

  // Sync with risk store whenever profile age changes
  useEffect(() => {
    setAge(age);
  }, [age, setAge]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">Age</h3>
      </div>
      
      <div className="space-y-4">
        <input
          type="range"
          min="1"
          max="100"
          value={age}
          onChange={(e) => updateProfile({ age: Number(e.target.value) })}
          className="w-full h-2 bg-gray-700/50 rounded-full appearance-none cursor-pointer"
        />
        
        <div className="flex justify-between text-sm text-gray-400">
          <span>1</span>
          <div className="text-center">
            <span className="block text-2xl font-bold text-white">{age}</span>
            <span className="text-sm text-gray-400">years old</span>
          </div>
          <span>100</span>
        </div>
      </div>
    </div>
  );
}