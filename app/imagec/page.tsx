'use client';

import React, { useEffect, useRef, useState } from 'react';

interface LayerImage {
  src: string;
  alt: string;
}

const ScrollGridAnimation = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  // Layer 1 images
  const layer1Images: LayerImage[] = [
    { src: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=800&auto=format&fit=crop&q=60', alt: 'Fashion 1' },
    { src: 'https://images.unsplash.com/photo-1556304044-0699e31c6a34?w=800&auto=format&fit=crop&q=60', alt: 'Fashion 2' },
    { src: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=800&auto=format&fit=crop&q=60', alt: 'Fashion 3' },
    { src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&auto=format&fit=crop&q=60', alt: 'Fashion 4' },
    { src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=800&auto=format&fit=crop&q=60', alt: 'Fashion 5' },
    { src: 'https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=800&auto=format&fit=crop&q=60', alt: 'Sneakers' },
  ];

  // Layer 2 images
  const layer2Images: LayerImage[] = [
    { src: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=800&auto=format&fit=crop&q=60', alt: 'Product 1' },
    { src: 'https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=800&auto=format&fit=crop&q=60', alt: 'Tech product' },
    { src: 'https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=800&auto=format&fit=crop&q=60', alt: 'Onewheel' },
    { src: 'https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=800&auto=format&fit=crop&q=60', alt: 'Watch' },
    { src: 'https://plus.unsplash.com/premium_photo-1706078438060-d76ced26d8d5?w=800&auto=format&fit=crop&q=60', alt: 'Camera' },
    { src: 'https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=800&auto=format&fit=crop&q=60', alt: 'Item' },
  ];

  // Layer 3 images
  const layer3Images: LayerImage[] = [
    { src: 'https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?w=800&auto=format&fit=crop&q=60', alt: 'Typewriter' },
    { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=60', alt: 'Fashion item' },
  ];

  const centerImage = 'https://assets.codepen.io/605876/model-shades.jpg?format=auto&quality=100';

  // Easing functions
  const easeOutSine = (t: number) => Math.sin((t * Math.PI) / 2);
  const easeOutPower1 = (t: number) => 1 - Math.pow(1 - t, 1);
  const easeOutPower2 = (t: number) => 1 - Math.pow(1 - t, 2);
  const easeOutPower3 = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeOutPower4 = (t: number) => 1 - Math.pow(1 - t, 4);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !centerRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress through the section
      const scrollStart = -rect.top;
      const scrollEnd = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrollStart / scrollEnd));

      // Animate layers with range stagger
      // Layer 1
      if (layer1Ref.current) {
        const layerProgress = Math.max(0, Math.min(1, (progress - 0) / 0.8));
        const fadeProgress = easeOutSine(layerProgress);
        const scaleProgress = easeOutPower1(layerProgress);
        
        layer1Ref.current.style.opacity = fadeProgress > 0.55 ? `${fadeProgress}` : '0';
        layer1Ref.current.style.transform = scaleProgress > 0.3 ? `scale(${scaleProgress})` : 'scale(0)';
      }

      // Layer 2
      if (layer2Ref.current) {
        const layerProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.7));
        const fadeProgress = easeOutSine(layerProgress);
        const scaleProgress = easeOutPower1(layerProgress);
        
        layer2Ref.current.style.opacity = fadeProgress > 0.55 ? `${fadeProgress}` : '0';
        layer2Ref.current.style.transform = scaleProgress > 0.3 ? `scale(${scaleProgress})` : 'scale(0)';
      }

      // Layer 3
      if (layer3Ref.current) {
        const layerProgress = Math.max(0, Math.min(1, (progress - 0.2) / 0.6));
        const fadeProgress = easeOutSine(layerProgress);
        const scaleProgress = easeOutPower1(layerProgress);
        
        layer3Ref.current.style.opacity = fadeProgress > 0.55 ? `${fadeProgress}` : '0';
        layer3Ref.current.style.transform = scaleProgress > 0.3 ? `scale(${scaleProgress})` : 'scale(0)';
      }

      // Animate center image - scale from full viewport to grid cell size
      if (centerRef.current) {
        const scaleProgress = Math.max(0, Math.min(1, (progress - 0.1) / 0.7));
        const easedProgress = easeOutPower2(scaleProgress);
        
        // Get the final grid cell dimensions
        const gridCell = centerRef.current;
        const finalWidth = gridCell.offsetWidth;
        const finalHeight = gridCell.offsetHeight;
        
        // Start from full viewport dimensions
        const startWidth = window.innerWidth;
        const startHeight = window.innerHeight;
        
        // Interpolate between start and end
        const currentWidth = startWidth + (finalWidth - startWidth) * easedProgress;
        const currentHeight = startHeight + (finalHeight - startHeight) * easedProgress;
        
        const img = gridCell.querySelector('img') as HTMLImageElement;
        if (img) {
          img.style.width = `${currentWidth}px`;
          img.style.height = `${currentHeight}px`;
        }
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-black dark:text-white relative overflow-x-clip">
      {/* Main Content */}
      <main>
        {/* Scroll Section with Grid */}
        <section 
          ref={sectionRef}
          className="relative min-h-[300vh]"
        >
          <div className="sticky top-0 min-h-screen w-screen flex items-center justify-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] max-w-[calc(100%-4rem)] grid grid-cols-5 gap-[clamp(10px,7.35vw,80px)] auto-rows-auto">
              
              {/* Layer 1 */}
              <div 
                ref={layer1Ref}
                className="col-span-5 row-span-3 grid grid-cols-5 gap-[clamp(10px,7.35vw,80px)] transition-opacity duration-300"
                style={{
                  gridColumn: '1 / -1',
                  gridRow: '1 / 4',
                  opacity: 0,
                  transform: 'scale(0)',
                }}
              >
                {layer1Images.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      gridColumn: idx % 2 === 0 ? '1' : '5',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full aspect-[4/5] object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>

              {/* Layer 2 */}
              <div 
                ref={layer2Ref}
                className="col-span-5 row-span-3 grid grid-cols-5 gap-[clamp(10px,7.35vw,80px)] transition-opacity duration-300"
                style={{
                  gridColumn: '1 / -1',
                  gridRow: '1 / 4',
                  opacity: 0,
                  transform: 'scale(0)',
                }}
              >
                {layer2Images.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      gridColumn: idx % 2 === 0 ? '2' : '4',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full aspect-[4/5] object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>

              {/* Layer 3 */}
              <div 
                ref={layer3Ref}
                className="col-span-5 row-span-3 grid grid-cols-5 gap-[clamp(10px,7.35vw,80px)] transition-opacity duration-300"
                style={{
                  gridColumn: '1 / -1',
                  gridRow: '1 / 4',
                  opacity: 0,
                  transform: 'scale(0)',
                }}
              >
                {layer3Images.map((img, idx) => (
                  <div
                    key={idx}
                    style={{
                      gridColumn: '3',
                      gridRow: idx === layer3Images.length - 1 ? '3' : 'auto',
                    }}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full aspect-[4/5] object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>

              {/* Center Scaler Image */}
              <div 
                ref={centerRef}
                className="relative z-10 w-full aspect-[4/5]"
                style={{
                  gridColumn: '3',
                  gridRow: '2',
                }}
              >
                <img
                  src={centerImage}
                  alt="Featured model"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover rounded-2xl transition-all duration-100"
                  style={{
                    width: '100vw',
                    height: '100vh',
                  }}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ScrollGridAnimation;