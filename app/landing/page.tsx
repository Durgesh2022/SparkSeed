'use client'
import React, { useEffect, useRef } from 'react';
import Hello from '../demo2/page';
import Demo from './demo/page';

const SparkSeedVC: React.FC = () => {
  const galleryCaptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {

      // Gallery caption animation
      if (galleryCaptionRef.current) {
        const captionTop = galleryCaptionRef.current.getBoundingClientRect().top;
        const galleryProgress = Math.max(0, Math.min(1, (window.innerHeight - captionTop) / window.innerHeight));
        
        const captionY = 30 - galleryProgress * 30;
        const captionBlur = 5 - galleryProgress * 5;
        galleryCaptionRef.current.style.transform = `translateY(${captionY}px)`;
        galleryCaptionRef.current.style.opacity = `${galleryProgress}`;
        galleryCaptionRef.current.style.filter = `blur(${captionBlur}px)`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#3a3a38] relative overflow-x-hidden">
      {/* Video Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-10">
        <Demo />
      </section>

      <Hello />

      {/* Our Soul Section */}
      <section id="soul" className="min-h-screen flex items-center overflow-hidden">
        <div className="w-full mx-auto px-8">
          <div className="mb-16">
            <p className="text-2xl font-semibold mb-6">
              Because a real founder doesn't need coffee-table theory.<br/>
              They need people who show up. Every day. On the ground.
            </p>
          </div>

          <div className="relative">
            {/* Image Background - Full Width */}
            <div className="relative h-[600px] lg:h-[700px] -mx-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#355E3B] to-[#2a4a2f] overflow-hidden shadow-2xl">
                <img 
                  src="/10.jpg" 
                  alt="Founders collaborating" 
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent"></div>
              </div>
              
              {/* Text Content Overlay - Left Side */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-7xl mx-auto px-8">
                  <div 
                    ref={galleryCaptionRef}
                    className="max-w-2xl opacity-0 text-white"
                    style={{ 
                      transform: 'translateY(30px)',
                      filter: 'blur(5px)'
                    }}
                  >
                    <div className="border-l-4 border-white pl-8 mb-12">
                      <p className="text-3xl font-bold mb-8 tracking-tight uppercase">SparkSeed was created for:</p>
                      <div className="space-y-6 text-xl leading-relaxed">
                        <p className="font-semibold">→ The founder from a small town with a big idea</p>
                        <p className="font-semibold">→ The operator who can build with zero ego and infinite grit</p>
                        <p className="font-semibold">→ The dreamer who won't quit until they change their city, their industry, their future</p>
                      </div>
                    </div>
                    
                    <div className="space-y-6 text-lg leading-loose mb-12">
                      <p>
                        We exist for <span className="font-bold">founders who hustle without an audience</span>. 
                        For <span className="font-bold">creators who don't want hand-holding</span> — they want hand-to-hand combat. 
                        For <span className="font-bold">leaders building India 3.0</span> — not slides, but systems.
                      </p>
                    </div>
                    
                    <div className="border-t-2 border-white/50 pt-8">
                      <p className="text-4xl font-bold tracking-tight">
                        This isn't investment -
                        <span className="text-[#7FBA7A]"> This is a movement.</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SparkSeedVC;