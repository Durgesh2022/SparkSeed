'use client';
import React, { useEffect, useRef, useState } from 'react';

const WhatMakesUsDifferent: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        const scrollProgress = Math.max(0, (windowHeight - sectionTop) / windowHeight);
        const itemsToShow = Math.floor(scrollProgress * 7);
        
        const newVisible = Array.from({ length: itemsToShow }, (_, i) => i);
        setVisibleItems(newVisible);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const differences = [
    {
      number: "01",
      title: "We invest early — when nobody else believes yet.",
      description: "Idea, prototype, pre-revenue, pre-team? Perfect. That's where the magic is. That's where we enter.",
      side: "left"
    },
    {
      number: "02",
      title: "We don't sit in AC offices. We go to the ground.",
      description: "We meet founders in:",
      list: [
        "Coimbatore workshops",
        "Surat manufacturing units",
        "Indore offices",
        "Bangalore co-working",
        "Tier 2–4 founder ecosystems"
      ],
      footer: "We work where founders actually work — not where investors pretend to understand them.",
      side: "right"
    },
    {
      number: "03",
      title: "Our mentors don't advise. They DO.",
      description: "Every mentor is an operator. Builders. Founders. CEOs. People who know the market because they bleed it.",
      side: "left"
    },
    {
      number: "04",
      title: "We don't give sessions. We build companies WITH you.",
      description: "GTM? We sit with you. First 50 customers? We plan. Investor deck? We rewrite. Fundraise? We open doors. Burning problem? We get on the next flight.",
      footer: "Because we promised you a partner, not a programme.",
      side: "right"
    },
    {
      number: "05",
      title: "We focus on founders with potential — not pedigree.",
      description: "Your father doesn't need a factory. Your resume doesn't need an IIT stamp. Your idea doesn't need jargon.",
      footer: "You just need the courage to build. We handle the rest.",
      side: "left"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-[#f5f5f0] py-32 px-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#355E3B] rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#355E3B] rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Title */}
        <div 
          className={`mb-32 text-center transition-all duration-1000 ${
            visibleItems.includes(0) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="relative inline-block">
            <h2 className="text-6xl md:text-8xl font-bold tracking-tight leading-tight mb-6">
              <span className="inline-block animate-word-float text-gray-600">WHAT</span>{' '}
              <span className="inline-block animate-word-float-delayed text-gray-600" style={{animationDelay: '0.2s'}}>MAKES</span>{' '}
              <span className="inline-block animate-word-float text-gray-600" style={{animationDelay: '0.4s'}}>US</span>
              <br />
              <span className="text-[#355E3B] relative inline-block animate-word-float-delayed" style={{animationDelay: '0.6s'}}>
                DIFFERENT
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-[#355E3B] opacity-20 animate-pulse"></span>
                <svg className="absolute -top-4 -right-8 w-16 h-16 text-[#355E3B] opacity-30 animate-spin-slow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-1 w-32 bg-[#355E3B] animate-expand-center"></div>
            <p className="text-xl text-gray-600 italic font-semibold animate-fade-in">(Slaps hard like a manifesto)</p>
            <div className="h-1 w-32 bg-[#355E3B] animate-expand-center"></div>
          </div>
        </div>

        {/* Difference Items with Center Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#355E3B] via-[#4a7c59] to-[#355E3B] transform -translate-x-1/2 animate-draw-line">
            <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-transparent to-[#355E3B] opacity-50 animate-pulse"></div>
          </div>

          <div className="space-y-32">
            {differences.map((item, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  visibleItems.includes(index + 1)
                    ? 'opacity-100'
                    : 'opacity-0'
                }`}
              >
                {/* Number Circle on Center Line */}
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                  <div className={`absolute inset-0 w-24 h-24 bg-[#355E3B] rounded-full transition-all duration-700 ${
                    visibleItems.includes(index + 1) ? 'scale-150 opacity-10 animate-ping-slow' : 'scale-0 opacity-0'
                  }`}></div>
                  <div className={`relative w-24 h-24 bg-gradient-to-br from-[#355E3B] to-[#2d4a30] rounded-full flex items-center justify-center shadow-2xl transition-all duration-700 border-4 border-white ${
                    visibleItems.includes(index + 1) ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                  } ${hoveredIndex === index ? 'scale-125 shadow-3xl' : ''}`}>
                    <span className="text-white text-3xl font-bold">
                      {item.number}
                    </span>
                  </div>
                  {/* Connecting line to card */}
                  <div className={`absolute top-1/2 ${item.side === 'left' ? 'right-full' : 'left-full'} w-16 h-0.5 bg-[#355E3B] transform -translate-y-1/2 transition-all duration-700 ${
                    visibleItems.includes(index + 1) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} style={{ transformOrigin: item.side === 'left' ? 'right' : 'left' }}></div>
                </div>

                {/* Card */}
                <div
                  className={`w-[calc(50%-4rem)] ${item.side === 'left' ? 'ml-0 mr-auto' : 'ml-auto mr-0'} transition-all duration-1000 ${
                    visibleItems.includes(index + 1)
                      ? item.side === 'left' ? 'translate-x-0' : 'translate-x-0'
                      : item.side === 'left' ? '-translate-x-32' : 'translate-x-32'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className={`relative bg-white p-10 transition-all duration-500 ${
                    hoveredIndex === index 
                      ? 'shadow-2xl scale-105' 
                      : 'shadow-xl'
                  } ${item.side === 'left' ? 'rounded-r-3xl border-l-[6px]' : 'rounded-l-3xl border-r-[6px]'} border-[#355E3B]`}>
                    
                    {/* Animated border glow */}
                    <div className={`absolute inset-0 border-2 border-[#355E3B] transition-opacity duration-500 ${
                      item.side === 'left' ? 'rounded-r-3xl' : 'rounded-l-3xl'
                    } ${hoveredIndex === index ? 'opacity-30 animate-pulse-border' : 'opacity-0'}`}></div>

                    {/* Content */}
                    <div>
                      <h3 className={`text-2xl md:text-3xl font-bold mb-5 leading-tight transition-all duration-500 ${
                        hoveredIndex === index ? 'text-[#355E3B]' : 'text-[#3a3a38]'
                      }`}>
                        {item.title}
                      </h3>
                      
                      <p className="text-lg md:text-xl leading-relaxed mb-4 text-gray-700">
                        {item.description}
                      </p>

                      {item.list && (
                        <div className="my-6 bg-[#f5f5f0] p-6 rounded-lg">
                          <ul className="space-y-3">
                            {item.list.map((listItem, listIndex) => (
                              <li 
                                key={listIndex}
                                className={`text-lg text-gray-700 relative pl-10 transition-all duration-500 ${
                                  hoveredIndex === index ? 'translate-x-2' : 'translate-x-0'
                                }`}
                                style={{ 
                                  transitionDelay: `${listIndex * 50}ms`,
                                  animation: visibleItems.includes(index + 1) ? `slideIn 0.5s ease-out ${listIndex * 100}ms forwards` : 'none',
                                  opacity: visibleItems.includes(index + 1) ? 1 : 0
                                }}
                              >
                                <span className="absolute left-0 top-1 text-[#355E3B] font-bold text-xl">→</span>
                                {listItem}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {item.footer && (
                        <div className="mt-6 pt-6 border-t-2 border-[#355E3B] relative">
                          <div className={`absolute top-0 left-0 h-0.5 bg-[#355E3B] transition-all duration-700 ${
                            hoveredIndex === index ? 'w-full' : 'w-0'
                          }`}></div>
                          <p className="text-lg md:text-xl font-semibold italic text-[#355E3B] leading-relaxed">
                            {item.footer}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Corner accent with animation */}
                    <div className={`absolute ${item.side === 'left' ? 'top-0 right-0' : 'top-0 left-0'} w-20 h-20 overflow-hidden`}>
                      <div className={`absolute ${item.side === 'left' ? '-top-10 -right-10' : '-top-10 -left-10'} w-24 h-24 bg-[#355E3B] rounded-full transition-all duration-500 ${
                        hoveredIndex === index ? 'scale-100 opacity-10' : 'scale-0 opacity-0'
                      }`}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-10px); }
        }

        @keyframes expand {
          from { width: 0; }
          to { width: 8rem; }
        }

        @keyframes expand-center {
          from { width: 0; }
          to { width: 8rem; }
        }

        @keyframes pulse-border {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.02); }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes word-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes word-float-delayed {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes draw-line {
          from { height: 0; }
          to { height: 100%; }
        }

        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.5); opacity: 0.05; }
          100% { transform: scale(2); opacity: 0; }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }

        .animate-expand {
          animation: expand 1s ease-out forwards;
        }

        .animate-expand-center {
          animation: expand-center 1.2s ease-out forwards;
        }

        .animate-pulse-border {
          animation: pulse-border 2s ease-in-out infinite;
        }

        .animate-word-float {
          animation: word-float 3s ease-in-out infinite;
        }

        .animate-word-float-delayed {
          animation: word-float-delayed 3.5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.5s ease-out forwards;
        }

        .animate-draw-line {
          animation: draw-line 2s ease-out forwards;
        }

        .animate-ping-slow {
          animation: ping-slow 3s ease-out infinite;
        }
      `}</style>
    </section>
  );
};

export default WhatMakesUsDifferent;