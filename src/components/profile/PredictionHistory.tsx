import React, { useState } from 'react';
import { X, TrendingDown, TrendingUp, ChevronRight, ArrowLeft, Signal } from 'lucide-react';
import { Card } from '../ui/Card';
import HistoryDetail from './HistoryDetail';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { any } from 'zod';


interface PredictionRecord {
  id: string;
  date: string;
  risk: number;
  bmi: number;
  glucose: number;
  weight: number;
  hba1c: number;
  trend: 'up' | 'down' | 'stable';
}

// HistoryDetail.tsx
interface HistoryDetailProps {
  record: {
    updatedAt: string;
    XgBoost: string;
    bmi: number;
    blood_glucose_level: number;
    age: number;
    Hba1c: number;
  };
  onBack: () => void; // Add the onBack function prop
}

const mockHistory: PredictionRecord[] = [
  {
    id: '1',
    date: new Date().toISOString(),
    risk: 0.35,
    bmi: 24.5,
    glucose: 95,
    weight: 70,
    hba1c: 5.6,
    trend: 'down',
  },
  {
    id: '2',
    date: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    risk: 0.42,
    bmi: 25.1,
    glucose: 98,
    weight: 72,
    hba1c: 5.8,
    trend: 'up',
  },
  {
    id: '3',
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    risk: 0.38,
    bmi: 24.8,
    glucose: 97,
    weight: 71,
    hba1c: 5.7,
    trend: 'stable',
  },
];

interface PredictionHistoryProps {
  onClose: () => void;
}

export default function PredictionHistory({ onClose }: PredictionHistoryProps) {
  const [selectedRecord, setSelectedRecord] = useState<PredictionRecord | null>(null);
  const UserID = useSelector((state: any) => state.Resullt);
   
  const formatTimeAgo = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getRiskColor = (risk: number) => {
    if (risk >= 0.7) return 'from-red-500/20 to-red-500/10';
    if (risk >= 0.3) return 'from-yellow-500/20 to-yellow-500/10';
    return 'from-green-500/20 to-green-500/10';
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md sm:relative sm:bg-transparent sm:backdrop-blur-none">
      <div className="flex flex-col h-full sm:h-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800/50 backdrop-blur-md border-b border-gray-700/50">
          <div className="flex items-center gap-3">
            {selectedRecord ? (
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 -ml-2 hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-400" />
              </button>
            ) : (
              <button
                onClick={onClose}
                className="p-2 -ml-2 hover:bg-gray-700/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            )}
            <h3 className="text-lg font-semibold text-white">
              {selectedRecord ? 'Prediction Details' : 'Prediction History'}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-4">
            {selectedRecord ? (
              <HistoryDetail record ={selectedRecord} onBack={() => setSelectedRecord(null)} />
            ) : (
              UserID.data.length != 0&& UserID.data.map((record:any) => (
                <div
                  key={record._id}
                  className="group animate-fadeIn"
                  onClick={() => setSelectedRecord(record)}
                >
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b ${getRiskColor(record.XgBoost)} p-4 border border-white/5`}>
                    {/* Top Section */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm text-gray-400">{formatTimeAgo(record.updatedAt)}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(record.updatedAt).toLocaleString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-900/30 rounded-full px-3 py-1">
                        <span className="text-lg font-semibold text-white">
                          {record.XgBoost}
                        </span>
                        {record.XgBoost == "Diabetic" && <TrendingUp className="w-4 h-4 text-red-400" />}
                        {record.XgBoost == "Not Diabetic" && <TrendingDown className="w-4 h-4 text-green-400" />}
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-900/30 rounded-xl p-3">
                        <div className="text-sm text-gray-400 mb-1">BMI</div>
                        <div className="text-lg font-medium text-white">{record.bmi}</div>
                      </div>
                      <div className="bg-gray-900/30 rounded-xl p-3">
                        <div className="text-sm text-gray-400 mb-1">Glucose</div>
                        <div className="text-lg font-medium text-white">{record.blood_glucose_level} <span className="text-sm">mg/dL</span></div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {/* <div className="relative h-1 bg-gray-700/30 rounded-full overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-white/20 rounded-full transition-all duration-500"
                        style={{ width: `${record.risk * 100}%` }}
                      />
                    </div> */}

                    {/* View Details Button */}
                    <button className="w-full mt-4 py-2 px-4 rounded-xl bg-gray-900/30 text-gray-300 flex items-center justify-center gap-2 group-hover:bg-gray-900/50 transition-colors">
                      <span>View Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl -mr-16 -mt-16" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-2xl -ml-12 -mb-12" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
