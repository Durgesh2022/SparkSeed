'use client';
import React, { useEffect, useRef, useState } from 'react';

const SparkSeedTeam = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const leadersRef = useRef<(HTMLDivElement | null)[]>([]);
  const mentorsRef = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollProgress(percentage);

      // Leader cards animation
      leadersRef.current.forEach((leader, index) => {
        if (leader) {
          const rect = leader.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight - 100;
          
          if (isVisible && !leader.classList.contains('animated')) {
            setTimeout(() => {
              leader.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
              leader.style.opacity = '1';
              leader.style.transform = 'translateY(0)';
              leader.style.filter = 'blur(0px)';
              leader.classList.add('animated');
            }, index * 200);
          }
        }
      });

      // Mentors section animation
      if (mentorsRef.current && !animated) {
        const rect = mentorsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setAnimated(true);
          mentorsRef.current.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          mentorsRef.current.style.opacity = '1';
          mentorsRef.current.style.transform = 'translateY(0)';
          mentorsRef.current.style.filter = 'blur(0px)';
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animated]);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#3a3a38]">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(53, 94, 59) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      <style dangerouslySetInnerHTML={{__html: `
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: #355E3B; border-radius: 4px; }
      `}} />

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight text-[#355E3B]">
              TEAM
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#3a3a38] mb-6 sm:mb-8 leading-snug">
              Leadership That's Built Companies —<br/>
              Not Just Portfolios
            </p>
            <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-[#355E3B]"></div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            {/* Mayur S */}
            <div 
              ref={(el) => {
                leadersRef.current[0] = el;
              }}
              className="opacity-0"
              style={{ 
                transform: 'translateY(50px)',
                filter: 'blur(5px)'
              }}
            >
              <div className="mb-8">
                {/* Image placeholder */}
                <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white border-2 sm:border-4 border-[#355E3B] flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#355E3B] mb-2">MS</div>
                    <div className="text-xs sm:text-sm text-[#3a3a38]/50 uppercase tracking-wider">Image Placeholder</div>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #355E3B 0, #355E3B 1px, transparent 0, transparent 50%)',
                      backgroundSize: '10px 10px'
                    }}
                  />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight">Mayur S</h2>
                <p className="text-lg sm:text-xl text-[#355E3B] font-semibold mb-4 sm:mb-6">Co-Founder & CEO</p>
                
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">
                  <p>
                    <span className="font-bold">Builder, operator, storyteller, ecosystem architect.</span>
                  </p>
                  <p>
                    A founder who has sat on both sides of the table — and now chooses to sit 
                    <span className="font-bold text-[#355E3B]"> beside founders, not above them.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* P. Raajashekar */}
            <div 
              ref={(el) => {
                leadersRef.current[1] = el;
              }}
              className="opacity-0"
              style={{ 
                transform: 'translateY(50px)',
                filter: 'blur(5px)'
              }}
            >
              <div className="mb-8">
                {/* Image placeholder */}
                <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] bg-white border-2 sm:border-4 border-[#355E3B] flex items-center justify-center mb-4 sm:mb-6 relative overflow-hidden rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#355E3B] mb-2">PR</div>
                    <div className="text-xs sm:text-sm text-[#3a3a38]/50 uppercase tracking-wider">Image Placeholder</div>
                  </div>
                  <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(45deg, #355E3B 0, #355E3B 1px, transparent 0, transparent 50%)',
                      backgroundSize: '10px 10px'
                    }}
                  />
                </div>
                
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 tracking-tight">P. Raajashekar</h2>
                <p className="text-lg sm:text-xl text-[#355E3B] font-semibold mb-4 sm:mb-6">Managing Partner</p>
                
                <div className="space-y-3 sm:space-y-4 text-base sm:text-lg leading-relaxed">
                  <p>
                    <span className="font-bold">EV, mobility & industry veteran.</span>
                  </p>
                  <p>
                    Knows how to run companies at scale, simplify complexity, and guide founders through chaos 
                    <span className="font-bold text-[#355E3B]"> with clarity.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mentors Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8 bg-[#355E3B] text-white overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent 0, transparent 50px, rgba(255,255,255,0.1) 50px, rgba(255,255,255,0.1) 51px)',
          }}
        />
        
        <div 
          ref={mentorsRef}
          className="max-w-5xl mx-auto text-center relative z-10 opacity-0"
          style={{ 
            transform: 'translateY(50px)',
            filter: 'blur(5px)'
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12 tracking-tight leading-tight">
            50+ Mentors Who Are Not Speakers.<br/>
            <span className="text-[#f5f5f0]">They Are Soldiers.</span>
          </h2>
          
          <div className="w-20 sm:w-24 md:w-32 h-0.5 sm:h-1 bg-white mx-auto mb-8 sm:mb-10 md:mb-12"></div>
          
          <p className="text-lg sm:text-xl md:text-2xl leading-relaxed mb-6 sm:mb-8">
            CEOs, CTOs, founders, operators —<br/>
            <span className="font-bold text-xl sm:text-2xl md:text-3xl">not LinkedIn influencers.</span>
          </p>
          
          <div className="mt-12 sm:mt-14 md:mt-16 pt-8 sm:pt-10 md:pt-12 border-t border-white/30">
            <p className="text-base sm:text-lg md:text-xl leading-loose opacity-90 px-2">
              Our mentors have been in the trenches. They've launched products at 2 AM, 
              pivoted when everything was falling apart, and scaled companies from 
              <span className="font-bold"> zero to hero.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight">
            Ready to Build Alongside<br/>
            <span className="text-[#355E3B]">Real Operators?</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed px-2">
            We don't invest from ivory towers.<br/>
            We build in the dirt with you.
          </p>
          
          <a 
            href="mailto:hello@sparkseed.vc" 
            className="inline-block bg-[#355E3B] text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 text-base sm:text-lg font-semibold no-underline transition-all hover:bg-[#2d4f32] hover:scale-105 rounded-lg shadow-lg"
          >
            LET'S TALK
          </a>
        </div>
      </section>
    </div>
  );
};

export default SparkSeedTeam;