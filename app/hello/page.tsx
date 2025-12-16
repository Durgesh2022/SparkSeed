'use client';
import Spline from '@splinetool/react-spline';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cursorColor, setCursorColor] = useState('#355E3B');
  const [mouseX, setMouseX] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const windowWidth = window.innerWidth;
      const midpoint = windowWidth / 2;
      
      setMouseX(x);
      
      // Left side = green, Right side = green (you can change these)
      if (x < midpoint) {
        setCursorColor('#355E3B'); // green
      } else {
        setCursorColor('#355E3B'); // green
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="relative w-full h-full overflow-hidden transition-all duration-300"
    >
      {/* Loading State */}
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-white text-xl">Loading 3D Scene...</div>
        </div>
      )}
      
      {/* Spline 3D Background */}
      <div 
        className="absolute top-20 left-0 w-full h-full z-0"
        style={{
          boxShadow: `0 0 20px ${cursorColor}40`
        }}
      >
        <Spline
          scene="https://prod.spline.design/y8AJZ8HVIYMq8epE/scene.splinecode"
          onLoad={() => setIsLoading(false)}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'auto'
          }}
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 h-full">
        <div className="grid grid-cols-12 gap-4 mt-40 mb-16">
          <div className="col-span-12">
            <div className="relative overflow-hidden">
              {/* SparkSeed Vector Graphic */}
              <svg viewBox="0 0 900 120" xmlns="http://www.w3.org/2000/svg" className="mb-8 w-full">
                <text 
                  x="0" 
                  y="110" 
                  fontSize="150" 
                  fontWeight="bold" 
                  fill="transparent" 
                  stroke={cursorColor}
                  strokeWidth="6" 
                  letterSpacing="2"
                  style={{ transition: 'stroke 0.3s ease' }}
                >
                  SPARKSEED
                </text>
              </svg>

              <h1
                className="text-5xl font-bold leading-tight mb-6 tracking-tight transition-all duration-300"
                style={{
                  color: 'transparent',
                  WebkitTextStroke: `3px ${cursorColor}`
                }}
              >
                We Fund the Fighters -
                The Builders <br />
                The Crazy Ones with
                Impossible Goals.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}