import React, { useState } from 'react';
import { Activity, User, Home, Bell, Menu, X } from 'lucide-react';
import { Container } from './ui/Container';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-gray-900/30 backdrop-blur-md border border-white/10 shadow-lg rounded-b-2xl mx-4 mt-2">
        <Container>
          <div className="flex justify-between h-16">
            <a 
              href="/" 
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <Activity className="h-8 w-8 text-purple-400" />
              <span className="ml-2 text-xl font-bold text-white">Diabetes Check</span>
            </a>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            
            {/* Desktop menu */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/" className="flex items-center px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <Home className="h-5 w-5 mr-1.5" />
                <span>Home</span>
              </a>
              <a href="/predict" className="flex items-center px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <Activity className="h-5 w-5 mr-1.5" />
                <span>Check Risk</span>
              </a>
              <a href="/updates" className="flex items-center px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <Bell className="h-5 w-5 mr-1.5" />
                <span>Updates</span>
              </a>
              <a href="/about" className="flex items-center px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <span>About Us</span>
              </a>
              <a href="/profile" className="flex items-center px-4 py-2 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <User className="h-5 w-5 mr-1.5" />
                <span>Profile</span>
              </a>
            </div>
          </div>

          {/* Mobile menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 py-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="space-y-2">
              <a href="/" className="flex items-center px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <Home className="h-5 w-5 mr-3" />
                <span>Home</span>
              </a>
              <a href="/predict" className="flex items-center px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <Activity className="h-5 w-5 mr-3" />
                <span>Check Risk</span>
              </a>
              <a href="/updates" className="flex items-center px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <Bell className="h-5 w-5 mr-3" />
                <span>Updates</span>
              </a>
              <a href="/about" className="flex items-center px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <span className="ml-8">About Us</span>
              </a>
              <a href="/profile" className="flex items-center px-4 py-3 text-gray-300 hover:text-purple-400 hover:bg-white/5 rounded-xl transition-all">
                <User className="h-5 w-5 mr-3" />
                <span>Profile</span>
              </a>
            </div>
          </div>
        </Container>
      </nav>
    </div>
  );
}