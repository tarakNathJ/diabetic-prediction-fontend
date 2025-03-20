import React from 'react';
import { Calendar } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useProfileStore } from '../../../store/profileStore';

export default function AgeCard() {
  const { age, updateProfile } = useProfileStore();

  const getAgeCategory = (value: number) => {
    if (value < 12) return { text: 'Child', color: 'text-blue-400' };
    if (value < 20) return { text: 'Teenager', color: 'text-green-400' };
    if (value < 45) return { text: 'Adult', color: 'text-blue-400' };
    if (value < 60) return { text: 'Middle Age', color: 'text-yellow-400' };
    return { text: 'Senior', color: 'text-red-400' };
  };

  const category = getAgeCategory(age);
  const percentage = ((age - 1) / (100 - 1)) * 100;

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Calendar className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">Age</h3>
      </div>
      
      <div className="space-y-6">
        <div className="text-2xl font-bold text-white text-center">
          {age} years
        </div>

        {/* Age Slider */}
        <div className="space-y-4">
          <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-gradient-to-r from-green-400 via-blue-400 via-yellow-400 to-red-400 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {/* Age Labels */}
          <div className="flex justify-between text-sm text-gray-400">
            <span>1</span>
            <span>25</span>
            <span>50</span>
            <span>75</span>
            <span>100</span>
          </div>
        </div>

        {/* Hidden Range Input */}
        <input
          type="range"
          min="1"
          max="100"
          value={age}
          onChange={(e) => updateProfile({ age: Number(e.target.value) })}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {/* Age Category */}
        <div className={`text-sm text-center ${category.color}`}>
          {category.text}
        </div>
      </div>
    </Card>
  );
}