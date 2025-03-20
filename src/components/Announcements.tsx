import React from 'react';
import { Container } from './ui/Container';
import { Card } from './ui/Card';
import { Bell, ArrowRight, Calendar } from 'lucide-react';

interface Announcement {
  id: number;
  date: string;
  title: string;
  content: string;
  type: 'update' | 'feature' | 'maintenance';
}

const announcements: Announcement[] = [
  {
    id: 1,
    date: '2024-03-15',
    title: 'New Feature: Prediction History',
    content: 'You can now view your previous risk assessment results in your profile. Track your progress over time and see how your health metrics change.',
    type: 'feature',
  },
  {
    id: 2,
    date: '2024-03-10',
    title: 'Enhanced Risk Assessment Algorithm',
    content: 'We have updated our risk assessment algorithm to provide more accurate predictions based on the latest medical research.',
    type: 'update',
  },
  {
    id: 3,
    date: '2024-03-05',
    title: 'Scheduled Maintenance',
    content: 'The system will undergo maintenance on March 20th from 2 AM to 4 AM UTC. Some features may be temporarily unavailable.',
    type: 'maintenance',
  },
];

export default function Announcements() {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 grid-pattern">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-purple-600/20 rounded-full">
              <Bell className="h-6 w-6 text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-white">Announcements</h1>
          </div>

          <div className="space-y-6">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="p-6 hover:border-purple-500/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      announcement.type === 'feature' ? 'bg-green-500/20' :
                      announcement.type === 'update' ? 'bg-blue-500/20' :
                      'bg-yellow-500/20'
                    }`}>
                      {announcement.type === 'feature' ? (
                        <ArrowRight className={`h-5 w-5 ${
                          announcement.type === 'feature' ? 'text-green-400' :
                          announcement.type === 'update' ? 'text-blue-400' :
                          'text-yellow-400'
                        }`} />
                      ) : announcement.type === 'update' ? (
                        <Bell className="h-5 w-5 text-blue-400" />
                      ) : (
                        <Calendar className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>
                    <h2 className="text-xl font-semibold text-white">{announcement.title}</h2>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
                <p className="mt-4 text-gray-300 leading-relaxed">
                  {announcement.content}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className={`text-sm px-3 py-1 rounded-full ${
                    announcement.type === 'feature' ? 'bg-green-500/20 text-green-400' :
                    announcement.type === 'update' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {announcement.type.charAt(0).toUpperCase() + announcement.type.slice(1)}
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