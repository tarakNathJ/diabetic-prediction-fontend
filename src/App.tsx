import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfoSection from './components/InfoSection';
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ForgotPassword from './components/auth/ForgotPassword';
import RiskAssessment from './components/risk/RiskAssessment';
import AboutUs from './components/AboutUs';
import Updates from './components/Updates';
import LoadingScreen from './components/loading/LoadingScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const path = window.location.pathname;

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {path === '/' && (
        <main className="pt-16">
          <Hero />
          <InfoSection />
        </main>
      )}
      {path === '/profile' && <Profile />}
      {path === '/login' && <Login />}
      {path === '/signup' && <Signup />}
      {path === '/forgot-password' && <ForgotPassword />}
      {path === '/predict' && <RiskAssessment />}
      {path === '/about' && <AboutUs />}
      {path === '/updates' && <Updates />}
      {path !== '/' && 
       path !== '/profile' && 
       path !== '/login' && 
       path !== '/signup' && 
       path !== '/forgot-password' && 
       path !== '/predict' && 
       path !== '/about' && 
       path !== '/updates' && (
        <main className="pt-16">
          <Hero />
          <InfoSection />
        </main>
      )}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 Diabetes Check. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}