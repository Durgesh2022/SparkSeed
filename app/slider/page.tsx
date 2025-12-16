'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Slide data
const slides = [
  {
    image: '/10.jpg',
    text: ['OUR INVESTMENT', 'THESIS'],
    content: {
      title: 'We Turn Impossibilities Into Opportunities',
      points: [
        'Broken industries → Billion-rupee opportunities',
        'Sleepy markets → High-growth ecosystems',
        'Traditional sectors → Tech-powered machines',
        'Local solutions → National companies'
      ],
      footer: 'We invest in the first spark and stay till the final scale.'
    }
  },
  {
    image: '/11.jpg',
    text: ['THE SPARKSEED', 'DIFFERENCE'],
    content: {
      title: 'You Don\'t Enter a Cohort. You Enter a War Room.',
      subtitle: '3-Month Accelerator Built for Real Builders',
      points: [
        'Mentors who don\'t just talk — they ship',
        'Investors who chase fundamentals, not valuations',
        'Growth teams who run sprints with you',
        'Weekly battlefield calls, not monthly check-ins'
      ],
      footer: 'When Demo Day comes, you aren\'t just ready — you are undeniable.'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
    text: ['Because the next India will NOT be built only in Koramangala, Bandra & Cyber City.'],
    content: {
      title: 'The Next India Won\'t Be Built Only in Tier 1 Cities. It will be built in:',
      cities: ['Coimbatore', 'Madurai', 'Jaipur', 'Indore', 'Trichy', 'Ahmedabad'],
      footer: 'We go to creators before they become visible.'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    text: ['WHY WE ARE', 'UNDERESTIMATED'],
    content: {
      title: 'You invest not only in startups — You invest in a pipeline of:',
      stats: [
        { number: '500+', label: 'High-potential companies' },
        { number: '10,000+', label: 'Screened founders' },
        { number: '1.1%', label: 'Acceptance rate' },
        { number: '10-30x', label: 'Potential returns' }
      ],
      footer: 'We give investors access before the world sees the opportunity.'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
    text: ['READY TO BUILD', 'THE FUTURE?'],
    content: {
      title: 'Join the SparkSeed Journey',
      subtitle: 'Where Ambitious Founders Meet Capital That Believes.',
      cta: 'Apply Now',
      footer: 'Applications open year-round. Next cohort starts soon.'
    }
  }
];

const NEXT = 1;
const PREV = -1;
const SLIDE_DURATION = 1.5;

export default function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorDirection, setCursorDirection] = useState<'prev' | 'next'>('next');

  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const counterStripRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  // Initialize animations on mount
  useEffect(() => {
    const firstSlideTextLines = textRefs.current[0]?.querySelectorAll('.text-line');
    const firstSlideContent = contentRefs.current[0];
    
    if (firstSlideTextLines) {
      gsap.to(firstSlideTextLines, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.5,
        ease: 'power3.out'
      });
    }
    
    if (firstSlideContent) {
      gsap.to(firstSlideContent, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
      });
    }
  }, []);

  const navigate = (direction: number) => {
    if (isAnimating) return;

    const prevIndex = currentIndex;
    const nextIndex =
      direction === NEXT
        ? currentIndex < slides.length - 1
          ? currentIndex + 1
          : 0
        : currentIndex > 0
        ? currentIndex - 1
        : slides.length - 1;

    performNavigation(prevIndex, nextIndex, direction);
    setCurrentIndex(nextIndex);
  };

  const performNavigation = (prevIndex: number, nextIndex: number, direction: number) => {
    setIsAnimating(true);

    const currentSlide = slideRefs.current[prevIndex];
    const currentImage = imageRefs.current[prevIndex];
    const currentTextLines = textRefs.current[prevIndex]?.querySelectorAll('.text-line');
    const currentContent = contentRefs.current[prevIndex];

    const nextSlide = slideRefs.current[nextIndex];
    const nextImage = imageRefs.current[nextIndex];
    const nextTextLines = textRefs.current[nextIndex]?.querySelectorAll('.text-line');
    const nextContent = contentRefs.current[nextIndex];

    if (!currentSlide || !nextSlide || !currentImage || !nextImage) return;

    const tl = gsap.timeline({
      defaults: { duration: SLIDE_DURATION, ease: 'power2.inOut' },
      onComplete: () => {
        gsap.set(currentSlide, { visibility: 'hidden' });
        setIsAnimating(false);
      }
    });

    const targetY = -nextIndex * 1.2;
    tl.to(counterStripRef.current, {
      y: `${targetY}rem`,
      duration: SLIDE_DURATION,
      ease: 'power2.out'
    }, 0.2);

    if (currentTextLines) {
      tl.to(currentTextLines, {
        y: '-80%',
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power2.in'
      }, 0);
    }

    if (currentContent) {
      tl.to(currentContent, {
        opacity: 0,
        y: -30,
        duration: 0.6,
        ease: 'power2.in'
      }, 0);
    }

    const zoomDirection = direction === NEXT ? 1 : -1;

    gsap.set(nextSlide, {
      visibility: 'visible',
      scale: zoomDirection === 1 ? 0.7 : 1.3,
      opacity: 0
    });

    gsap.set(nextImage, {
      scale: zoomDirection === 1 ? 1.3 : 0.8,
      opacity: 0.5
    });

    tl.to(currentSlide, {
      scale: zoomDirection === 1 ? 1.3 : 0.7,
      opacity: 0,
      ease: 'power2.in'
    }, 0.2);

    tl.to(currentImage, {
      scale: zoomDirection === 1 ? 0.8 : 1.3,
      ease: 'power2.in'
    }, 0.2);

    tl.to(nextSlide, {
      scale: 1,
      opacity: 1,
      ease: 'power3.out'
    }, 0.4);

    tl.to(nextImage, {
      scale: 1,
      opacity: 1,
      ease: 'power3.out'
    }, 0.4);

    if (nextTextLines) {
      gsap.set(nextTextLines, { y: '100%', opacity: 0 });
      tl.to(nextTextLines, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.3
      }, 0.7);
    }

    if (nextContent) {
      gsap.set(nextContent, { opacity: 0, y: 30 });
      tl.to(nextContent, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.4
      }, 0.8);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    
    setMouseX(x);
    setCursorVisible(true);
    setCursorDirection(x < window.innerWidth / 2 ? 'prev' : 'next');

    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        left: x,
        top: y,
        duration: 0.1
      });
    }

    if (cursorTimeoutRef.current) {
  clearTimeout(cursorTimeoutRef.current);
}

