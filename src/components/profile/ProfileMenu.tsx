import React from 'react';

export default function ProfileMenu() {
  return (
    <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-gray-800 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
      <div className="relative">
        {/* Arrow pointer */}
        <div className="absolute -top-2 right-4 w-4 h-4 bg-gray-800 transform rotate-45" />
        
        {/* Menu items */}
        <div className="relative bg-gray-800 rounded-2xl overflow-hidden">
          <a
            href="/login"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-purple-600/20 hover:text-white transition-colors"
          >
            Create Account
          </a>
        </div>
      </div>
    </div>
  );
}