'use client';
import { useEffect, useRef, useState } from 'react';

type FloatingElement = {
  width: number;
  height: number;
  left: number;
  top: number;
  opacity: number;
  duration: number;
  delay: number;
};

export default function InvestmentThesis() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [floatingElements, setFloatingElements] = useState<FloatingElement[]>([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Generate floating elements only on client side
    const elements = [...Array(12)].map(() => ({
      width: Math.random() * 300 + 100,
      height: Math.random() * 300 + 100,
      left: Math.random() * 100,
      top: Math.random() * 100,
      opacity: Math.random() * 0.03 + 0.01,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5
    }));
    setFloatingElements(elements);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % 4);
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const transformations = [
    {
      from: 'Broken industries',
      to: 'billion-rupee opportunities',
      number: '01'
    },
    {
      from: 'Sleepy markets',
      to: 'high-growth ecosystems',
      number: '02'
    },
    {
      from: 'Traditional sectors',
      to: 'tech-powered machines',
      number: '03'
    },
    {
      from: 'Local solutions',
      to: 'national companies',
      number: '04'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden py-32 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: '#f5f5f0' }}
    >
      {/* Elegant floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingElements.map((element, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${element.width}px`,
              height: `${element.height}px`,
              left: `${element.left}%`,
              top: `${element.top}%`,
              background: `radial-gradient(circle, rgba(53, 94, 59, ${element.opacity}) 0%, transparent 70%)`,
              animation: `float ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <div 
            className={`transition-all duration-1200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            {/* Decorative top element */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-px bg-[#355E3B]" />
              <div className="w-2 h-2 bg-[#355E3B] rounded-full" />
              <div className="w-12 h-px bg-[#355E3B]" />
            </div>

            <span className="inline-block text-[#355E3B] text-xs md:text-sm uppercase tracking-[8px] font-semibold mb-12">
              Our Investment Thesis
            </span>
          </div>

          <h2 
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-[#355E3B] mb-6 transition-all duration-1200 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              fontFamily: 'system-ui, -apple-system, sans-serif',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            We back founders
          </h2>

          <h3 
            className={`text-2xl md:text-3xl lg:text-4xl font-light text-[#355E3B] italic transition-all duration-1200 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ 
              fontFamily: 'Georgia, serif',
              letterSpacing: '0.02em'
            }}
          >
            who can turn:
          </h3>
        </div>

        {/* Transformation Cards */}
        <div className="max-w-6xl mx-auto mb-20 space-y-6 md:space-y-8">
          {transformations.map((item, index) => (
            <div
              key={index}
              className={`group transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              <div className={`relative transition-all duration-700 ${
                activeIndex === index ? 'scale-105' : 'scale-100'
              }`}>
                <div className="relative bg-white rounded-3xl md:rounded-[3rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-700">
                  {/* Animated background gradient */}
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br from-[#355E3B]/5 via-transparent to-[#355E3B]/10 transition-opacity duration-700 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* Content */}
                  <div className="relative px-6 md:px-12 py-8 md:py-12">
                    <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
                      {/* Number */}
                      <div 
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-[#355E3B]/10 group-hover:text-[#355E3B] transition-colors duration-700"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        {item.number}
                      </div>

                      {/* Transformation */}
                      <div className="flex-1 space-y-4">
                        {/* From */}
                        <div className="relative inline-block">
                          <span className="text-lg md:text-xl lg:text-2xl font-medium text-gray-400">
                            {item.from}
                          </span>
                          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#355E3B]/30" />
                        </div>

                        {/* Arrow Animation */}
                        <div className="flex items-center gap-4 py-3">
                          <div className="flex-1 flex items-center gap-2">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="h-px bg-[#355E3B] transition-all duration-700"
                                style={{
                                  width: activeIndex === index ? '20px' : '10px',
                                  opacity: activeIndex === index ? 1 : 0.3,
                                  transitionDelay: `${i * 100}ms`
                                }}
                              />
                            ))}
                          </div>
                          <svg 
                            className={`w-6 h-6 md:w-8 md:h-8 text-[#355E3B] transition-all duration-700 ${
                              activeIndex === index ? 'translate-x-2 scale-110' : ''
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </div>

                        {/* To */}
                        <div>
                          <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-[#355E3B] leading-tight">
                            {item.to}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative corner element */}
                  <div 
                    className={`absolute bottom-0 right-0 w-32 h-32 transition-all duration-700 ${
                      activeIndex === index ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                      background: 'linear-gradient(135deg, transparent 50%, rgba(53, 94, 59, 0.05) 50%)',
                      borderTopLeftRadius: '100%'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Section */}
        <div 
          className={`max-w-5xl mx-auto mb-20 transition-all duration-1200 delay-1400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="relative">
            {/* Decorative line connecting the journey */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#355E3B] to-transparent hidden md:block" />
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-16">
              {/* First Spark */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-[#355E3B]/10 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-[#355E3B] flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#355E3B]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                  </div>
                </div>
                <h5 className="text-lg md:text-xl font-bold text-[#355E3B] mb-2">First Spark</h5>
                <p className="text-sm text-gray-500">We believe first</p>
              </div>

              {/* Connecting element */}
              <div className="hidden md:flex items-center gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#355E3B]"
                    style={{
                      animation: `pulse 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                      opacity: 0.3
                    }}
                  />
                ))}
              </div>

              {/* Final Scale */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-[#355E3B]/10 rounded-full blur-xl" />
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white border-4 border-[#355E3B] flex items-center justify-center shadow-xl">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-[#355E3B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
                <h5 className="text-lg md:text-xl font-bold text-[#355E3B] mb-2">Final Scale</h5>
                <p className="text-sm text-gray-500">We stay forever</p>
              </div>
            </div>

            <p className="text-xl md:text-2xl lg:text-3xl text-center text-[#355E3B] font-semibold leading-relaxed px-4">
              We invest in the <span className="font-black italic">first spark</span><br className="md:hidden" /> 
              {' '}and stay till the <span className="font-black italic">final scale.</span>
            </p>
          </div>
        </div>

        {/* Final Statement - The Crescendo */}
        <div 
          className={`text-center transition-all duration-1200 delay-1600 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <div className="inline-block relative px-4">
            {/* Decorative elements */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="w-1 h-1 bg-[#355E3B] rounded-full" />
              <div className="w-1 h-1 bg-[#355E3B] rounded-full" />
              <div className="w-1 h-1 bg-[#355E3B] rounded-full" />
            </div>

            <div className="relative bg-white px-8 md:px-16 py-10 md:py-12 rounded-[2rem] md:rounded-[3rem] shadow-2xl">
              {/* Subtle corner accents */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#355E3B]/20 rounded-tl-xl" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#355E3B]/20 rounded-tr-xl" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#355E3B]/20 rounded-bl-xl" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#355E3B]/20 rounded-br-xl" />

              <p className="text-base md:text-lg lg:text-xl text-gray-500 font-light mb-6 italic" style={{ fontFamily: 'Georgia, serif' }}>
                Because compounding doesn't start with money.
              </p>
              
              <div className="relative inline-block">
                <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-[#355E3B] font-black tracking-tight">
                  It starts with belief.
                </h3>
                
                {/* Elegant underline */}
                <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2">
                  <div className="h-1 flex-1 bg-[#355E3B] rounded-full" style={{ maxWidth: '60px' }} />
                  <div className="w-2 h-2 bg-[#355E3B] rounded-full self-center" />
                  <div className="h-1 flex-1 bg-[#355E3B] rounded-full" style={{ maxWidth: '60px' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}} />
    </section>
  );
}