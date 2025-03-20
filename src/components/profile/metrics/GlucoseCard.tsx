import React from 'react';
import { Activity } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useProfileStore } from '../../../store/profileStore';

export default function GlucoseCard() {
  const { glucoseLevel, updateProfile } = useProfileStore();

  const getGlucoseStatus = (value: number) => {
    if (value < 70) return { text: 'Low', color: 'text-blue-400' };
    if (value < 100) return { text: 'Normal', color: 'text-green-400' };
    if (value < 126) return { text: 'Pre-diabetes', color: 'text-yellow-400' };
    return { text: 'Diabetes', color: 'text-red-400' };
  };

  const status = getGlucoseStatus(glucoseLevel);
  const percentage = ((glucoseLevel - 40) / (300 - 40)) * 100;

  return (
    <Card className="p-6 bg-[#1a1a2e] rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <Activity className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">Blood Glucose</h3>
      </div>

      <div className="cursor-pointer p-2">
        <div className="text-2xl font-bold text-white mb-2">{glucoseLevel} mg/dL</div>

        {/* Glucose Meter */}
        <div className="relative h-24 mb-6 bg-gray-800/30 rounded-lg overflow-hidden">
          <div 
            className="absolute inset-x-0 bottom-0 transition-all duration-500"
            style={{ height: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent">
              <div className="absolute inset-0 glucose-wave" />
              <div className="absolute inset-0 glucose-wave" style={{ animationDelay: '-2s' }} />
            </div>
          </div>

          {/* Measurement lines */}
          <div className="absolute inset-y-2 right-0 w-8 flex flex-col justify-between">
            {[300, 200, 100, 40].map((value) => (
              <div key={value} className="flex items-center gap-1">
                <div className="w-2 h-px bg-gray-500" />
                <span className="text-xs text-gray-500">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SLIDER */}
        <div className="relative flex flex-col items-center">
          <input
            type="range"
            min="40"
            max="300"
            value={glucoseLevel}
            onChange={(e) => updateProfile({ glucoseLevel: Number(e.target.value) })}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            style={{
              accentColor: status.color.replace('text-', ''),
            }}
          />

          {/* Status below slider */}
          <div className={`mt-2 ${status.color} text-sm font-medium`}>
            {status.text}
          </div>
        </div>
      </div>
    </Card>
  );
}
