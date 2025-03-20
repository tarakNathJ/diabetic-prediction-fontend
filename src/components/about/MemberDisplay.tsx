import React from 'react';
import { MemberDisplayProps } from './types';

export default function MemberDisplay({
  avatar,
  name,
  role,
  skills,
  socialLinks,
}: MemberDisplayProps) {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl" />
          <img
            src={avatar}
            alt={name}
            className="relative w-full h-full object-cover rounded-full ring-2 ring-purple-600/50"
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <p className="text-purple-400 mb-4">{role}</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-gray-300 bg-gray-800/30 rounded-lg px-3 py-2"
            >
              {skill.icon}
              <span className="text-sm">{skill.label}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-4 border-t border-gray-800">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}