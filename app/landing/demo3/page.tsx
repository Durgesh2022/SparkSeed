'use client';
import React, { useEffect, useState } from 'react';

const InnovatorsLanding = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
  setMounted(true);

  const handleMouseMove = (e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  window.addEventListener('mousemove', handleMouseMove);
  return () => window.removeEventListener('mousemove', handleMouseMove);
}, []);


  // Generate random floating shapes
  const shapes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 50 + 20,
    delay: Math.random() * 3,
    duration: Math.random() * 4 + 5,
    opacity: Math.random() * 0.3 + 0.2,
    type: i % 3 // 0: circle, 1: triangle, 2: square
  }));

  return (
    <div className="relative min-h-screen bg-[#f5f5f0] overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-pattern animate-grid-flow" />
      </div>

      {/* Floating Geometric Shapes */}
      {shapes.map((shape) => (
        <div
          key={shape.id}
          className="absolute animate-float-multi"
          style={{
            left: `${shape.left}%`,
            top: `${shape.top}%`,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            animationDelay: `${shape.delay}s`,
            animationDuration: `${shape.duration}s`,
            opacity: shape.opacity,
            transform: mounted 
              ? `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px) rotate(${shape.id * 10}deg)`
              : 'none',
            transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {shape.type === 0 && (
            <div 
              className="w-full h-full rounded-full bg-gradient-to-br from-[#355E3B] to-[#4a7c59] animate-pulse-glow"
              style={{ animationDelay: `${shape.delay}s`, filter: 'blur(2px)' }}
            />
          )}
          {shape.type === 1 && (
            <div 
              className="w-0 h-0 animate-spin-slow"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid rgb(53, 94, 59)`,
                filter: 'blur(2px)'
              }}
            />
          )}
          {shape.type === 2 && (
            <div 
              className="w-full h-full bg-gradient-to-br from-yellow-400 to-amber-500 rotate-45 animate-spin-reverse"
              style={{ animationDelay: `${shape.delay}s`, filter: 'blur(2px)' }}
            />
          )}
        </div>
      ))}

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-[#355E3B] rounded-full mix-blend-multiply opacity-20 animate-blob" style={{ filter: 'blur(60px)' }} />
      <div className="absolute top-40 right-20 w-96 h-96 bg-[#4a7c59] rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-2000" style={{ filter: 'blur(60px)' }} />
      <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-amber-400 rounded-full mix-blend-multiply opacity-20 animate-blob animation-delay-4000" style={{ filter: 'blur(60px)' }} />

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-9xl">
          {/* Main Heading with Gradient and Glitch Effect */}
          <div className="relative inline-block">
            <h1 
              className="text-5xl md:text-6xl font-black mb-8 animate-fadeInUp tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #355E3B 0%, #4a7c59 50%, #6b9d7a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% 200%',
                animation: 'gradient-shift 3s ease infinite, fadeInUp 1s ease-out both'
              }}
            >
              We Fund the Fighters. The Builders. The Crazy Ones with Impossible Goals.
            </h1>
            {/* Glitch layers */}
            <h1 
              className="absolute top-0 left-0 text-5xl md:text-6xl font-black opacity-70 animate-glitch-1 tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #355E3B 0%, #4a7c59 50%, #6b9d7a 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              We Fund the Fighters. The Builders. The Crazy Ones with Impossible Goals.
            </h1>
          </div>

          {/* Subtitle */}
          {/* <p 
            className="text-2xl md:text-3xl text-[#3a3a38] font-light animate-fadeInUp tracking-wide"
            style={{ animationDelay: '0.3s' }}
          >
            Mentoring & investing in the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#355E3B] to-[#4a7c59] font-semibold">
              next wave
            </span>
            {' '}of innovative ideas
          </p> */}

          {/* CTA Button */}
          <div className="mt-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
            <button className="group relative px-12 py-5 bg-gradient-to-r from-[#355E3B] to-[#4a7c59] text-white text-xl font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#355E3B]/50">
              <span className="relative z-10 flex items-center gap-3">
                Get Started
                <svg className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4a7c59] to-[#355E3B] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float-multi {
          0%, 100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-30px) translateX(20px) rotate(120deg);
          }
          66% {
            transform: translateY(15px) translateX(-20px) rotate(240deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(45deg);
          }
          to {
            transform: rotate(405deg);
          }
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes glitch-1 {
          0% {
            clip-path: inset(40% 0 61% 0);
            transform: translate(0);
          }
          20% {
            clip-path: inset(92% 0 1% 0);
            transform: translate(-2px, 2px);
          }
          40% {
            clip-path: inset(43% 0 1% 0);
            transform: translate(-2px, -2px);
          }
          60% {
            clip-path: inset(25% 0 58% 0);
            transform: translate(2px, 2px);
          }
          80% {
            clip-path: inset(54% 0 7% 0);
            transform: translate(2px, -2px);
          }
          100% {
            clip-path: inset(58% 0 43% 0);
            transform: translate(0);
          }
        }

        @keyframes grid-flow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(50px);
          }
        }

        .animate-float-multi {
          animation: float-multi 8s ease-in-out infinite;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1.2s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 12s linear infinite;
        }

        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }

        .animate-glitch-1 {
          animation: glitch-1 2s infinite;
        }

        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(53, 94, 59, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(53, 94, 59, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default InnovatorsLanding;