import { ReactNode } from 'react';

export interface Skill {
  icon: ReactNode;
  label: string;
}

export interface SocialLink {
  icon: ReactNode;
  url: string;
}

export interface TeamMemberProps {
  name: string;
  role: string;
  avatarUrl: string;
  skills: Skill[];
  socialLinks: SocialLink[];
}

export interface MemberDisplayProps {
  avatar: string;
  name: string;
  role: string;
  skills: Skill[];
  socialLinks: SocialLink[];
}

export interface EditFormProps {
  avatar: string;
  name: string;
  role: string;
  onSubmit: (data: { avatar: string; name: string; role: string }) => void;
}