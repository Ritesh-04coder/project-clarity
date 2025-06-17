import React, { useState } from 'react';

function HeroSection({ connectWallet }) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectWallet = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      // Keep spinner for a bit longer to show the effect
      setTimeout(() => setIsConnecting(false), 2000);
    }
  };
  return (
    <section className="relative text-center py-12 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900 overflow-hidden rounded-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 rounded-3xl">
        {/* Floating orbs */}
        <div className="absolute top-10 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-1/6 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-2xl animate-bounce" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-cyan-200/30 to-teal-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" style={{animationDelay: '3s'}} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] rounded-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Card Component */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mx-4 hover:shadow-3xl hover:bg-white/90 transition-all duration-500 transform hover:scale-[1.02]">
          {/* Card glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 rounded-3xl blur-xl -z-10" />
          
          {/* Main heading with enhanced styling */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
              Never Lose{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse">
                  Your Bitcoin
                </span>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-lg -z-10 animate-pulse" />
              </span>
              {' '}Again
            </h1>
          </div>

          {/* Subtitle with better spacing and typography */}
          <p className="mt-6 max-w-lg mx-auto text-base md:text-lg text-gray-600 leading-relaxed font-light">
            Decentralized inheritance and asset release system secured by the{' '}
            <span className="text-blue-600 font-semibold">Stacks blockchain</span>.
          </p>

          {/* Enhanced CTA button with spinner */}
          <div className="mt-10">
            <button
              onClick={handleConnectWallet}
              disabled={isConnecting}
              className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 ease-out disabled:opacity-75 disabled:cursor-not-allowed disabled:transform-none"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isConnecting && (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {isConnecting ? 'Connecting...' : 'Connect Wallet to Start'}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <div className="absolute inset-0.5 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-2xl -z-10" />
            </button>
          </div>

          {/* Additional visual elements */}
          <div className="mt-8 flex justify-center space-x-6 opacity-60">
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
          </div>

          {/* Card accent elements */}
          <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20" />
          <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-20" />
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent rounded-b-3xl" />
    </section>
  );
}

// Demo component to show the hero section
export default function App() {
  const handleConnectWallet = async () => {
    // Simulate wallet connection delay
    return new Promise((resolve) => {
      setTimeout(() => {
        alert('Wallet connected successfully!');
        resolve();
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <HeroSection connectWallet={handleConnectWallet} />
    </div>
  );
}