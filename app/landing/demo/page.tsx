'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoTextComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // If mobile, skip video setup
    if (window.innerWidth < 768) {
      setIsVideoLoaded(true);
      return () => window.removeEventListener('resize', checkMobile);
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const textElement = textRef.current;

    if (!video || !canvas || !textElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    let animationFrameId: number;

    const updateTextBackground = () => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL();
        textElement.style.backgroundImage = `url(${dataURL})`;
      }
      animationFrameId = requestAnimationFrame(updateTextBackground);
    };

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      updateTextBackground();
    };

    const handleCanPlay = () => {
      video.play().catch((e) => {
        console.error('Play error:', e);
      });
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    video.load();
    
    const playTimeout = setTimeout(() => {
      video.play().catch((e) => {
        console.log('Autoplay prevented:', e);
      });
    }, 100);

    const handleClick = () => {
      if (video.paused) {
        video.play().catch(console.error);
      }
    };
    document.addEventListener('click', handleClick);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', checkMobile);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(playTimeout);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Desktop: Hidden video for capturing frames */}
      {!isMobile && (
        <>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hidden"
            crossOrigin="anonymous"
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <canvas ref={canvasRef} className="hidden" />
        </>
      )}

      {/* Loading indicator - Desktop only */}
      {!isMobile && !isVideoLoaded && (
        <div className="absolute top-8 left-8 flex items-center gap-3 animate-pulse">
          <div className="w-2 h-2 bg-[#355E3B] rounded-full animate-bounce" />
          <span className="text-sm font-medium text-gray-600">Loading...</span>
        </div>
      )}

      {/* Content wrapper */}
      <div className={`flex flex-col items-center gap-8 md:gap-12 py-12 md:py-20 px-4 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Desktop: Text with video inside */}
        <h1
          ref={textRef}
          className={`hidden md:block relative font-black uppercase text-transparent bg-clip-text bg-center bg-cover text-center ${
            isMobile ? 'bg-gradient-to-br from-[#355E3B] to-[#2d4f32]' : ''
          }`}
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextStroke: '8px #1e3a23ff',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.15))',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '0.85',
          }}
        >
          <span className="block text-[140px] tracking-[6px] lg:text-[250px] lg:tracking-[10px]">
            sparkseed
          </span>
          <span className="block text-[100px] tracking-[5px] lg:text-[180px] lg:tracking-[8px]">
            ventures
          </span>
        </h1>

        {/* Mobile: Simplified text with gradient */}
        <div className="md:hidden text-center space-y-2">
          <h1 className="font-black uppercase text-[#355E3B] text-6xl tracking-[4px]" style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '0.9',
            textShadow: '0 2px 8px rgba(53, 94, 59, 0.2)'
          }}>
            sparkseed
          </h1>
          <h2 className="font-black uppercase text-[#355E3B] text-4xl tracking-[3px]" style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '0.9',
            textShadow: '0 2px 8px rgba(53, 94, 59, 0.2)'
          }}>
            ventures
          </h2>
        </div>

        {/* Decorative line */}
        <div className="w-16 md:w-24 h-0.5 md:h-1 bg-gradient-to-r from-transparent via-[#355E3B] to-transparent" />

        {/* Tagline - Mobile optimized */}
        <div className="max-w-4xl">
          <p className="text-[#355E3B] text-base md:text-xl lg:text-4xl text-center px-4 md:px-6 leading-relaxed font-bold">
            We Fund the Fighters. The Builders. The Crazy Ones with Impossible Goals.
          </p>
        </div>

        {/* Mobile CTA Button */}
        <div className="md:hidden mt-6">
          <a 
            href="#contact"
            className="inline-block bg-[#355E3B] text-white px-8 py-4 text-sm uppercase font-semibold tracking-wider shadow-lg hover:bg-[#2d4f32] transition-all"
          >
            Get Started
          </a>
        </div>
      </div>

      {/* Desktop click hint */}
      {!isMobile && !isVideoLoaded && (
        <div className="absolute bottom-12 text-center">
          <p className="text-sm text-gray-400 animate-pulse">
            Click anywhere if video doesn't start
          </p>
          <div className="mt-2 flex justify-center">
            <svg className="w-6 h-6 text-gray-300 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}