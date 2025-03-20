import React from 'react';
import { Scale } from 'lucide-react';
import { useRiskStore } from '../../../store/riskStore';
import { useProfileStore } from '../../../store/profileStore';
import { useEffect } from 'react';

export default function BMIInput() {
  const { setBMI } = useRiskStore();
  const { height, weight, updateProfile } = useProfileStore();

  // Calculate BMI from height and weight
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  // Update risk store whenever height or weight changes
  useEffect(() => {
    setBMI(bmi);
  }, [height, weight, setBMI]);

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

  const category = getBMICategory(bmi);
  const percentage = Math.min(((bmi - 15) / (35 - 15)) * 100, 100);

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Scale className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">Body Mass Index (BMI)</h3>
      </div>

      <div className="space-y-6">
        <div className="text-2xl font-bold text-white text-center">
          {bmi.toFixed(1)}
        </div>

        <div className="relative mb-8">
          <div className="h-2 bg-gray-700/50 rounded-full">
            <div
              className="absolute h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full transition-all"
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

          {/* Category labels */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs flex-wrap">
            <div className="text-blue-400 whitespace-nowrap">15 (Underweight)</div>
            <div className="text-green-400 whitespace-nowrap">18.5</div>
            <div className="text-yellow-400 whitespace-nowrap">25</div>
            <div className="text-red-400 whitespace-nowrap">30+</div>
          </div>
        </div>

        <div className={`text-center ${category.color}`}>
          {category.text}
        </div>
      </div>
    </div>
  );
}