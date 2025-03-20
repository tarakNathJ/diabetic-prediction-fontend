import React from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import AuthForm from './AuthForm';

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-900 grid-pattern flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Diabetes Check</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join us to monitor your health</p>
        </div>

        <Card className="p-8">
          <AuthForm mode="signup" />
        </Card>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="font-medium text-purple-400 hover:text-purple-300">
            Sign in
          </a>
        </p>
      </Container>
    </div>
  );
}