import React from 'react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Bell, Book, ArrowRight, Calendar, Info, Star } from 'lucide-react';

interface Update {
  id: number;
  date: string;
  title: string;
  content: string;
  type: 'guide' | 'feature' | 'update';
}

const updates: Update[] = [
  {
    id: 1,
    date: '2024-03-15',
    title: 'How to Use the Risk Assessment',
    content: `Our risk assessment tool requires the following information:
    • Age (18-100 years)
    • Blood Pressure Status
    • Heart Disease History
    • BMI (calculated from height and weight)
    • HbA1c Level (if available)
    • Blood Glucose Level
    
    Enter these values accurately for the best results. The assessment takes into account multiple risk factors to provide a comprehensive risk evaluation.`,
    type: 'guide',
  },
  {
    id: 2,
    date: '2024-03-10',
    title: 'Understanding Your Results',
    content: `Your risk assessment result will be categorized as:
    • Low Risk (0-30%)
    • Moderate Risk (30-70%)
    • High Risk (70-100%)
    
    Each category comes with specific recommendations. Remember, this tool is for screening purposes only and should not replace professional medical advice.`,
    type: 'guide',
  },
  {
    id: 3,
    date: '2024-03-05',
    title: 'New Feature: Profile History',
    content: 'You can now view your previous risk assessment results in your profile. Track your progress over time and see how your health metrics change.',
    type: 'feature',
  },
  {
    id: 4,
    date: '2024-03-01',
    title: 'Enhanced Risk Assessment Algorithm',
    content: 'We have updated our risk assessment algorithm to provide more accurate predictions based on the latest medical research.',
    type: 'update',
  },
];

export default function Updates() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-600/20 rounded-full">
              <Bell className="h-6 w-6 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Updates & Guides</h1>
          </div>

          <div className="space-y-6">
            {updates.map((update) => (
              <Card key={update.id} className="p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      update.type === 'guide' ? 'bg-blue-500/20' :
                      update.type === 'feature' ? 'bg-green-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      {update.type === 'guide' ? (
                        <Book className={`h-5 w-5 ${
                          update.type === 'guide' ? 'text-blue-400' :
                          update.type === 'feature' ? 'text-green-400' :
                          'text-yellow-400'
                        }`} />
                      ) : update.type === 'feature' ? (
                        <Star className="h-5 w-5 text-green-400" />
                      ) : (
                        <Info className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-white">{update.title}</h2>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(update.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <div className="mt-4 text-gray-300 leading-relaxed whitespace-pre-line">
                  {update.content}
                </div>
                <div className="mt-4 flex justify-end">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    update.type === 'guide' ? 'bg-blue-500/20 text-blue-400' :
                    update.type === 'feature' ? 'bg-green-500/20 text-green-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {update.type.charAt(0).toUpperCase() + update.type.slice(1)}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}