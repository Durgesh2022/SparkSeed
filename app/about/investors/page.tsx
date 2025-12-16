'use client';
import React, { useEffect, useRef, useState } from 'react';

const IndiaFundShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cities = [
    { name: 'Jaipur', top: '36%', left: '30%', delay: '0.2s' },
    { name: 'Ahmedabad', top: '48%', left: '18%', delay: '0.3s' },
    { name: 'Indore', top: '50%', left: '32%', delay: '0.4s' },
    { name: 'Coimbatore', top: '88%', left: '36%', delay: '0.5s' },
    { name: 'Madurai', top: '93%', left: '38%', delay: '0.6s' },
    { name: 'Trichy', top: '86%', left: '42%', delay: '0.7s' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#3a3a38] overflow-hidden pt-10">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-in">
            <div className="inline-block mb-6 px-6 py-2 bg-[#355E3B] bg-opacity-10 rounded-full border border-[#355E3B]">
              <span className="text-sm font-semibold text-white tracking-wider uppercase">For Investors</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#355E3B] via-[#4a7c59] to-[#355E3B]">
                WHY WE ARE
              </span>
            </h1>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              <span className="text-[#3a3a38]">THE MOST </span>
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#355E3B] to-[#4a7c59]">
                  UNDERESTIMATED
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#355E3B] to-[#4a7c59] rounded-full"></div>
              </span>
              <br />
              <span className="text-[#3a3a38]">FUND IN INDIA</span>
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Vision Statement */}
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:border-[#355E3B] hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <p className="text-xl md:text-2xl leading-relaxed text-[#3a3a38]">
                  Because the next India will <span className="font-bold text-[#355E3B]">NOT</span> be built only in Koramangala, Bandra & Cyber City.
                </p>
              </div>

              {/* Cities List */}
              <div className="bg-gradient-to-br from-opacity-10 to-[#4a7c59] to-opacity-10 rounded-2xl p-8 border border-[#355E3B] shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-[#355E3B]">It will be built in:</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['Coimbatore', 'Madurai', 'Jaipur', 'Indore', 'Trichy', 'Ahmedabad'].map((city, idx) => (
                    <div
                      key={city}
                      className="flex items-center space-x-3 text-lg transform hover:translate-x-2 transition-transform duration-300 text-[#3a3a38]"
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="w-2 h-2 bg-[#355E3B] rounded-full animate-pulse"></div>
                      <span className="font-medium">{city}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unique Position */}
              <div className="bg-gradient-to-r from-[#355E3B] to-[#4a7c59] rounded-2xl p-8 border border-[#355E3B] shadow-lg">
                <p className="text-xl font-semibold leading-relaxed text-white">
                  And we are the <span className="font-bold underline">ONLY</span> fund going to these creators before they become visible.
                </p>
              </div>
            </div>

            {/* Right Column - Map */}
            <div ref={sectionRef} className="relative">
              <div className="relative max-w-4xl mx-auto">
                {/* India Map Image */}
                <div className="relative">
                  <img 
                    src="/image.png"
                    alt="India Map"
                    className={`w-full h-auto transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                  />

                  {/* Location Pins */}
                  {cities.map((city, idx) => (
                    <div
                      key={city.name}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                        isVisible ? 'opacity-100 animate-bounce-in' : 'opacity-0 translate-y-12'
                      }`}
                      style={{
                        top: city.top,
                        left: city.left,
                        animationDelay: isVisible ? city.delay : '0s',
                      }}
                    >
                      <div className="relative group cursor-pointer">
                        <div className="absolute inset-0 bg-[#355E3B] rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="relative text-[#355E3B] drop-shadow-lg transform group-hover:scale-125 transition-transform"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-white">
                          {city.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Investment Proposition */}
          <div className="mt-32 space-y-12">
            <div className="text-center max-w-4xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-black mb-6 text-[#3a3a38] leading-tight">
                You invest not only in startups
              </h3>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#355E3B] to-transparent mx-auto mb-6"></div>
              <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#355E3B] via-[#4a7c59] to-[#355E3B]">
                You invest in a pipeline of opportunity
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { value: '500', label: 'High-potential early-stage companies', color: 'from-[#355E3B] to-[#4a7c59]', icon: '📊' },
                { value: '10,000+', label: 'Screened founders', color: 'from-[#4a7c59] to-[#355E3B]', icon: '👥' },
                { value: '1.1%', label: 'Acceptance rate', color: 'from-[#3a3a38] to-[#2d2d2b]', icon: '⭐' },
                { value: 'Multi-stage', label: 'Follow-on capability', color: 'from-[#355E3B] to-[#4a7c59]', icon: '🚀' },
                { value: 'Real', label: 'Sector diversity', color: 'from-[#3a3a38] to-[#2d2d2b]', icon: '🎯' },
                { value: 'Ground-level', label: 'Founder access no one else has', color: 'from-[#355E3B] to-[#4a7c59]', icon: '🔑' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:border-[#355E3B] hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#355E3B] from-opacity-10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{stat.icon}</div>
                    <div className={`text-4xl md:text-5xl font-black mb-3 bg-clip-text text-transparent bg-gradient-to-r ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-base text-[#3a3a38] leading-snug font-medium">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mt-24 text-center">
            <div className="relative bg-gradient-to-br from-[#3a3a38] via-[#2d2d2b] to-[#3a3a38] rounded-3xl p-12 md:p-16 border border-[#3a3a38] shadow-2xl transform hover:scale-[1.02] transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#355E3B]/10 via-[#4a7c59]/10 to-[#355E3B]/10 opacity-50"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#355E3B]/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#4a7c59]/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <p className="text-2xl md:text-4xl font-black leading-relaxed text-white mb-8">
                  We give investors access <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#355E3B] to-[#4a7c59]">before</span> the world sees the opportunity.
                </p>
                <div className="h-1 w-24 bg-gradient-to-r from-[#355E3B] to-[#4a7c59] rounded-full mx-auto mb-8"></div>
                <p className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#355E3B] via-[#4a7c59] to-[#355E3B]">
                  That's where 10x, 20x, 30x returns are born.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) translateY(100px);
          }
          60% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(-10px);
          }
          80% {
            transform: translate(-50%, -50%) translateY(5px);
          }
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default IndiaFundShowcase;