'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoTextComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const textElement = textRef.current;

    if (!video || !canvas || !textElement) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 1920;
    canvas.height = 1080;

    let animationFrameId: number;

    const updateTextBackground = () => {
      // Draw current video frame to canvas
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert canvas to data URL and set as text background
        const dataURL = canvas.toDataURL();
        textElement.style.backgroundImage = `url(${dataURL})`;
      }

      // Continue updating
      animationFrameId = requestAnimationFrame(updateTextBackground);
    };

    // Start updating when video is ready
    const handleLoadedData = () => {
      console.log('Video loaded successfully');
      setIsVideoLoaded(true);
      updateTextBackground();
    };

    const handleCanPlay = () => {
      console.log('Video can play');
      video.play().catch((e) => {
        console.error('Play error:', e);
      });
    };

    const handleError = (e: Event) => {
      console.error('Video error:', e);
      console.error('Video error details:', video.error);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    // Force load and play
    video.load();
    
    // Attempt to play after a short delay
    const playTimeout = setTimeout(() => {
      video.play().catch((e) => {
        console.log('Autoplay prevented, waiting for user interaction:', e);
      });
    }, 100);

    // Add click handler to entire document to start video
    const handleClick = () => {
      if (video.paused) {
        video.play().catch(console.error);
      }
    };
    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      document.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(playTimeout);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f5f0' }}>      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Hidden video for capturing frames */}
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
        Your browser does not support the video tag.
      </video>

      {/* Hidden canvas for capturing video frames */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Loading indicator */}
      {!isVideoLoaded && (
        <div className="absolute top-8 left-8 flex items-center gap-3 animate-pulse">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
          <span className="text-sm font-medium text-gray-600">Loading video...</span>
        </div>
      )}

      {/* Content wrapper with fade-in animation */}
      <div className={`flex flex-col items-center gap-12 py-20 px-4 transition-opacity duration-1000 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Text with video inside */}
        <h1
          ref={textRef}
          className="relative font-black uppercase text-transparent bg-clip-text bg-center bg-cover text-center"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextStroke: '8px #1e3a23ff',
            filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.15))',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: '0.85',
          }}
        >
          <span className="block text-[240px] tracking-[8px] lg:text-[250px] lg:tracking-[10px] md:text-[140px] md:tracking-[6px] sm:text-[80px] sm:tracking-[4px]">
            sparkseed
          </span>
          <span className="block text-[160px] tracking-[6px] lg:text-[180px] lg:tracking-[8px] md:text-[100px] md:tracking-[5px] sm:text-[60px] sm:tracking-[3px]">
            ventures
          </span>
        </h1>
        {/* Decorative line */}
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent" />

        {/* Paragraph with better typography */}
        <div className="max-w-4xl space-y-4">
          <p className="text-[#355E3B] text-lg md:text-xl lg:text-4xl text-center px-6 leading-relaxed font-bold">
            We Fund the Fighters. The Builders. The Crazy Ones with Impossible Goals.
          </p>
          
          
        </div>

        
      </div>

      {/* Click hint with better styling */}
      {!isVideoLoaded && (
        <div className="absolute bottom-12 text-center">
          <p className="text-sm text-gray-400 animate-pulse">
            Click anywhere if video doesn't start automatically
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