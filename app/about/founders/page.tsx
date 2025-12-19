'use client';
import React, { useState, useEffect } from 'react';
import { Users, Target, Zap, ArrowUpRight, Sparkles, TrendingUp } from 'lucide-react';

const SparkSeedJourney = () => {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { name: "Week 1-4", value: 25, label: "Foundation", growth: 20 },
    { name: "Week 5-8", value: 50, label: "Acceleration", growth: 45 },
    { name: "Week 9-12", value: 75, label: "Scale", growth: 75 },
    { name: "Demo Day", value: 100, label: "Launch", growth: 100 }
  ];

  const differencePoints = [
    {
      icon: Users,
      title: "Mentors who don't just talk — they ship",
      description: "Real operators with exits and battle scars"
    },
    {
      icon: Target,
      title: "Investors who don't chase valuation — they chase fundamentals",
      description: "Capital that understands the long game"
    },
    {
      icon: Zap,
      title: "Growth teams who don't give advice — they run sprints with you",
      description: "Embedded execution, not consulting calls"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0] overflow-x-hidden pt-6 md:pt-10">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(53, 94, 59) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-[#355E3B] bg-opacity-10 border border-[#355E3B] rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span className="text-xs sm:text-sm font-semibold text-white tracking-wide">FOR FOUNDERS</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 tracking-tight px-2">
            <span className="bg-gradient-to-r from-[#355E3B] via-[#4a7c59] to-[#355E3B] bg-clip-text text-transparent">
              THE SPARKSEED
            </span>
            <br />
            <span className="text-[#3a3a38]">DIFFERENCE</span>
          </h1>
          
          <div className="h-1 w-16 sm:w-24 bg-gradient-to-r from-[#355E3B] to-[#4a7c59] mx-auto rounded-full"></div>
        </div>

        {/* Main Statement */}
        <div className="text-center mb-12 md:mb-20 max-w-4xl mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-500 mb-3 sm:mb-4 leading-tight">
            You Don't Enter a Cohort.
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black text-[#3a3a38] leading-tight">
            You Enter a <span className="relative inline-block">
              <span className="text-[#355E3B]">War Room.</span>
              <div className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-2 sm:h-3 bg-[#355E3B] bg-opacity-20 -z-10 transform -rotate-1"></div>
            </span>
          </h2>
        </div>

        {/* Two Column Layout - Responsive */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-12 md:mb-16">
          {/* Left Side - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* War Room Description */}
            <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="text-base sm:text-lg md:text-xl text-[#3a3a38] leading-relaxed mb-6 sm:mb-8">
                Our <span className="text-[#355E3B] font-bold">3-month accelerator</span> is not PowerPoints + pizza + pitch day. 
                It is <span className="text-[#3a3a38] font-bold">grunt work</span> with experts who have built real companies.
              </p>
              
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#355E3B] tracking-wide">
                  WHAT YOU GET
                </h3>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
              </div>

              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {differencePoints.map((point, index) => {
                  const Icon = point.icon;
                  return (
                    <div
                      key={index}
                      className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-[#355E3B] hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start gap-3 sm:gap-4">
                        <div className="bg-[#355E3B] bg-opacity-10 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:bg-[#355E3B] group-hover:bg-opacity-20 transition-colors duration-300 flex-shrink-0">
                          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm sm:text-base text-[#3a3a38] mb-1 leading-snug">{point.title}</h4>
                          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{point.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-lg sm:text-xl">✗</span>
                  </div>
                  <span className="text-sm sm:text-base text-gray-600 font-medium">Monthly strategy calls?</span>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#355E3B] bg-opacity-10 flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg sm:text-xl">✓</span>
                  </div>
                  <span className="text-sm sm:text-base text-[#3a3a38] font-bold">Weekly battlefield calls.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Animated Growth Graph */}
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#355E3B]" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#3a3a38]">Your Growth Journey</h3>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10">Watch your startup transform in 12 weeks</p>

            {/* Growth Chart */}
            <div className="relative h-64 sm:h-72 md:h-80 mb-6 sm:mb-8 md:mb-10">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs font-semibold text-gray-500 pr-2 sm:pr-3 w-8 sm:w-12 text-right">
                <span>100%</span>
                <span>75%</span>
                <span>50%</span>
                <span>25%</span>
                <span>0%</span>
              </div>

              {/* Chart area */}
              <div className="ml-10 sm:ml-14 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-t border-gray-200"></div>
                  ))}
                </div>

                {/* Growth bars */}
                <div className="absolute inset-0 flex items-end justify-around px-1 sm:px-2">
                  {stages.map((stage, index) => {
                    const isActive = index === activeStage;
                    const barHeight = stage.growth;
                    
                    return (
                      <div key={index} className="relative flex-1 h-full flex items-end justify-center mx-0.5 sm:mx-1">
                        {/* Bar */}
                        <div
                          className={`w-full rounded-t-xl sm:rounded-t-2xl transition-all duration-1000 ease-out relative overflow-hidden ${
                            isActive 
                              ? 'bg-gradient-to-t from-[#355E3B] via-[#4a7c59] to-[#5a8c69]' 
                              : 'bg-gradient-to-t from-[#355E3B]/60 to-[#4a7c59]/60'
                          }`}
                          style={{
                            height: `${barHeight}%`,
                            boxShadow: isActive ? '0 -4px 20px rgba(53, 94, 59, 0.3)' : 'none',
                            minHeight: '8px'
                          }}
                        >
                          {/* Shimmer effect */}
                          {isActive && (
                            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent animate-pulse"></div>
                          )}
                          
                          {/* Growth indicator */}
                          {isActive && (
                            <div className="absolute -top-10 sm:-top-12 md:-top-14 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
                              <div className="bg-gradient-to-r from-[#355E3B] to-[#4a7c59] text-white px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-2 whitespace-nowrap shadow-xl border border-white sm:border-2">
                                <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                                {stage.growth}%
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* X-axis labels */}
            <div className="ml-10 sm:ml-14 flex justify-around text-center mb-6 sm:mb-8">
              {stages.map((stage, index) => (
                <div key={index} className={`flex-1 transition-all duration-300 ${index === activeStage ? 'scale-105' : ''}`}>
                  <div className={`text-xs sm:text-sm font-bold mb-0.5 sm:mb-1 ${index === activeStage ? 'text-[#355E3B]' : 'text-[#3a3a38]'}`}>
                    {stage.name}
                  </div>
                  <div className={`text-[10px] sm:text-xs ${index === activeStage ? 'text-[#4a7c59] font-semibold' : 'text-gray-500'}`}>
                    {stage.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4">
              <div className="text-center p-3 sm:p-4 md:p-5 bg-gradient-to-br from-[#355E3B]/10 to-[#4a7c59]/10 rounded-xl sm:rounded-2xl border border-[#355E3B]/20">
                <div className="text-2xl sm:text-3xl font-black text-[#355E3B] mb-0.5 sm:mb-1">12</div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">Weeks</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-5 bg-gradient-to-br from-[#355E3B]/10 to-[#4a7c59]/10 rounded-xl sm:rounded-2xl border border-[#355E3B]/20">
                <div className="text-2xl sm:text-3xl font-black text-[#355E3B] mb-0.5 sm:mb-1">100+</div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">Mentors</div>
              </div>
              <div className="text-center p-3 sm:p-4 md:p-5 bg-gradient-to-br from-[#355E3B]/10 to-[#4a7c59]/10 rounded-xl sm:rounded-2xl border border-[#355E3B]/20">
                <div className="text-2xl sm:text-3xl font-black text-[#355E3B] mb-0.5 sm:mb-1">∞</div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">Potential</div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Statement */}
        <div className="relative overflow-hidden text-center bg-gradient-to-br from-[#355E3B] via-[#4a7c59] to-[#355E3B] rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 px-2">
            <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-white/90 leading-tight">
              And when the Demo Day comes,
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
              you aren't just <span className="text-green-100">ready</span> —<br className="hidden sm:block" /> you are <span className="relative inline-block">
                <span className="text-green-100">undeniable</span>
                <span className="absolute -bottom-0.5 sm:-bottom-1 left-0 right-0 h-1.5 sm:h-2 bg-white/30 rounded-full block"></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SparkSeedJourney;