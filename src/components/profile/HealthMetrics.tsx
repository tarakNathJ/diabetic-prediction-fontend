import React from 'react';
import AgeCard from './metrics/AgeCard';
import BMICard from './metrics/BMICard';
import BloodPressureCard from './metrics/BloodPressureCard';
import GlucoseCard from './metrics/GlucoseCard';

export default function HealthMetrics() {
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <AgeCard />
      <BMICard />
      <BloodPressureCard />
      <GlucoseCard />
    </div>
  );
}