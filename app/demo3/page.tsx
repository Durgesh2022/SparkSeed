'use client';
import React, { useEffect, useRef } from 'react';

const InvestmentThesisSection = () => {
  const galleryCaptionRef = useRef<HTMLDivElement | null>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target instanceof HTMLElement) {
          entry.target.style.transition = 'all 1s ease-out';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.filter = 'blur(0)';
        }
      });
    },
    { threshold: 0.2 }
  );

  if (galleryCaptionRef.current) {
    observer.observe(galleryCaptionRef.current);
  }

  return () => {
    if (galleryCaptionRef.current) {
      observer.unobserve(galleryCaptionRef.current);
    }
  };
}, []);


  return (
    <div className="relative overflow-y-hidden">
  <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      <img src="/11.jpg" alt="Founders" className="w-full h-full object-cover opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
    </div>

    <div className="absolute inset-0 flex items-center px-4">
      <div className="max-w-7xl w-full mx-auto">
        <div
          ref={galleryCaptionRef}
          className="max-w-2xl opacity-0 text-white"
          style={{ transform: 'translateY(30px)', filter: 'blur(5px)' }}
        >
              <div className="border-l-4 border-white pl-8 mb-12">
                <p className="text-3xl font-bold mb-8 tracking-tight uppercase">We back founders who can turn:</p>
                <div className="space-y-6 text-xl leading-relaxed">
                  <p className="font-semibold">→ Broken industries into billion-rupee opportunities</p>
                  <p className="font-semibold">→ Sleepy markets into high-growth ecosystems</p>
                  <p className="font-semibold">→ Traditional sectors into tech-powered machines</p>
                  <p className="font-semibold">→ Local solutions into national companies</p>
                </div>
              </div>
              
              <div className="space-y-6 text-lg leading-loose mb-12">
                <p>
                  We invest in <span className="font-bold">the first spark</span> and stay till <span className="font-bold">the final scale</span>.
                </p>
                <p>
                  Because <span className="font-bold text-[#7FBA7A]">compounding doesn't start with money</span>.
                </p>
              </div>
              
              <div className="border-t-2 border-white/50 pt-8">
                <p className="text-4xl font-bold tracking-tight">
                  It starts with
                  <span className="text-[#7FBA7A]"> belief.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentThesisSection;