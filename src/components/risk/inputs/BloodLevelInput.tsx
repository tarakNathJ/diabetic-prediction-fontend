import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Activity, Calculator, X, AlertCircle } from 'lucide-react';
import { useRiskStore } from '../../../store/riskStore';
import { useProfileStore } from '../../../store/profileStore';

interface BloodLevelInputProps {
  title: string;
  description: string;
  name: 'hba1c' | 'glucose';
  unit: string;
  min: number;
  max: number;
  step: number;
}

export default function BloodLevelInput({
  title,
  description,
  name,
  unit,
  min,
  max,
  step,
}: BloodLevelInputProps) {
  const { [name]: value, setBloodLevel, calculateHbA1c } = useRiskStore();
  const { updateProfile } = useProfileStore();
  const [showCalculator, setShowCalculator] = useState(false);
  const [glucoseInput, setGlucoseInput] = useState('');
  const [calculatedHbA1c, setCalculatedHbA1c] = useState<number | null>(null);
  const [animationOrigin, setAnimationOrigin] = useState({ x: 0, y: 0 });

  const handleChange = (newValue: number) => {
    if (name === 'glucose') {
      setBloodLevel(name, newValue);
      updateProfile({ glucoseLevel: newValue });
    } else {
      setBloodLevel(name, newValue);
    }
  };

  const handleCalculate = () => {
    const glucose = parseFloat(glucoseInput);
    if (!isNaN(glucose)) {
      const hba1c = calculateHbA1c(glucose);
      setCalculatedHbA1c(hba1c);
    }
  };

  const handleApplyHbA1c = () => {
    if (calculatedHbA1c !== null) {
      setBloodLevel('hba1c', calculatedHbA1c);
    }
    setShowCalculator(false);
    setGlucoseInput('');
    setCalculatedHbA1c(null);
  };

  const handleCalculatorOpen = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setAnimationOrigin({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setShowCalculator(true);
  };

  // Use actual max value for glucose
  const actualMax = name === 'glucose' ? 300 : max;
  const percentage = ((value - min) / (actualMax - min)) * 100;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <Activity className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">{title}</h3>
      </div>
      <p className="text-gray-400 mb-6">{description}</p>

      <div className="space-y-6">
        <div className="text-2xl font-bold text-white text-center">
          {value.toFixed(name === 'hba1c' ? 1 : 0)} {unit}
        </div>

        <div className="relative h-24 bg-gray-800/30 rounded-lg overflow-hidden">
          <div
            className="absolute inset-x-0 bottom-0 transition-all duration-500"
            style={{ height: `${percentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent">
              <div className="absolute inset-0 glucose-wave" />
              <div className="absolute inset-0 glucose-wave" style={{ animationDelay: '-2s' }} />
            </div>
          </div>

          <div className="absolute inset-y-2 right-0 w-8 flex flex-col justify-between">
            {[actualMax, (actualMax + min) / 2, min].map((val) => (
              <div key={val} className="flex items-center gap-1">
                <div className="w-2 h-px bg-gray-500" />
                <span className="text-xs text-gray-500">
                  {val.toFixed(name === 'hba1c' ? 1 : 0)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Section */}
        <div className="space-y-8">
          <div className="relative">
            <div className="h-2 bg-gray-700/50 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-600/50 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <input
              type="range"
              min={min}
              max={actualMax}
              step={step}
              value={value}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer"
            />
          </div>

          {name === 'hba1c' && (
            <button
              type="button"
              onClick={handleCalculatorOpen}
              className="group w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600/10 to-purple-600/20 hover:from-purple-600/20 hover:to-purple-600/30 border border-purple-500/20 hover:border-purple-500/30 text-gray-300 flex items-center justify-between transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-600/20 group-hover:bg-purple-600/30 transition-colors">
                  <Calculator className="w-4 h-4 text-purple-400" />
                </div>
                <span>Don't know your HbA1c?</span>
              </div>
              <span className="text-purple-400 group-hover:translate-x-1 transition-transform">
                Calculate →
              </span>
            </button>
          )}
        </div>
      </div>

      {showCalculator &&
        ReactDOM.createPortal(
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setShowCalculator(false)}
          >
            <div
              className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl w-full max-w-md sm:max-w-lg max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/10"
              style={{
                animation: 'modalEnter 0.3s ease-out forwards',
                transformOrigin: `${animationOrigin.x}px ${animationOrigin.y}px`,
                zIndex: 10000,
              }}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-6 border-b border-gray-700/50 relative">
                <button
                  onClick={() => setShowCalculator(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h3 className="text-lg sm:text-xl font-semibold text-white">HbA1c Calculator</h3>
                <p className="text-gray-400 mt-2 text-sm">
                  Estimate your HbA1c based on average blood glucose level
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-6">
                <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-500/20">
                  <div className="flex gap-3">
                    <div className="p-2 rounded-lg bg-purple-600/20 shrink-0">
                      <AlertCircle className="w-5 h-5 text-purple-400" />
                    </div>
                    <p className="text-sm text-gray-300">
                      This calculator provides an estimate only. For accurate results, please consult with a healthcare professional.
                    </p>
                  </div>
                </div>

                <div>
                  <label htmlFor="glucose" className="block text-sm font-medium text-gray-300 mb-2">
                    Average Blood Glucose Level
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="glucose"
                      value={glucoseInput}
                      onChange={(e) => setGlucoseInput(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-shadow"
                      placeholder="Enter value"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      mg/dL
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCalculate}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate HbA1c
                </button>

                {calculatedHbA1c !== null && (
                  <div className="rounded-xl bg-gradient-to-b from-gray-800 to-gray-800/50 border border-purple-500/20 overflow-hidden animate-fadeIn">
                    <div className="p-4 border-b border-gray-700/50">
                      <p className="text-gray-300 text-sm">Estimated HbA1c</p>
                      <div className="text-3xl font-bold text-white mt-1">
                        {calculatedHbA1c.toFixed(1)}%
                      </div>
                    </div>
                    <div className="p-4">
                      <button
                        type="button"
                        onClick={handleApplyHbA1c}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        Use This Value
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 border-t border-gray-700/50 bg-gray-800/50">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm text-gray-400">
                  <span className="font-medium">Formula:</span>
                  <div>
                    HbA1c = (Average Glucose + 46.7) / 28.7
                    <br />
                    <span className="text-xs opacity-75">
                      This is an estimated calculation and should not replace professional medical tests.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}