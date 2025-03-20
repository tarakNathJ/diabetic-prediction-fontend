import React from 'react';
import { Scale } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useProfileStore } from '../../../store/profileStore';

export default function BMICard() {
  const { height, weight, updateProfile } = useProfileStore();
  
  // Calculate BMI: weight (kg) / (height (m))²
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  const getBMICategory = (value: number) => {
    if (value < 18.5) return { text: 'Underweight', color: 'text-blue-400' };
    if (value < 25) return { text: 'Normal', color: 'text-green-400' };
    if (value < 30) return { text: 'Overweight', color: 'text-yellow-400' };
    return { text: 'Obesity', color: 'text-red-400' };
  };

  const handleBMIChange = (newBMI: number) => {
    // Calculate new weight based on BMI and current height
    const newWeight = newBMI * (heightInMeters * heightInMeters);
    updateProfile({ weight: Math.round(newWeight) });
  };

  const percentage = Math.min(((bmi - 15) / (35 - 15)) * 100, 100);
  const category = getBMICategory(bmi);

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Scale className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">BMI</h3>
      </div>

      <div className="rounded-lg p-2 transition-colors">
        <div className="text-2xl font-bold text-white mb-4 text-center">{bmi.toFixed(1)}</div>
        
        {/* BMI Indicator */}
        <div className="relative mb-8">
          <div className="h-2 bg-gray-700/50 rounded-full">
            <div 
              className="absolute h-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {/* BMI Slider */}
          <input
            type="range"
            min="15"
            max="35"
            step="0.1"
            value={bmi}
            onChange={(e) => handleBMIChange(parseFloat(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer"
          />
          
          {/* Tick marks */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs flex-wrap">
            <div className="text-blue-400 whitespace-nowrap">15 (Underweight)</div>
            <div className="text-green-400 whitespace-nowrap">18.5</div>
            <div className="text-yellow-400 whitespace-nowrap">25</div>
            <div className="text-red-400 whitespace-nowrap">30+</div>
          </div>
        </div>

        <div className={`text-sm ${category.color} text-center mt-8`}>{category.text}</div>
      </div>
    </Card>
  );
}