import { useState } from 'react';
import Navbar from './components/Navbar';
import TokenInfo from './components/TokenInfo';
import Balance from './components/Balance';
import Transfer from './components/Transfer';
import InitializeToken from './components/InitializeToken';
import SplashScreen from './components/SplashScreen';
import HeroSection from './components/HeroSection'; // ✅ Make sure this is fixed
import { showConnect } from '@stacks/connect';

function App() {
  const [userAddress, setUserAddress] = useState(null);
  const [showSplash, setShowSplash] = useState(true);

  const connectWallet = async () => {
    showConnect({
      appDetails: {
        name: 'TokenDApp',
        icon: window.location.origin + '/vite.svg',
      },
      onFinish: (authData) => {
        try {
          const profile = authData?.authResponsePayload?.profile;
          const address =
            profile?.stxAddress?.testnet || profile?.stxAddress?.mainnet;
          if (!address) {
            console.error('Wallet address not found.');
            return;
          }
          setUserAddress(address);
        } catch (err) {
          console.error('Error connecting wallet:', err);
        }
      },
      onCancel: () => {
        console.log('User cancelled wallet connection');
      },
    });
  };

  const handleEnterApp = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onEnterApp={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar setAddress={setUserAddress} walletAddress={userAddress} connectWallet={connectWallet} />
      <main className="max-w-3xl mx-auto mt-8 space-y-6 px-4">
        {userAddress ? (
          <>
            <TokenInfo address={userAddress} />
            <Balance address={userAddress} />
            <Transfer address={userAddress} />
            <InitializeToken address={userAddress} />
          </>
        ) : (
          <HeroSection connectWallet={connectWallet} />
        )}
      </main>
    </div>
  );
}

export default App;
