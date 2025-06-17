import { useState } from 'react';
import { Wallet, Menu, X, BarChart3, Settings, Coins, PieChart } from 'lucide-react';

function Navbar({ walletAddress, connectWallet, refConnectButton }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await connectWallet();
    } finally {
      setIsConnecting(false);
    }
  };

  const truncateAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'tokens', label: 'Tokens', icon: <Coins className="w-4 h-4" /> },
    { id: 'portfolio', label: 'Portfolio', icon: <PieChart className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  return (
    <nav className="relative bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 text-white shadow-2xl">
      {/* ... gradient and animation layers ... */}

      <div className="relative max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl transform group-hover:rotate-12 transition-all duration-500">
                <Coins className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div className="group-hover:scale-105 transition-transform duration-300">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                TokenDApp
              </h1>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-gray-300 opacity-75">Powered by Stacks</p>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1 bg-white/5 backdrop-blur-sm rounded-full p-2 border border-white/10">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Wallet and menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-3 py-2 border border-white/10">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-300">Testnet</span>
            </div>

            {walletAddress ? (
              <div className="flex items-center space-x-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full px-5 py-3 border border-green-400/30 shadow-lg">
                <div className="relative">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                </div>
                <div className="text-sm">
                  <div className="font-medium text-green-200">Connected</div>
                  <div className="text-xs text-gray-300">{truncateAddress(walletAddress)}</div>
                </div>
                <button className="p-1 hover:bg-white/10 rounded-full transition-colors">
                  <Wallet className="w-4 h-4 text-gray-300" />
                </button>
              </div>
            ) : (
              <button
                ref={refConnectButton}
                onClick={handleConnect}
                disabled={isConnecting}
                className="relative group bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative flex items-center space-x-2">
                  {isConnecting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <>
                      <Wallet className="w-5 h-5" />
                      <span>Connect Wallet</span>
                    </>
                  )}
                </span>
              </button>
            )}

            {/* Hamburger for mobile */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 border border-white/10"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-4 animate-in slide-in-from-top-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent animate-pulse"></div>
    </nav>
  );
}

export default Navbar;
