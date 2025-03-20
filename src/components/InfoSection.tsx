import React from 'react';
import { Heart, Activity, AlertCircle } from 'lucide-react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function InfoCard({ icon, title, description }: InfoCardProps) {
  return (
    <div className="pt-6">
      <Card>
        <div className="-mt-6">
          <div className="inline-flex items-center justify-center p-3 bg-purple-600 rounded-md shadow-lg">
            {icon}
          </div>
          <h3 className="mt-8 text-lg font-medium text-white">{title}</h3>
          <p className="mt-5 text-base text-gray-300">
            {description}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function InfoSection() {
  return (
    <div className="py-16 bg-gradient-to-b from-purple-900 to-gray-900 grid-pattern">
      <Container>
        <div className="text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Understanding Diabetes Risk Factors
          </h2>
          <p className="mt-4 max-w-2xl text-lg sm:text-xl text-gray-300 mx-auto">
            Several key factors contribute to diabetes risk. Understanding these can help you make informed decisions about your health.
          </p>
        </div>

        <div className="mt-16 px-4">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              icon={<Heart className="h-6 w-6 text-white" />}
              title="Lifestyle Factors"
              description="Diet, physical activity, and weight management play crucial roles in diabetes prevention and management."
            />
            <InfoCard
              icon={<Activity className="h-6 w-6 text-white" />}
              title="Health Indicators"
              description="Blood glucose levels, BMI, and blood pressure are key metrics in assessing diabetes risk."
            />
            <InfoCard
              icon={<AlertCircle className="h-6 w-6 text-white" />}
              title="Warning Signs"
              description="Recognizing early symptoms and risk factors can lead to better health outcomes through early intervention."
            />
          </div>
        </div>
      </Container>
    </div>
  );
}