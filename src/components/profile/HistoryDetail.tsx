import React from 'react';
import { Card } from '../ui/Card';


interface HistoryDetailProps {
  record: {
    _id:string
    updatedAt: number;
    XgBoost: string;
    bmi: number;
    blood_glucose_level: number;
    age: number;
    Hba1c: number;
    UserID:string;
    Randomforest:string;
    hypertension:number;
    heart_disease:number;
    createdAt:number; 
    __v:number
  };
  onBack: () => void; // Add the onBack function prop
}


// Mock data for trends (in a real app, this would come from your backend)
const mockTrendData = [
  { date: '2024-01-15', weight: 73, glucose: 100, bmi: 25.5, hba1c: 5.9 },
  { date: '2024-02-01', weight: 72, glucose: 98, bmi: 25.2, hba1c: 5.8 },
  { date: '2024-02-15', weight: 71, glucose: 97, bmi: 24.8, hba1c: 5.7 },
  { date: '2024-03-01', weight: 70, glucose: 95, bmi: 24.5, hba1c: 5.6 },
 
];

interface SimpleChartProps {
  data: typeof mockTrendData;
  dataKey: 'weight' | 'glucose' | 'bmi' | 'hba1c';
  color: string;
  label: string;
  unit?: string;
}

function SimpleChart({ data, dataKey, color, label, unit = '' }: SimpleChartProps) {

  const values = data.map(d => d[dataKey]);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min;

  const getY = (value: number) => {
    return 160 - ((value - min) / range) * 140;
  };

  const points = data.map((d, i) => ({
    x: 40 + (i * 160),
    y: getY(d[dataKey]),
    value: d[dataKey],
    date: d.date
  }));

  const pathD = points.map((p, i) => 
    (i === 0 ? 'M' : 'L') + `${p.x},${p.y}`
  ).join(' ');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="relative h-48 w-full overflow-hidden">
      <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 1, 2, 3].map(i => (
          <line
            key={i}
            x1="40"
            y1={20 + (i * 46.67)}
            x2="560"
            y2={20 + (i * 46.67)}
            stroke="#374151"
            strokeDasharray="4,4"
          />
        ))}

        {/* Y-axis labels */}
        {[max, min + (range * 2/3), min + (range/3), min].map((value, i) => (
          <text
            key={i}
            x="30"
            y={25 + (i * 46.67)}
            className="text-xs fill-gray-400"
            textAnchor="end"
          >
            {value.toFixed(1)}
          </text>
        ))}

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2"
          className="transition-all duration-300"
        />

        {/* Data points and labels */}
        {points.map((point, i) => (
          <g key={i} className="group">
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              fill={color}
              className="transition-all duration-300"
            />
            
            {/* Tooltip */}
            <g className="opacity-0 group-hover:opacity-100 transition-opacity">
              <rect
                x={point.x - 40}
                y={point.y - 40}
                width="80"
                height="30"
                rx="4"
                fill="#1F2937"
                className="transition-all duration-300"
              />
              <text
                x={point.x}
                y={point.y - 20}
                textAnchor="middle"
                className="text-xs fill-white"
              >
                {`${point.value}${unit}`}
              </text>
            </g>

            {/* Date labels */}
            <text
              x={point.x}
              y="180"
              textAnchor="middle"
              className="text-xs fill-gray-400"
            >
              {formatDate(point.date)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function HistoryDetail({ record }: any) {
  const getRiskColor = (Prediction:string ) => {
    if (Prediction == "Diabetic") return 'from-red-500/20 to-red-500/10';
    return 'from-green-500/20 to-green-500/10';
  };

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Summary Card */}
      <div className={`rounded-2xl bg-gradient-to-b ${getRiskColor(record.XgBoost)} p-4 border border-white/5`}>
        <div className="text-sm text-gray-400">
          {new Date(record.updatedAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
        <div className="mt-2 text-2xl font-bold text-white">
          {(record.XgBoost)}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="bg-gray-900/30 rounded-xl p-3">
            <div className="text-sm text-gray-400">BMI</div>
            <div className="text-lg font-medium text-white">{record.bmi}</div>
          </div>
          <div className="bg-gray-900/30 rounded-xl p-3">
            <div className="text-sm text-gray-400">Glucose</div>
            <div className="text-lg font-medium text-white">{record.blood_glucose_level} <span className="text-sm">mg/dL</span></div>
          </div>
          <div className="bg-gray-900/30 rounded-xl p-3">
            <div className="text-sm text-gray-400">Age</div>
            <div className="text-lg font-medium text-white">{record.age} <span className="text-sm">Year</span></div>
          </div>
          <div className="bg-gray-900/30 rounded-xl p-3">
            <div className="text-sm text-gray-400">HbA1c</div>
            <div className="text-lg font-medium text-white">{record.Hba1c}%</div>
          </div>
        </div>
      </div>

      {/* Trend Charts */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="p-4">
          <h4 className="text-lg font-medium text-white mb-4">Weight Trend</h4>
          <SimpleChart
            data={mockTrendData}
            dataKey="weight"
            color="#8B5CF6"
            label="Weight"
            unit=" kg"
          />
        </Card>

        <Card className="p-4">
          <h4 className="text-lg font-medium text-white mb-4">Blood Glucose Trend</h4>
          <SimpleChart
            data={mockTrendData}
            dataKey="glucose"
            color="#EC4899"
            label="Glucose"
            unit=" mg/dL"
          />
        </Card>

        <Card className="p-4">
          <h4 className="text-lg font-medium text-white mb-4">BMI Trend</h4>
          <SimpleChart
            data={mockTrendData}
            dataKey="bmi"
            color="#10B981"
            label="BMI"
          />
        </Card>

        <Card className="p-4">
          <h4 className="text-lg font-medium text-white mb-4">HbA1c Trend</h4>
          <SimpleChart
            data={mockTrendData}
            dataKey="hba1c"
            color="#F59E0B"
            label="HbA1c"
            unit="%"
          />
        </Card>
      </div>
    </div>
  );
}