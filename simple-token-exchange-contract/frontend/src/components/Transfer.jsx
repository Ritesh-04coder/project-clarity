import { useState } from 'react';
import { transferToken } from '../utils/contract';

export default function Transfer({ address }) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferStatus, setTransferStatus] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      setTransferStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }

    if (parseFloat(amount) <= 0) {
      setTransferStatus({ type: 'error', message: 'Amount must be greater than 0' });
      return;
    }

    setIsTransferring(true);
    setTransferStatus(null);

    try {
      await transferToken(address, recipient, parseInt(amount));
      setTransferStatus({ type: 'success', message: 'Transfer completed successfully!' });
      setShowSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setRecipient('');
        setAmount('');
        setShowSuccess(false);
        setTransferStatus(null);
      }, 3000);
      
    } catch (error) {
      console.error('Transfer failed:', error);
      setTransferStatus({ 
        type: 'error', 
        message: error.message || 'Transfer failed. Please try again.' 
      });
    } finally {
      setIsTransferring(false);
    }
  };

  const truncateAddress = (addr) => {
    if (!addr) return '';
    if (addr.length <= 16) return addr;
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  const isValidAddress = (addr) => {
    return addr && addr.length >= 26 && addr.match(/^[A-Za-z0-9]+$/);
  };

  return (
    <div className="group relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 group-hover:from-emerald-100 group-hover:via-teal-100 group-hover:to-cyan-100 transition-all duration-500"></div>
      
      {/* Animated particles background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-4 h-4 bg-emerald-400 rounded-full animate-bounce" style={{top: '20%', left: '10%', animationDelay: '0s'}}></div>
        <div className="absolute w-3 h-3 bg-teal-400 rounded-full animate-bounce" style={{top: '60%', right: '15%', animationDelay: '1s'}}></div>
        <div className="absolute w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{bottom: '30%', left: '20%', animationDelay: '2s'}}></div>
      </div>

      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 group-hover:shadow-2xl group-hover:border-emerald-200 transition-all duration-500 p-8">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
              Transfer Tokens
            </h2>
            <p className="text-sm text-gray-500">Send tokens to another wallet</p>
          </div>
        </div>

        {/* Transfer Form */}
        <div className="space-y-6">
          
          {/* Recipient Address Field */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>Recipient Address</span>
            </label>
            <div className="relative">
              <input
                className={`w-full px-4 py-4 bg-gray-50 border-2 rounded-xl font-mono text-sm transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
                  recipient && !isValidAddress(recipient) 
                    ? 'border-red-300 focus:border-red-400' 
                    : recipient && isValidAddress(recipient)
                    ? 'border-emerald-300 focus:border-emerald-400'
                    : 'border-gray-200 focus:border-emerald-400'
                }`}
                placeholder="Enter wallet address (e.g., ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              {recipient && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isValidAddress(recipient) ? (
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                      </svg>
                    </div>
                  ) : (
                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                  )}
                </div>
              )}
            </div>
            {recipient && !isValidAddress(recipient) && (
              <p className="text-xs text-red-500 flex items-center space-x-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Please enter a valid wallet address</span>
              </p>
            )}
            {recipient && isValidAddress(recipient) && (
              <p className="text-xs text-gray-500">
                Sending to: {truncateAddress(recipient)}
              </p>
            )}
          </div>

          {/* Amount Field */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8.070 7.76 8.433 7.418zM11 12.849v-1.698c.22.071.412.164.567.267.364.343.364.922 0 1.264-.155.103-.346.196-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6.102 7.230 6.102 8c0 .770.500 1.766 1.222 2.246.444.294.941.446 1.676.662v.092a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 9.766 13.898 8.770 13.898 8c0-.770-.5-1.766-1.222-2.246A4.535 4.535 0 0011 5.092V5z" clipRule="evenodd"/>
              </svg>
              <span>Amount</span>
            </label>
            <div className="relative">
              <input
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400"
                placeholder="Enter amount to send"
                type="number"
                min="0"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
                TOKENS
              </div>
            </div>
            {amount && parseFloat(amount) > 0 && (
              <p className="text-xs text-gray-500">
                You are sending {parseFloat(amount).toLocaleString()} tokens
              </p>
            )}
          </div>

          {/* Status Messages */}
          {transferStatus && (
            <div className={`p-4 rounded-xl border-l-4 ${
              transferStatus.type === 'success' 
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700' 
                : 'bg-red-50 border-red-400 text-red-700'
            }`}>
              <div className="flex items-center space-x-2">
                {transferStatus.type === 'success' ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )}
                <span className="font-medium">{transferStatus.message}</span>
              </div>
            </div>
          )}

          {/* Send Button */}
          <button
            onClick={handleTransfer}
            disabled={isTransferring || !recipient || !amount || !isValidAddress(recipient) || parseFloat(amount) <= 0}
            className={`w-full relative group/btn overflow-hidden rounded-xl py-4 px-6 font-bold text-lg transition-all duration-300 ${
              isTransferring || !recipient || !amount || !isValidAddress(recipient) || parseFloat(amount) <= 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : showSuccess
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1'
            }`}
          >
            {/* Button shine effect */}
            {!isTransferring && !showSuccess && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            )}
            
            <span className="relative flex items-center justify-center space-x-2">
              {isTransferring ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Transfer...</span>
                </>
              ) : showSuccess ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Transfer Complete!</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                  <span>Send Tokens</span>
                </>
              )}
            </span>
          </button>

          {/* Transfer Summary */}
          {recipient && amount && isValidAddress(recipient) && parseFloat(amount) > 0 && (
            <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-700 mb-2">Transfer Summary</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>To:</span>
                  <span className="font-mono">{truncateAddress(recipient)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="font-bold">{parseFloat(amount).toLocaleString()} TOKENS</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
}