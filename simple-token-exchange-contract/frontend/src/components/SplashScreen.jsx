import { useState, useEffect } from 'react';
import { ChevronRight, Zap, Shield, TrendingUp, Coins, ArrowRight, Sparkles, Globe, Users, Github, Twitter, Linkedin, Instagram, Facebook, Youtube, Star, Quote } from 'lucide-react';

export default function SplashScreen({ onEnterApp }) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 3000);
    
    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => {
      clearInterval(featureInterval);
      clearInterval(testimonialInterval);
    };
  }, []);

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Execute transactions at the speed of light with Stacks blockchain technology"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Ultra Secure",
      description: "Built on Bitcoin's security with smart contract capabilities"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "DeFi Ready",
      description: "Advanced token management and decentralized finance features"
    }
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "DeFi Trader",
      avatar: "AC",
      text: "TokenDApp revolutionized my trading experience. The speed and security are unmatched!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Blockchain Developer",
      avatar: "SJ",
      text: "The best DeFi platform I've used. Clean interface and powerful features.",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Crypto Investor",
      avatar: "MR",
      text: "Finally, a platform that combines security with ease of use. Highly recommended!",
      rating: 5
    }
  ];

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "#", label: "GitHub" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", label: "YouTube" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gray-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gray-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Main Content */}
      <div className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl mb-6 transform hover:rotate-12 transition-transform duration-500">
            <Coins className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent mb-4 tracking-tight">
            Token<span className="text-yellow-400">DApp</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 font-light mb-2">
            The Future of Decentralized Finance
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <Globe className="w-4 h-4" />
            <span>Powered by Stacks Blockchain</span>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center transition-all duration-500 hover:bg-white/15 hover:scale-105 ${
                currentFeature === index ? 'ring-2 ring-yellow-400/50 shadow-xl' : ''
              }`}
            >
              <div className="flex justify-center mb-4 text-yellow-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">100%</div>
            <div className="text-gray-400 text-sm">Decentralized</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">∞</div>
            <div className="text-gray-400 text-sm">Possibilities</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Available</div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="max-w-4xl w-full mb-12">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            What Our Users Say
          </h2>
          <div className="relative">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  currentTestimonial === index ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center">
                  <Quote className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                  <p className="text-gray-200 text-lg mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">{testimonial.avatar}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-white font-semibold">{testimonial.name}</div>
                      <div className="text-gray-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4 space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? 'bg-yellow-400 w-8' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <button
            onClick={onEnterApp}
            className="group relative bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold px-8 py-4 rounded-full shadow-2xl hover:shadow-yellow-500/25 transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            <span className="relative flex items-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>Launch App</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition-all duration-300">
            <span className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Learn More</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        {/* Social Media Icons */}
        <div className="mb-8">
          <h3 className="text-white text-lg font-semibold text-center mb-4">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="group w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="text-center text-gray-400 text-sm mb-6">
          <p className="mb-2">Connect your Stacks wallet to get started</p>
          <div className="flex items-center justify-center space-x-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Testnet Ready</span>
            </span>
            <span>•</span>
            <span>Secure & Transparent</span>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
          <p>© 2025 Ritesh Kumar Singh. All rights reserved.</p>
          <p className="mt-1">Built with ❤️ for the decentralized future</p>
        </div>
      </div>

      {/* Floating Action Hint */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}