import React from 'react';
import { useRiskStore } from '../../store/riskStore';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export default function RiskResult() {
  const { XgBoost, Randomforest, resetAssessment } = useRiskStore();

  const getRiskLevel = () => {
    if ((XgBoost == "Diabetic" && Randomforest == "Diabetic") || (parseFloat(XgBoost) > 60)) return { level: 'High', color: 'text-red-400', bg: 'bg-red-400/10' };
    if ((XgBoost != Randomforest) || (parseFloat(XgBoost) > 40 && parseFloat(XgBoost) <= 60)) return { level: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
    return { level: 'Low', color: 'text-green-400', bg: 'bg-green-400/10' };
  };

  const riskInfo = getRiskLevel();
  let ShowResult = "Not Diabetic"
  if (XgBoost == "Not Diabetic" && Randomforest == "Not Diabetic") {
    ShowResult = "Not Diabetic";
  } else {
    ShowResult = XgBoost;
  }

  return (
    <div className="space-y-8">
      <div className={`p-8 rounded-2xl ${riskInfo.bg} text-center`}>
        <h2 className={`text-4xl font-bold ${riskInfo.color} mb-4`}>
          {riskInfo.level} Risk
        </h2>
        <div className="text-2xl text-white mb-6">
          {ShowResult}
        </div>
        <div className="flex justify-center gap-2">
          {ShowResult == "Diabetic" ? (
            <AlertTriangle className="w-6 h-6 text-red-400" />
          ) : (
            <CheckCircle className="w-6 h-6 text-green-400" />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Recommendations</h3>
        <ul className="space-y-3 text-gray-300">
          {((ShowResult == "Diabetic") ||(parseFloat(XgBoost) > 60 ) )&&(
            <>
              <li>• Consult a healthcare provider immediately</li>
              <li>• Monitor blood glucose levels regularly</li>
              <li>• Make immediate lifestyle changes</li>
            </>
          )}

          {((parseFloat(XgBoost) <= 60 ) ||(parseFloat(XgBoost) >= 40 ) )&&(
            <>
              <li>• Schedule a check-up with your doctor</li>
              <li>• Review your diet and exercise routine</li>
              <li>• Consider regular blood sugar monitoring</li>
            </>
            )
          }
          
          {((ShowResult == "Not Diabetic") ||(parseFloat(XgBoost) < 40)) && (
            <>
              <li>• Maintain your healthy lifestyle</li>
              <li>• Continue regular exercise</li>
              <li>• Have annual health check-ups</li>
            </>
          )}

        </ul>
      </div>

      <button
        onClick={resetAssessment}
        className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-4 px-6 rounded-xl transition-colors"
      >
        <RefreshCw className="w-5 h-5" />
        Take Assessment Again
      </button>
    </div>
  );
}