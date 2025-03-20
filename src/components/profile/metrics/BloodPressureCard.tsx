import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from '../../ui/Card';
import { useProfileStore } from '../../../store/profileStore';
import { useRiskStore } from '../../../store/riskStore';

export default function HealthFeedbackCard() {
  const { bmi, glucoseLevel } = useProfileStore();
  const { hba1c } = useRiskStore();

  const getHealthIssues = () => {
    const issues = [];
    
    if (bmi >= 30) {
      issues.push({
        title: 'High BMI',
        message: 'Your BMI indicates obesity. Consider consulting a healthcare provider.',
        color: 'text-red-400',
      });
    } else if (bmi >= 25) {
      issues.push({
        title: 'Elevated BMI',
        message: 'Your BMI indicates overweight. Consider lifestyle modifications.',
        color: 'text-yellow-400',
      });
    }

    if (glucoseLevel >= 126) {
      issues.push({
        title: 'High Blood Glucose',
        message: 'Your blood glucose level is concerning. Please consult a doctor.',
        color: 'text-red-400',
      });
    } else if (glucoseLevel >= 100) {
      issues.push({
        title: 'Elevated Blood Glucose',
        message: 'Your blood glucose level is higher than normal.',
        color: 'text-yellow-400',
      });
    }

    if (hba1c >= 6.5) {
      issues.push({
        title: 'High HbA1c',
        message: 'Your HbA1c level indicates potential diabetes.',
        color: 'text-red-400',
      });
    } else if (hba1c >= 5.7) {
      issues.push({
        title: 'Elevated HbA1c',
        message: 'Your HbA1c level indicates pre-diabetes risk.',
        color: 'text-yellow-400',
      });
    }

    return issues;
  };

  const issues = getHealthIssues();

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-4">
        <AlertTriangle className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-medium text-white">Health Insights</h3>
      </div>

      {issues.length > 0 ? (
        <div className="space-y-4">
          {issues.map((issue, index) => (
            <div
              key={index}
              className="p-4 rounded-lg bg-gray-800/50 border border-gray-700"
            >
              <h4 className={`font-medium mb-2 ${issue.color}`}>{issue.title}</h4>
              <p className="text-gray-400 text-sm">{issue.message}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-4">
          <p className="text-green-400">All your health metrics look good!</p>
          <p className="text-sm text-gray-400 mt-2">
            Keep maintaining your healthy lifestyle.
          </p>
        </div>
      )}
    </Card>
  );
}