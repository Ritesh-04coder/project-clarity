import { useEffect, useState } from 'react';
import { getTotalSupply } from '../utils/contract';

export default function TokenInfo({ address }) {
  const [totalSupply, setTotalSupply] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animatedSupply, setAnimatedSupply] = useState(0);

  useEffect(() => {
    async function fetchSupply() {
      if (!address) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const supply = await getTotalSupply(address);
        setTotalSupply(supply);
        
        // Animate number counting up
        let start = 0;
        const increment = supply / 100;
        const timer = setInterval(() => {
          start += increment;
          if (start >= supply) {
            setAnimatedSupply(supply);
            clearInterval(timer);
          } else {
            setAnimatedSupply(Math.floor(start));
          }
        }, 20);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch token data:', error);
        setError('Failed to fetch token data');
        setIsLoading(false);
      }
    }
    
    fetchSupply();
  }, [address]);

  const formatNumber = (num) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="group relative overflow-hidden">
      {/* Background gradient with hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 group-hover:from-blue-100 group-hover:via-indigo-100 group-hover:to-purple-100 transition-all duration-500"></div>
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>

      <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 group-hover:shadow-2xl group-hover:border-blue-200 transition-all duration-500 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8.070 7.76 8.433 7.418zM11 12.849v-1.698c.22.071.412.164.567.267.364.343.364.922 0 1.264-.155.103-.346.196-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6.102 7.230 6.102 8c0 .770.500 1.766 1.222 2.246.444.294.941.446 1.676.662v.092a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 9.766 13.898 8.770 13.898 8c0-.770-.5-1.766-1.222-2.246A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd"/>
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                Token Information
              </h2>
              <p className="text-sm text-gray-500">Live market data</p>
            </div>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : error ? 'bg-red-400' : 'bg-green-400'}`}></div>
            <span className="text-xs font-medium text-gray-600">
              {isLoading ? 'Loading' : error ? 'Error' : 'Live'}
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="space-y-6">
          {/* Total Supply Card */}
          <div className="relative p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 group-hover:border-blue-200 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-700">Total Supply</h3>
                </div>
                
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
                    <span className="text-gray-500">Fetching data...</span>
                  </div>
                ) : error ? (
                  <div className="flex items-center space-x-2 text-red-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span className="text-sm">{error}</span>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-3xl font-bold text-gray-800 font-mono">
                      {formatNumber(animatedSupply)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {totalSupply.toLocaleString()} tokens
                    </p>
                  </div>
                )}
              </div>
              
              {/* Chart visualization placeholder */}
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center opacity-80">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Additional metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700">Circulating</span>
              </div>
              <p className="text-lg font-bold text-green-800">
                {isLoading ? '...' : formatNumber(animatedSupply * 0.85)}
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg border border-purple-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-purple-700">Locked</span>
              </div>
              <p className="text-lg font-bold text-purple-800">
                {isLoading ? '...' : formatNumber(animatedSupply * 0.15)}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}