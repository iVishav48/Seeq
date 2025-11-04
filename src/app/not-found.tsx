import Link from 'next/link';
import React from 'react';

export default function NotFound() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-800 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Badge */}
        <div className="inline-block mb-8">
          <span className="px-6 py-2 rounded-full border border-yellow-600/30 bg-yellow-600/10 text-yellow-500 text-sm font-medium tracking-wider">
            ERROR 404
          </span>
        </div>

        {/* Main heading */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6">
          <span className="text-white">Lost in the </span>
          <span className="text-yellow-500">Ratio</span>
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-xl mx-auto leading-relaxed">
          The page you're looking for seems to have wandered off the golden path. 
          Let's get you back to balanced territory.
        </p>

        {/* CTA Button */}
        <Link href="/"
          
          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-neutral-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/20 cursor-pointer"
        >
          RETURN HOME
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 7l5 5m0 0l-5 5m5-5H6" 
            />
          </svg>
        </Link>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center items-center gap-4 text-gray-600">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gray-600"></div>
          <span className="text-sm font-medium tracking-widest">φ 1.618</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gray-600"></div>
        </div>
      </div>
    </div>
  );
}