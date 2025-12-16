'use client';
import React, { useEffect, useRef } from 'react';

const CircularLogoAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const logoImages = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Animation parameters
    let rotation1 = 0;
    let rotation2 = 0;

    // Logos positions
    type LogoKey = keyof typeof logoUrls;

const outerLogos: {
  name: LogoKey;
  color: string;
  angle: number;
}[] = [
  { name: 'invstt', color: '#FF6B35', angle: 0 },
  { name: 'avinya', color: '#5D9C3A', angle: Math.PI / 2 },
  { name: 'evolvex', color: '#E63946', angle: Math.PI },
];


    // Logo URLs - Replace these with your actual logo URLs
    const logoUrls = {
      center: 'https://api.dicebear.com/7.x/shapes/svg?seed=wfc&backgroundColor=F7931E',
      inner: 'https://api.dicebear.com/7.x/shapes/svg?seed=wfcgaf&backgroundColor=FF6B35',
      invstt: 'https://api.dicebear.com/7.x/shapes/svg?seed=invstt&backgroundColor=FF6B35',
      avinya: 'https://api.dicebear.com/7.x/shapes/svg?seed=avinya&backgroundColor=5D9C3A',
      evolvex: 'https://api.dicebear.com/7.x/shapes/svg?seed=evolvex&backgroundColor=E63946',
    };

const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        if (logoImages.current[src]) {
          resolve(logoImages.current[src]);
          return;
        }
        const img = new Image();
        img.onload = () => {
          logoImages.current[src] = img;
          resolve(img);
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    const drawCircle = (
  x: number,
  y: number,
  radius: number,
  color: string,
  dashed: boolean = false
): void => {
  ctx.beginPath();
  if (dashed) {
    ctx.setLineDash([10, 8]);
  } else {
    ctx.setLineDash([]);
  }
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.globalAlpha = 0.3;
  ctx.stroke();
  ctx.globalAlpha = 1;
};


    const drawLogo = (
  x: number,
  y: number,
  name: string,
  color: string,
  size: number = 40,
  imageSrc: string | null = null
): void => {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
  ctx.shadowBlur = 15;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 5;

  ctx.beginPath();
  ctx.arc(x, y, size / 2, 0, Math.PI * 2);
  ctx.fillStyle = 'white';
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.stroke();

  if (imageSrc && logoImages.current[imageSrc]) {
    const img = logoImages.current[imageSrc];
    const imgSize = size * 0.7;
    ctx.drawImage(
      img,
      x - imgSize / 2,
      y - imgSize / 2,
      imgSize,
      imgSize
    );
  } else {
    ctx.fillStyle = color;
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, x, y);
  }
};


    // Load all images first
    Promise.all(Object.values(logoUrls).map(url => loadImage(url))).then(() => {
      animate();
    }).catch(() => {
      // If images fail to load, still start animation with text fallback
      animate();
    });

    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw concentric circles
      drawCircle(centerX, centerY, 100, '#355E3B', true);
      drawCircle(centerX, centerY, 200, '#355E3B', true);
      drawCircle(centerX, centerY, 320, '#355E3B', true);

      // Draw center logo
      drawLogo(centerX, centerY, 'WFC', '#F7931E', 90, logoUrls.center);

      // Draw inner circle logos (rotating clockwise)
      rotation1 += 0.005;
      const innerRadius = 150;
      const innerX = centerX + Math.cos(rotation1) * innerRadius;
      const innerY = centerY + Math.sin(rotation1) * innerRadius;
      drawLogo(innerX, innerY, 'WFC GAF', '#FF6B35', 60, logoUrls.inner);

      // Draw middle circle with counter-clockwise rotation
      rotation2 -= 0.003;
      
      // Draw outer circle logos (static positions but rotating)
      const outerRadius = 320;
      outerLogos.forEach((logo) => {
        const angle = logo.angle + rotation2;
        const x = centerX + Math.cos(angle) * outerRadius;
        const y = centerY + Math.sin(angle) * outerRadius;
        const imageKey = logo.name.toLowerCase();
        drawLogo(x, y, logo.name, logo.color, 65, logoUrls[imageKey]);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-orange-50/20 flex items-center justify-center p-8">
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Section - Text Content */}
        <div className="space-y-8">
          <h1 className="text-4xl lg:text-5xl text-black font-bold tracking-tight leading-tight">
            Not a typical VC fund.
            <br />
            <span className="text-[#355E3B] relative inline-block mt-2">
              Not a fancy accelerator.
              <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 6 Q75 0, 150 6 T300 6" stroke="#355E3B" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-xl">
            We are a ground-level company builders' army — backing founders who start from dust and aim for the sky.
          </p>
          <div className="flex gap-4 pt-4">
            <button className="px-8 py-4 bg-[#355E3B] text-white rounded-lg font-semibold hover:bg-[#2a4a2e] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Apply as a Founder
            </button>
            <button className="px-8 py-4 border-2 border-[#355E3B] text-[#355E3B] rounded-lg font-semibold hover:bg-[#355E3B] hover:text-white transition-all">
              Invest in the Future
            </button>
          </div>
        </div>

        {/* Right Section - Circular Animation */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={700}
              height={700}
              className="max-w-full h-auto drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularLogoAnimation;