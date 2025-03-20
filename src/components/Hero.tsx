import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Container } from './ui/Container';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-gray-900 to-purple-900 grid-pattern">
      <Container className="py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="text-center lg:text-left lg:col-span-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
              <span className="block">Take Control of Your</span>
              <span className="block text-purple-400">Diabetes Risk</span>
            </h1>
            <p className="mt-3 text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto lg:mx-0">
              Early detection is key to managing diabetes. Use our advanced prediction tool to assess your risk factors and take proactive steps towards a healthier future.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href="/predict"
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors"
              >
                Check Your Risk
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-12 relative sm:max-w-lg mx-auto lg:mt-0 lg:max-w-none lg:col-span-6 lg:flex lg:items-center">
            <img
              className="w-full rounded-lg shadow-2xl ring-1 ring-gray-700"
              src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80"
              alt="Medical professional with patient"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}