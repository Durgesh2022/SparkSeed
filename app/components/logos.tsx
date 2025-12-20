'use client';
import React from 'react';

const RotatingLogoGrid = () => {
  // Sample tech logos - you can replace these with actual company logos
  const logos = [
    { name: 'Stripe', color: '#635BFF' },
    { name: 'Notion', color: '#000000' },
    { name: 'Figma', color: '#F24E1E' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Airbnb', color: '#FF5A5F' },
    { name: 'Uber', color: '#000000' },
    { name: 'Spotify', color: '#1DB954' },
    { name: 'Netflix', color: '#E50914' },
    { name: 'Discord', color: '#5865F2' },
    { name: 'Shopify', color: '#96BF48' },
    { name: 'Zoom', color: '#2D8CFF' },
    { name: 'Dropbox', color: '#0061FF' },
  ];

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center p-8 overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-track {
          animation: scroll 30s linear infinite;
        }

        .logo-track:hover {
          animation-play-state: paused;
        }

        .logo-item {
          transition: all 0.3s ease;
        }

        .logo-item:hover {
          transform: scale(1.15);
        }
      `}</style>

      <div className="w-full max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 tracking-tight text-[#3a3a38]">
            Here are the companies who trusted us
          </h2>
          <p className="text-xl text-[#355E3B] font-semibold">
            not with money —
but with their dreams.
          </p>
        </div>

        <div className="relative overflow-hidden py-8">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f5f5f0] to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f5f5f0] to-transparent z-10"></div>

          <div className="logo-track flex gap-12 items-center">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={index}
                className="logo-item flex-shrink-0 w-32 h-32 flex items-center justify-center"
              >
                <div className="w-full h-full flex items-center justify-center bg-white rounded-lg shadow-lg border border-[#3a3a38]/10">
                  <div className="text-center px-4">
                    <div 
                      className="text-3xl font-bold mb-1"
                      style={{ color: logo.color }}
                    >
                      {logo.name.charAt(0)}
                    </div>
                    <div 
                      className="text-xs font-semibold tracking-tight"
                      style={{ color: logo.color }}
                    >
                      {logo.name}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16 border-t-2 border-[#355E3B] pt-8 max-w-3xl mx-auto">
          <p className="text-lg leading-relaxed text-[#3a3a38]">
            And we did <span className="font-bold text-[#355E3B]">everything to honour that trust</span> — 
            We still are —
We always will.

          </p>
        </div>
      </div>
    </div>
  );
};

export default RotatingLogoGrid;