import React, { useState } from 'react';
import { EditFormProps } from './types';

export default function EditForm({ avatar, name, role, onSubmit }: EditFormProps) {
  const [formData, setFormData] = useState({ avatar, name, role });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-400 mb-1">Avatar URL</label>
        <input
          type="url"
          value={formData.avatar}
          onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Role</label>
        <input
          type="text"
          value={formData.role}
          onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
          className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Save
      </button>
    </form>
  );
}