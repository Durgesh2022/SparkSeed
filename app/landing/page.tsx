'use client'
import React, { useEffect, useRef, useState } from 'react';
import Hello from '../demo2/page';
import Demo from './demo/page'

const SparkSeedVC: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryCaptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollProgress(percentage);

      // Navbar background change on scroll
      setIsScrolled(scrollTop > 50);

      // Gallery animations
      if (galleryRef.current) {
        const galleryTop = galleryRef.current.getBoundingClientRect().top;
        const galleryProgress = Math.max(0, Math.min(1, (window.innerHeight - galleryTop) / window.innerHeight));
        
        const images = galleryRef.current.querySelectorAll('.gallery-item img');
        images.forEach((img: Element, index: number) => {
          const htmlImg = img as HTMLElement;
          const delay = index * 0.1;
          const adjustedProgress = Math.max(0, galleryProgress - delay);
          const clipProgress = Math.min(adjustedProgress * 2, 1);
          htmlImg.style.clipPath = `inset(${100 - clipProgress * 100}% 0 0 0)`;
        });

        if (galleryCaptionRef.current) {
          const captionY = 30 - galleryProgress * 30;
          const captionBlur = 5 - galleryProgress * 5;
          galleryCaptionRef.current.style.transform = `translateY(${captionY}px)`;
          galleryCaptionRef.current.style.opacity = `${galleryProgress}`;
          galleryCaptionRef.current.style.filter = `blur(${captionBlur}px)`;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#3a3a38] relative overflow-x-hidden">
      <style jsx>{`
        @keyframes noise {
          0% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -3%); }
          20% { transform: translate(-4%, 2%); }
          30% { transform: translate(2%, -4%); }
          40% { transform: translate(-2%, 5%); }
          50% { transform: translate(-4%, 2%); }
          60% { transform: translate(3%, 0); }
          70% { transform: translate(0, 3%); }
          80% { transform: translate(-3%, 0); }
          90% { transform: translate(2%, 2%); }
          100% { transform: translate(1%, 0); }
        }
      `}</style>

      {/* Header */}
      <header 
        className={`fixed top-0 left-0 w-full h-[90px] py-8 z-[60] transition-all duration-300 ${
          isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between max-w-full mx-auto px-8">
          <div className="text-2xl font-bold tracking-tight">SPARKSEED</div>
          
          <div className="flex items-center ml-auto">
            <a 
              href="#contact" 
              className="inline-block bg-[#355E3B] text-white px-4 py-2 text-sm uppercase no-underline transition-all hover:bg-[#2d4f32]"
            >
              +GET IN TOUCH
            </a>
            <div className="w-[40vw] h-0.5 ml-4 bg-[rgba(34,34,32,0.1)]">
              <div 
                className="h-full bg-[#355E3B] transition-all duration-100"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>

          <nav className="flex gap-12 ml-12">
            <a href="#home" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">home</a>
            <a href="/about/investors" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">for investors</a>
            <a href="/about/founders" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">for founders</a>
          </nav>
        </div>
      </header>

      {/* Video Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative pt-10">
        <Demo />
      </section>

      <Hello />

      {/* Our Soul Section */}
      <section id="soul" ref={galleryRef} className="min-h-screen flex items-center overflow-hidden">
        <div className="w-full mx-auto px-8">
          <div className="mb-16">
            <h2 className="text-5xl font-bold mb-8"></h2>
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