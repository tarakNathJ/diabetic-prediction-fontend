import React from 'react';
import { Container } from '../ui/Container';
import RiskForm from './RiskForm';
import RiskResult from './RiskResult';
import { useRiskStore } from '../../store/riskStore';
import { useSelector } from 'react-redux';

export default function RiskAssessment() {
  const UserData = useSelector((state: any) => state.ProfileData)
  if (Object.keys(UserData.data).length == 0) {
    window.location.href = '/login';
  }
  const { showResult } = useRiskStore();

  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6">Diabetes Risk Assessment</h1>
          <p className="text-gray-400 mb-8">
            Complete this assessment to understand your risk factors for diabetes.
            Your responses will help create a personalized risk profile.
          </p>
          {showResult ? <RiskResult /> : <RiskForm />}
        </div>
      </Container>
    </div>
  );
}