'use client';

import { useEffect, useRef, useState } from 'react';

export default function ImageTextComponent() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollPositionRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);


  // Sample images - replace with your actual image URLs
  const images = [
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop',
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    if (window.innerWidth < 768) {
      setIsLoaded(true);
      return () => window.removeEventListener('resize', checkMobile);
    }

    const canvas = canvasRef.current;
    const textElement = textRef.current;

    if (!canvas || !textElement) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    canvas.width = 1920;
    canvas.height = 1080;

    const imageElements: HTMLImageElement[] = [];
    let loadedCount = 0;

    // Load all images
    images.forEach((src, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoaded(true);
          startAnimation();
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image ${index}`);
        loadedCount++;
        if (loadedCount === images.length) {
          setIsLoaded(true);
          startAnimation();
        }
      };
      img.src = src;
      imageElements.push(img);
    });

    const imageWidth = 384;
    const imageHeight = 1080;
    const totalWidth = imageWidth * images.length;

    const drawImages = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const repeats = Math.ceil(canvas.width / totalWidth) + 2;

      for (let repeat = 0; repeat < repeats; repeat++) {
        imageElements.forEach((img, index) => {
          if (img.complete && img.naturalWidth > 0) {
            const baseX = repeat * totalWidth + index * imageWidth;
            const x = (baseX - scrollPositionRef.current) % (totalWidth * repeats);
            
            if (x > -imageWidth && x < canvas.width + imageWidth) {
              ctx.drawImage(img, x, 0, imageWidth, imageHeight);
            }
          }
        });
      }

      const dataURL = canvas.toDataURL('image/jpeg', 0.92);
      textElement.style.backgroundImage = `url(${dataURL})`;
      textElement.style.backgroundSize = 'cover';
      textElement.style.backgroundPosition = 'center';
    };

    const startAnimation = () => {
      let lastTime = performance.now();
      
      const animate = (currentTime: number) => {
        const deltaTime = currentTime - lastTime;
        lastTime = currentTime;
        
        scrollPositionRef.current += (deltaTime / 1000) * 120;
        
        if (scrollPositionRef.current >= totalWidth) {
          scrollPositionRef.current = scrollPositionRef.current % totalWidth;
        }
        
        drawImages();
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f5f5f0' }}>
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Desktop: Hidden canvas for capturing image carousel */}
      {!isMobile && (
        <canvas ref={canvasRef} className="hidden" />
      )}

      {/* Loading indicator - Desktop only */}
      {!isMobile && !isLoaded && (
        <div className="absolute top-8 left-8 flex items-center gap-3 animate-pulse">
          <div className="w-2 h-2 bg-[#355E3B] rounded-full animate-bounce" />
          <span className="text-sm font-medium text-gray-600">Loading...</span>
        </div>
      )}

      {/* Mobile: Scrolling Image Carousel Background */}
      {isMobile && (
        <div className="absolute inset-0 overflow-hidden opacity-40">
          <div className="flex h-full" style={{
            animation: 'scrollMobile 30s linear infinite',
            width: 'max-content'
          }}>
            {[...images, ...images].map((src, index) => (
              <img
                key={index}
                src={src}
                alt=""
                className="h-full w-80 object-cover flex-shrink-0"
                style={{ display: 'block' }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Content wrapper */}
      <div className={`relative z-10 flex flex-col items-center gap-8 md:gap-12 py-12 md:py-20 px-4 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Desktop: Text with moving images inside */}
        <h1
          ref={textRef}
          className="hidden md:block relative font-black uppercase text-transparent bg-clip-text bg-center bg-cover text-center"
          style={{
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextStroke: '12px #1e3a23ff',
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

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollMobile {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}} />
    </div>
  );
}