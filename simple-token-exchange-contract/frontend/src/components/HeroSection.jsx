function HeroSection({ connectWallet }) {
  return (
    <section className="relative text-center py-12 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 text-gray-900 overflow-hidden rounded-3xl">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Floating orbs */}
        <div className="absolute top-10 left-1/6 w-32 h-32 bg-gradient-to-r from-blue-200/30 to-indigo-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-10 right-1/6 w-40 h-40 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-2xl animate-bounce" />
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-r from-cyan-200/30 to-teal-200/30 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}} />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
        <div className="absolute top-3/4 left-1/4 w-1 h-1 bg-purple-500 rounded-full animate-ping" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" style={{animationDelay: '3s'}} />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Main heading with enhanced styling */}
        <div className="mb-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
            Never Lose{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-pulse">
                Your Stacks
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-lg -z-10 animate-pulse" />
            </span>
            {' '}Again
          </h1>
        </div>

        {/* Subtitle with better spacing and typography */}
        <p className="mt-4 max-w-lg mx-auto text-base md:text-lg text-gray-600 leading-relaxed font-light">
          Decentralized inheritance and asset release system secured by the{' '}
          <span className="text-blue-600 font-semibold">Stacks blockchain</span>.
        </p>

        {/* Enhanced CTA button */}
        <div className="mt-12">
          <button
            onClick={connectWallet}
            className="group relative px-12 py-5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 ease-out"
          >
            <span className="relative z-10">Connect Wallet to Start</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <div className="absolute inset-0.5 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-xl -z-10" />
          </button>
        </div>

        {/* Additional visual elements */}
        <div className="mt-8 flex justify-center space-x-6 opacity-60">
          <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
    </section>
  );
}

export default HeroSection;