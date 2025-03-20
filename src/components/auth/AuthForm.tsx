import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { UserDetails ,RemoveUserDetails } from '../../ReduxStore/UserDetails';
import { useDispatch } from 'react-redux';

const authSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export default function AuthForm({ mode = 'login' }: { mode?: 'login' | 'signup' }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, signup } = useAuthStore();
  const Dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        const Result  = await login(formData.email, formData.password);
        
        Dispatch(UserDetails(Result));
        window.location.href = '/profile';
      } else {
        if (!formData.name) throw new Error('Name is required');
        await signup(formData.email, formData.password, formData.name);
        window.location.href = '/login';
      }


    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mode === 'signup' && (
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            required={mode === 'signup'}
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="John Doe"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          className="mt-1 block w-full rounded-lg bg-gray-800/50 border border-gray-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
          placeholder="••••••••"
        />
      </div>

      {mode === 'login' && (
        <div className="flex justify-end">
          <a
            href="/forgot-password"
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Forgot password?
          </a>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : mode === 'login' ? (
          'Sign In'
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
}