import React, { useState } from 'react';
import { Container } from '../ui/Container';
import { Card } from '../ui/Card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';


export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [OldPassword, setOldPassword] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [Loading, SetLoding] = useState(false);
  const [error, SetError] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      SetLoding(true);
      SetError(false);
      const Responce = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/Api/V1/changePassword`, {
        email: email,
        oldPassword: OldPassword,
        newPassword: password

      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      SetLoding(false);

      alert("success fully complete")
    } catch (Error) {

      SetLoding(false)
      SetError(true);
      alert("wrong user try again .")
      if (axios.isCancel(Error)) {

        return
      }
      if (axios.isAxiosError(Error)) {
        console.log(Error)
        return
      }
      alert("faled..")
    }
    setIsSubmitted(true);
  }




  return (
    <div className="min-h-screen bg-gray-900 grid-pattern flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Container className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">.</h1>
          <h2 className="text-2xl font-semibold text-white mb-2">Reset Password</h2>
          <p className="text-gray-400">Enter your email to receive reset instructions</p>
        </div>

        <Card className="p-8">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 bg-gray-800/50 border border-gray-700 rounded-lg py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="OldPassword" className="block text-sm font-medium text-gray-400">
                  Odl Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="OldPassword"
                    type="password"
                    required
                    value={OldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="block w-full pl-10 bg-gray-800/50 border border-gray-700 rounded-lg py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter old password"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 bg-gray-800/50 border border-gray-700 rounded-lg py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={Loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600 focus:ring-offset-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {Loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  'Send Reset Instructions'
                )}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-white">Check your email</h3>
              <p className="mt-2 text-sm text-gray-400">
                We've sent password reset instructions to {email}
              </p>
            </div>
          )}
        </Card>

        <div className="mt-8 text-center">
          <a
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Sign In
          </a>
        </div>
      </Container>
    </div>
  );
}