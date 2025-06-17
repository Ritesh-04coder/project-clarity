import { useEffect, useState } from 'react';
import { getBalance } from '../utils/contract';

export default function Balance({ address }) {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBalance() {
      if (!address) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        const bal = await getBalance(address, address);
        setBalance(bal);
      } catch (err) {
        console.error('Error fetching balance:', err);
        setError('Failed to fetch balance');
      } finally {
        setLoading(false);
      }
    }
    
    fetchBalance();
  }, [address]);

  if (!address) {
    return (
      <div className="p-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg border border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-700">Token Balance</h2>
            <p className="text-slate-500">Connect wallet to view balance</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Your Balance</h2>
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-slate-600">Loading...</span>
              </div>
            ) : error ? (
              <p className="text-red-500 font-medium">{error}</p>
            ) : (
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold text-emerald-600">
                  {balance.toLocaleString()}
                </span>
                <span className="text-lg text-slate-600 font-medium">tokens</span>
              </div>
            )}
          </div>
        </div>
        
        {!loading && !error && (
          <div className="text-right">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
              Active
            </div>
          </div>
        )}
      </div>
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl transform rotate-1"></div>
      </div>
    </div>
  );
}