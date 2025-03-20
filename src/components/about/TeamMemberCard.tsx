import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Edit2 } from 'lucide-react';
import EditForm from './EditForm';
import MemberDisplay from './MemberDisplay';
import { TeamMemberProps } from './types';

export default function TeamMemberCard({
  name,
  role,
  avatarUrl,
  skills,
  socialLinks,
}: TeamMemberProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);
  const [currentName, setCurrentName] = useState(name);
  const [currentRole, setCurrentRole] = useState(role);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleUpdate = (data: { avatar: string; name: string; role: string }) => {
    setCurrentAvatar(data.avatar);
    setCurrentName(data.name);
    setCurrentRole(data.role);
    setIsEditing(false);
  };

  return (
    <Card className="p-6 relative group">
      <button
        onClick={() => setIsEditing(true)}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-800/50 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Edit2 className="w-4 h-4 text-gray-400" />
      </button>

      {isEditing ? (
        <EditForm
          avatar={currentAvatar}
          name={currentName}
          role={currentRole}
          onSubmit={handleUpdate}
        />
      ) : (
        <MemberDisplay
          avatar={currentAvatar}
          name={currentName}
          role={currentRole}
          skills={skills}
          socialLinks={socialLinks}
        />
      )}
    </Card>
  );
}