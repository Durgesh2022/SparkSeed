'use client'
import React, { useEffect, useRef, useState } from 'react';
import Hello from '../demo2/page';
import Demo from './demo/page'

const SparkSeedVC: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryCaptionRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const footerCtaRef = useRef<HTMLDivElement>(null);
  const footerSvgPathsRef = useRef<SVGPathElement[]>([]);
  const [footerAnimated, setFooterAnimated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

// Update your useEffect to include this scroll listener
useEffect(() => {
  const handleScroll = () => {
    // ... your existing scroll code ...
    
    // Add navbar background change on scroll
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, [footerAnimated]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;
      setScrollProgress(percentage);

      // Hero animations
      const heroTrigger = window.innerHeight;
      const heroProgress = Math.min(scrollTop / heroTrigger, 1);
      
      if (heroImageRef.current) {
        const scale = 0 + heroProgress * 1;
        const opacity = heroProgress;
        const blur = 8 - heroProgress * 8;
        heroImageRef.current.style.transform = `scale(${scale})`;
        heroImageRef.current.style.opacity = `${opacity}`;
        heroImageRef.current.style.filter = `blur(${blur}px)`;
      }

      if (aboutTextRef.current) {
        const translateY = 50 - heroProgress * 50;
        const opacity = heroProgress;
        const blur = 5 - heroProgress * 5;
        aboutTextRef.current.style.transform = `translateY(${translateY}px)`;
        aboutTextRef.current.style.opacity = `${opacity}`;
        aboutTextRef.current.style.filter = `blur(${blur}px)`;
      }

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

      // Footer animations
      if (footerRef.current && !footerAnimated) {
        const footerTop = footerRef.current.getBoundingClientRect().top;
        if (footerTop < window.innerHeight - 100) {
          setFooterAnimated(true);
          
          // Animate footer SVG paths
          footerSvgPathsRef.current.forEach((path, index) => {
            if (path) {
              setTimeout(() => {
                path.style.transition = 'all 1.4s cubic-bezier(0.25, 0.1, 0.25, 1)';
                path.style.opacity = '1';
                path.style.transform = 'translateY(0)';
                path.style.filter = 'blur(0px)';
              }, index * 80);
            }
          });

          // Animate footer CTA
          if (footerCtaRef.current) {
            footerCtaRef.current.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
            footerCtaRef.current.style.opacity = '1';
            footerCtaRef.current.style.transform = 'translateY(0)';
            footerCtaRef.current.style.filter = 'blur(0px)';
          }
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [footerAnimated]);

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
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background-color: #355E3B; border-radius: 4px; }
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
      <a href="#soul" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">our soul</a>
      <a href="#movement" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">the movement</a>
    </nav>
  </div>
</header>

        {/* Video Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative pt-10">
  {/* <div className="w-full mx-auto">
    <div className="relative">
      
      <div className="text-center mb-12">
        <h1 className="text-7xl font-bold mb-6 tracking-tight leading-tight">
          Not a typical VC fund.
          <br />
          <span className="text-[#355E3B] relative inline-block">
            Not a fancy accelerator.
            <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 6 Q75 0, 150 6 T300 6" stroke="#355E3B" strokeWidth="3" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>
        <p className="text-xl text-[#2c2c2a]/70 max-w-2xl mx-auto">
          We are a ground-level company builders' army — backing founders who start from dust and aim for the sky.
        </p>
      </div>

      
      <div className="relative group h-[65vh] bg-white">
       
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              style={{
                clipPath: 'url(#textClip)'
              }}
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="textClip" clipPathUnits="objectBoundingBox">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="200"
                fontWeight="900"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                BUILD
              </text>
            </clipPath>
          </defs>
        </svg>

        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 
            className="text-[12vw] font-black leading-none tracking-tighter"
            style={{
              color: 'transparent',
              WebkitTextStroke: '2px #355E3B',
              textStroke: '2px #355E3B',
              textTransform: 'uppercase',
              fontWeight: '900'
            }}
          >
            BUILD
          </h2>
        </div>
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-[#355E3B]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ clipPath: 'url(#textClip)' }} />
        
      
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#355E3B] opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#355E3B] opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#355E3B] opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#355E3B] opacity-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </div>
  </div> */}
  <Demo />
</section>

        <Hello />

      {/* Hero Section */}
      {/* <section id="home" className="min-h-screen flex items-center">
        <div className="w-full max-w-full mx-auto px-8">
          
        
          

        
          <div className="grid grid-cols-12 gap-4 items-end mb-8">
            <div className="col-span-5">
              <div 
                ref={heroImageRef}
                className="w-full overflow-hidden opacity-0 relative"
                style={{ 
                  transform: 'scale(0)',
                  transformOrigin: 'bottom',
                  filter: 'blur(8px)'
                }}
              >
                <img 
                  src="/9.jpg" 
                  alt="Founder"
                  className="w-full h-[500px] object-cover"
                />
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'url(/9.png)',
                    backgroundPosition: 'top right',
                    backgroundSize: 'cover',
                    mixBlendMode: 'screen'
                  }}
                />
              </div>
            </div>
            
            <div className="col-span-3"></div>
            
            <div className="col-span-4 pl-8 text-right overflow-hidden">
              <div 
                ref={aboutTextRef}
                className="text-lg leading-relaxed opacity-0"
                style={{ 
                  transform: 'translateY(50px)',
                  filter: 'blur(5px)'
                }}
              >
                <p className="text-2xl font-semibold mb-4">
                  Not a typical VC fund.<br/>
                  Not a fancy accelerator.
                </p>
                <p className="text-base">
                  We are a ground-level company builders' army — backing founders who start from dust and aim for the sky.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Our Soul Section */}
      <section id="soul" ref={galleryRef} className="min-h-screen flex items-center overflow-hidden">
  <div className="w-full  mx-auto px-8">
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

      {/* Footer / Contact Section
      <footer 
        ref={footerRef}
        id="contact"
        className="min-h-[60vh] relative flex flex-col items-center justify-center overflow-hidden py-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(245, 245, 240, 0.1) 0%, rgba(245, 245, 240, 0.7) 40%, #f5f5f0 100%)'
        }}
      >
        <div className="w-full max-w-6xl mx-auto px-8 text-center">
          <div 
            ref={footerCtaRef}
            className="opacity-0"
            style={{ 
              transform: 'translateY(30px)',
              filter: 'blur(5px)'
            }}
          >
            <h2 className="text-6xl font-bold mb-12 tracking-tight">
              Ready to Build<br/>
              <span className="text-[#355E3B]">Something Impossible?</span>
            </h2>
            
            <p className="text-xl mb-12 leading-relaxed max-w-3xl mx-auto">
              If you're a founder with fire in your eyes and grit in your bones, 
              we want to hear from you. No fancy deck needed. Just bring your ambition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="mailto:hello@sparkseed.vc" 
                className="inline-block bg-[#355E3B] text-white px-8 py-4 text-lg font-semibold no-underline transition-all hover:bg-[#2d4f32] hover:scale-105"
              >
                GET IN TOUCH
              </a>
              <a 
                href="mailto:hello@sparkseed.vc" 
                className="text-xl text-[#355E3B] font-semibold hover:opacity-70 transition-opacity"
              >
                hello@sparkseed.vc
              </a>
            </div>

            <div className="mt-16 pt-12 border-t border-[#3a3a38]/20">
              <p className="text-sm text-[#3a3a38]/60">
                © 2024 SparkSeed VC. Building the future, one founder at a time.
              </p>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default SparkSeedVC;