cursorTimeoutRef.current = setTimeout(() => {
  setCursorVisible(false);
}, 2000);

  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      navigate(NEXT);
    } else {
      navigate(PREV);
    }
  };

  const handleClick = () => {
    if (mouseX < window.innerWidth / 2) {
      navigate(PREV);
    } else {
      navigate(NEXT);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      navigate(NEXT);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      navigate(PREV);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  return (
    <div 
      className="relative w-full h-[75vh] overflow-hidden bg-[#f5f5f0] text-[#3a3a38] cursor-none mt-30 mb-30"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorVisible(false)}
      onWheel={handleWheel}
      onClick={handleClick}
    >
      {/* Slides */}
      <div className="relative w-full h-full overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            ref={(el) => {
  slideRefs.current[index] = el;
}}

            className={`absolute inset-0 overflow-hidden ${index === 0 ? 'visible' : 'invisible'}`}
            style={{ transformOrigin: 'center' }}
          >
            {/* Background Image */}
            <div
              ref={(el) => {
  slideRefs.current[index] = el;
}}

              className="absolute -top-[10%] -left-[10%] w-[120%] h-[120%] bg-cover bg-center"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transformOrigin: 'center',
                filter: 'grayscale(30%) sepia(15%)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#f5f5f0]/50 via-[#f5f5f0]/30 to-[#f5f5f0]/70" />
            </div>

            {/* Main Title */}
            <div 
              ref={(el) => {
  slideRefs.current[index] = el;
}}

              className="absolute top-16 left-8 md:left-16 max-w-[80%] overflow-hidden z-[5]"
            >
              {slide.text.map((line, i) => (
                <span 
                  key={i} 
                  className="text-line block text-3xl md:text-[3.5rem] leading-none font-bold uppercase tracking-tight translate-y-full opacity-0"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {line}
                </span>
              ))}
            </div>

            {/* Content Section */}
            <div
              ref={(el) => {
  slideRefs.current[index] = el;
}}

              className="absolute bottom-10 left-8 md:left-16 right-8 md:right-16 z-[5] opacity-0"
            >
              {/* Slide 0: Investment Thesis */}
              {index === 0 && slide.content && 'points' in slide.content && slide.content.points && (
                <div className="max-w-3xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-5 text-[#355E3B]">
                    {slide.content.title}
                  </h3>
                  <div className="space-y-2 mb-5">
                    {slide.content.points.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[#355E3B] text-lg">→</span>
                        <p className="text-sm md:text-base leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-base md:text-lg italic text-[#355E3B]/90 font-light border-l-4 border-[#355E3B] pl-4">
                    {slide.content.footer}
                  </p>
                </div>
              )}

              {/* Slide 1: SparkSeed Difference */}
              {index === 1 && slide.content && 'subtitle' in slide.content && (
                <div className="max-w-3xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#355E3B]">
                    {slide.content.title}
                  </h3>
                  <p className="text-base md:text-lg mb-5 text-[#3a3a38]/80">{slide.content.subtitle}</p>
                  <div className="space-y-2 mb-5">
                    {slide.content.points?.map((point, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-[#355E3B] text-lg">→</span>
                        <p className="text-sm md:text-base leading-relaxed">{point}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-base md:text-lg italic text-[#355E3B]/90 font-light border-l-4 border-[#355E3B] pl-4">
                    {slide.content.footer}
                  </p>
                </div>
              )}

              {/* Slide 2: Cities */}
              {index === 2 && slide.content && 'cities' in slide.content &&slide.content.cities && (
                <div className="max-w-4xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-5 text-[#355E3B]">
                    {slide.content.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
                    {slide.content.cities.map((city, i) => (
                      <div 
                        key={i}
                        className="bg-[#355E3B]/5 backdrop-blur-sm border-2 border-[#355E3B]/30 px-5 py-3 rounded"
                      >
                        <p className="text-lg md:text-xl font-bold text-[#355E3B]">{city}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-base md:text-lg italic text-[#355E3B]/90 font-light border-l-4 border-[#355E3B] pl-4">
                    {slide.content.footer}
                  </p>
                </div>
              )}

              {/* Slide 3: Stats */}
              {index === 3 && slide.content && 'stats' in slide.content && slide.content.stats && (
                <div className="max-w-5xl">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-[#355E3B]">
                    {slide.content.title}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-6">
                    {slide.content.stats.map((stat, i) => (
                      <div key={i} className="text-center border-2 border-[#355E3B]/30 rounded p-4 bg-[#355E3B]/5">
                        <div className="text-3xl md:text-4xl font-bold text-[#355E3B] mb-1">
                          {stat.number}
                        </div>
                        <div className="text-xs md:text-sm text-[#3a3a38]/80">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-base md:text-lg italic text-[#355E3B]/90 font-light border-l-4 border-[#355E3B] pl-4">
                    {slide.content.footer}
                  </p>
                </div>
              )}

              {/* Slide 4: CTA */}
              {index === 4 && slide.content && 'cta' in slide.content && slide.content.cta &&(
                <div className="max-w-3xl text-center mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 text-[#355E3B]">
                    {slide.content.title}
                  </h3>
                  <p className="text-xl md:text-2xl mb-6 text-[#3a3a38]/80 font-light">
                    {slide.content.subtitle}
                  </p>
                  <button className="bg-[#355E3B] text-[#f5f5f0] px-10 py-3 text-lg font-bold hover:bg-[#2d4f32] transition-colors uppercase tracking-wide">
                    {slide.content.cta}
                  </button>
                  <p className="text-sm md:text-base mt-6 italic text-[#355E3B]/90 font-light">
                    {slide.content.footer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="absolute top-6 right-6 z-10">
        <div className="text-[#3a3a38] text-xs font-normal opacity-60 lowercase">scroll / click / arrows</div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center text-sm font-bold tracking-wider z-0">
        <div className="relative min-w-[2rem] h-[1.2rem] overflow-hidden text-right">
          <div ref={counterStripRef} className="absolute top-0 left-0 w-full text-right text-[#355E3B]">
            {slides.map((_, index) => (
              <div key={index} className="h-[1.2rem] block">
                {String(index + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
        <div className="w-10 h-px bg-[#355E3B] mx-3" />
        <div className="min-w-[2rem] text-left text-[#355E3B]">
          {String(slides.length).padStart(2, '0')}
        </div>
      </div>

      {/* Info */}
      <div className="absolute top-0 left-6 text-xs font-normal opacity-70 z-10 max-w-[15rem] hidden md:block">
        <div className="mb-1 font-bold text-[#355E3B] uppercase tracking-wide">SparkSeed</div>
        <div className="text-[#3a3a38]/80 lowercase">Building India's next generation of founders.</div>
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className={`fixed w-[50px] h-[50px] rounded-full border-2 border-[#355E3B]/40 -mt-[25px] -ml-[25px] z-[9999] pointer-events-none transition-transform duration-300 ${
          cursorVisible ? 'scale-100' : 'scale-0'
        }`}
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-[#355E3B] transition-opacity ${
          cursorDirection === 'prev' ? 'opacity-100' : 'opacity-0'
        }`}>
          ←
        </div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg text-[#355E3B] transition-opacity ${
          cursorDirection === 'next' ? 'opacity-100' : 'opacity-0'
        }`}>
          →
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal');
        
        * {
          font-family: 'PP Neue Montreal', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }
        
        @media (max-width: 768px) {
          .text-line {
            font-size: 2rem !important;
          }
        }
        
        ::-webkit-scrollbar { 
          width: 8px; 
        }
        ::-webkit-scrollbar-track { 
          background: transparent; 
        }
        ::-webkit-scrollbar-thumb { 
          background-color: #355E3B; 
          border-radius: 4px; 
        }
      `}</style>
    </div>
  );
}