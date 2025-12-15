'use client';

import React, { useEffect, useRef, useState } from 'react';

// Types
interface PanelData {
  type: 'split' | 'full' | 'fixed' | 'video' | 'contact';
  index: number;
  title?: string;
  chapter?: string;
  content?: string;
  image?: string;
  videoSrc?: string;
  isReversed?: boolean;
  quotes?: Array<{
    text: string;
    author: string;
    label: string;
  }>;
}

const SpacePortfolio = () => {
  // State
  const [menuExpanded, setMenuExpanded] = useState(false);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [copyTooltipVisible, setCopyTooltipVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const targetX = useRef(0);
  const currentX = useRef(0);
  const velocityX = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollX = useRef(0);
  const lastTouchX = useRef(0);
  const lastTouchTime = useRef(0);
  const animationFrameId = useRef<number>();

  // Constants
  const SMOOTH_FACTOR = 0.065;
  const WHEEL_SENSITIVITY = 1.0;

  // Panel data
  const panels: PanelData[] = [
    {
      type: 'split',
      index: 0,
      chapter: 'Our Philosophy',
      title: "We invest early — when nobody else believes yet",
      content: "Idea, prototype, pre-revenue, pre-team? Perfect. That's where the magic is. That's where we enter. We see potential where others see risk.",
      image: '/1.jpg'
    },
    {
      type: 'full',
      index: 1,
      chapter: 'On The Ground',
      title: "We don't sit in AC offices. We go to the ground",
      content: "We meet founders in Coimbatore workshops, Surat manufacturing units, Indore offices, Bangalore co-working spaces, and Tier 2–4 founder ecosystems. We work where founders actually work — not where investors pretend to understand them.",
      image: '/7.jpg'
    },
    {
      type: 'fixed',
      index: 2,
      title: 'BUILDERS',
      image: '/6.jpg'
    },
    {
      type: 'split',
      index: 3,
      chapter: 'Real Operators',
      title: 'Our mentors dont advise. They DO',
      content: "Every mentor is an operator. Builders. Founders. CEOs. People who know the market because they bleed it. They've been in the trenches, made the mistakes, and built the wins. They don't just talk — they've done it.",
      image: '/2.jpg',
      isReversed: true
    },
    {
      type: 'full',
      index: 4,
      title: 'PARTNERS',
      content: "We don't give 'sessions.' We build companies WITH you. GTM? We sit with you. First 50 customers? We plan. Investor deck? We rewrite. Fundraise? We open doors. Burning problem? We get on the next flight. Because we promised you a partner, not a programme.",
      image: '/3.jpg'
    },
    {
      type: 'split',
      index: 5,
      quotes: [
        {
          text: "We focus on founders with potential — not pedigree. Your father doesn't need a factory. Your resume doesn't need an IIT stamp. Your idea doesn't need jargon.",
          author: 'OUR BELIEF SYSTEM',
          label: 'Potential'
        },
        {
          text: "You just need the courage to build. We handle the rest. We believe in the fire in your eyes, not the stamps on your certificate.",
          author: 'THE PROMISE',
          label: 'Courage'
        }
      ]
    },
    {
      type: 'full',
      index: 6,
      title: 'IMPACT',
      content: 'We believe in building something real. Something that changes lives, creates jobs, and moves markets. From Tier 2 cities to global stages — we back the builders who dare.',
      image: '/5.jpg'
    },
    {
      type: 'video',
      index: 7,
      title: 'BUILD',
      videoSrc: 'https://cdn.cosmos.so/fdfc1996-66fd-4536-8d36-0ad173a4acff.mp4'
    },
    {
      type: 'contact',
      index: 8
    }
  ];

  // Utility functions
  const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  // Get panel width
  const getPanelWidth = () => window.innerWidth;

  // Animation loop
  const animate = () => {
    const panelWidth = getPanelWidth();
    const maxScroll = (panels.length - 1) * panelWidth;

    currentX.current = lerp(currentX.current, targetX.current, SMOOTH_FACTOR);
    
    if (panelsRef.current) {
      panelsRef.current.style.transform = `translateX(-${currentX.current}px)`;
    }

    // Update current panel
    const newPanel = Math.round(currentX.current / panelWidth);
    if (newPanel !== currentPanel) {
      setCurrentPanel(newPanel);
    }

    if (Math.abs(targetX.current - currentX.current) > 0.1 || isAnimating) {
      animationFrameId.current = requestAnimationFrame(animate);
    } else {
      setIsAnimating(false);
    }
  };

  // Start animation
  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      animationFrameId.current = requestAnimationFrame(animate);
    }
  };

  // Navigate to panel
  const navigateToPanel = (index: number) => {
    const panelWidth = getPanelWidth();
    targetX.current = index * panelWidth;
    startAnimation();
    
    if (window.innerWidth < 768) {
      setMenuExpanded(false);
    }
  };

  // Handle wheel
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const panelWidth = getPanelWidth();
    const maxScroll = (panels.length - 1) * panelWidth;
    targetX.current = clamp(targetX.current + e.deltaY * WHEEL_SENSITIVITY, 0, maxScroll);
    startAnimation();
  };

  // Handle mouse/touch drag
  const handleDragStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    startScrollX.current = currentX.current;
    lastTouchX.current = clientX;
    lastTouchTime.current = Date.now();
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging.current) return;
    
    const dx = clientX - startX.current;
    const panelWidth = getPanelWidth();
    const maxScroll = (panels.length - 1) * panelWidth;
    targetX.current = clamp(startScrollX.current - dx, 0, maxScroll);

    const currentTime = Date.now();
    const timeDelta = currentTime - lastTouchTime.current;
    if (timeDelta > 0) {
      const touchDelta = lastTouchX.current - clientX;
      velocityX.current = (touchDelta / timeDelta) * 15;
    }

    lastTouchX.current = clientX;
    lastTouchTime.current = currentTime;
    startAnimation();
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const panelWidth = getPanelWidth();
    const maxScroll = (panels.length - 1) * panelWidth;

    if (Math.abs(velocityX.current) > 0.5) {
      targetX.current = clamp(targetX.current + velocityX.current * 8, 0, maxScroll);
    }

    const nearestPanel = Math.round(targetX.current / panelWidth);
    targetX.current = nearestPanel * panelWidth;
    startAnimation();
  };

  // Copy email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hi@filip.fyi');
    setCopyTooltipVisible(true);
    setTimeout(() => setCopyTooltipVisible(false), 2000);
  };

  // Effects
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });

    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.menu-area') || 
          (e.target as HTMLElement).closest('.copy-btn')) return;
      handleDragStart(e.clientX);
    };

    const handleMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const handleMouseUp = () => handleDragEnd();

    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.menu-area') || 
          (e.target as HTMLElement).closest('.copy-btn')) return;
      handleDragStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      handleDragMove(e.touches[0].clientX);
    };

    const handleTouchEnd = () => handleDragEnd();

    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    // Initial animation
    startAnimation();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] overflow-hidden bg-[#f5f5f0] text-[#3a3a38] cursor-grab active:cursor-grabbing mt-20">
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[10] opacity-90"
        style={{
          backgroundImage: 'url()',
          backgroundSize: '300px 300px',
          animation: 'noise 0.3s steps(5) infinite'
        }}
      />

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
      `}</style>

      {/* Left Menu */}
      <div className={`menu-area absolute left-0 top-0 h-full bg-[#f5f5f0] z-40 flex flex-col justify-between border-r border-[#3a3a38]/10 transition-all duration-500 ${menuExpanded ? 'w-[0px]' : 'w-[0px]'}`}>
        {/* Menu Button */}
        <div className="absolute top-6 left-0 w-full flex justify-center z-50">
          <button 
            onClick={() => setMenuExpanded(!menuExpanded)}
            className="w-6 h-5 flex flex-col justify-between bg-transparent border-none p-0"
          >
            <span className={`block w-full h-0.5 bg-[#3a3a38] transition-all duration-300 ${menuExpanded ? 'rotate-45 translate-y-[9px]' : ''}`} />
            <span className={`block w-full h-0.5 bg-[#3a3a38] transition-all duration-300 ${menuExpanded ? 'opacity-0' : ''}`} />
            <span className={`block w-full h-0.5 bg-[#3a3a38] transition-all duration-300 ${menuExpanded ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </button>
        </div>

        {/* Logo */}
        {/* <div className="absolute top-1/2 left-0 w-full flex justify-center -translate-y-1/2">
          <div className={`font-bold text-lg tracking-[2px] whitespace-nowrap transition-all duration-500 ${menuExpanded ? 'opacity-0 -rotate-90 translate-y-5' : '-rotate-90'}`} style={{ fontFamily: 'Georgia, serif' }}>
            VENTURE
          </div>
        </div> */}

        {/* Navigation */}
        <nav className={`absolute inset-0 flex flex-col justify-center pl-[60px] pr-6 transition-all duration-300 ${menuExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          {['Philosophy', 'On Ground', 'Builders', 'Operators', 'Partners', 'Potential', 'Impact', 'Build', 'Contact'].map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigateToPanel(idx)}
              className={`text-left my-3 text-sm flex items-center w-full transition-all duration-500 hover:opacity-100 hover:text-[#355E3B] ${
                currentPanel === idx ? 'opacity-100 text-[#355E3B]' : 'opacity-70 text-[#3a3a38]'
              } ${menuExpanded ? 'opacity-70 translate-x-0' : 'opacity-0 -translate-x-5'}`}
              style={{ 
                fontFamily: 'Georgia, serif',
                transitionDelay: menuExpanded ? `${50 + idx * 30}ms` : '0ms'
              }}
            >
              <span className="text-xs opacity-60 mr-3 min-w-[20px]">{(idx + 1).toString().padStart(2, '0')}</span>
              <span className="lowercase">{item}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className={`absolute top-0 bottom-0 right-0 h-full transition-all duration-500 ${menuExpanded ? 'left-[250px]' : 'left-[60px]'}`}
      >
        <div className="absolute inset-0">
          <div 
            ref={panelsRef}
            className="absolute top-0 left-0 h-full flex"
          >
            {panels.map((panel) => {
              if (panel.type === 'split' && !panel.quotes) {
                return (
                  <div key={panel.index} className="h-full flex-shrink-0" style={{ width: '100vw' }}>
                    <div className={`grid h-full ${panel.isReversed ? 'grid-cols-[0.8fr_1.2fr]' : 'grid-cols-[1.2fr_0.8fr]'}`}>
                      {panel.isReversed && (
                        <div className="relative overflow-hidden">
                          <img src={panel.image} alt="" className="absolute inset-0 w-full h-full object-cover hover:grayscale transition-all duration-500" />
                        </div>
                      )}
                      <div className="flex flex-col justify-center p-[5%] bg-[#f5f5f0]">
                        <div className={`w-[90%] transition-all duration-600 ${currentPanel === panel.index ? 'opacity-100 translate-y-0' : currentPanel > panel.index ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                          <div className="uppercase mb-6 text-sm tracking-tight text-[#355E3B]">{panel.chapter}</div>
                          <h1 className="text-4xl md:text-5xl mb-6 leading-tight font-bold tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
                            {panel.title}
                          </h1>
                          <p className="text-base md:text-lg leading-relaxed text-[#3a3a38]/90">{panel.content}</p>
                        </div>
                      </div>
                      {!panel.isReversed && (
                        <div className="relative overflow-hidden">
                          <img src={panel.image} alt="" className="absolute inset-0 w-full h-full object-cover hover:grayscale transition-all duration-500" />
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              if (panel.type === 'split' && panel.quotes) {
                return (
                  <div key={panel.index} className="h-full flex-shrink-0 flex" style={{ width: '100vw' }}>
                    {panel.quotes.map((quote, qIdx) => (
                      <div key={qIdx} className={`w-1/2 h-full flex flex-col justify-center p-[5%] ${qIdx === 0 ? 'bg-[#ebebdf]' : 'bg-[#e5e5d9]'}`}>
                        <div className={`w-[90%] transition-all duration-600 ${currentPanel === panel.index ? 'opacity-100 translate-y-0' : currentPanel > panel.index ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                          <div className="uppercase text-xs tracking-wide mb-2 text-[#355E3B]">{quote.label}</div>
                          <div className="mt-4 pl-4 border-l-4 border-[#355E3B]">
                            <p className="text-lg leading-relaxed mb-5">{quote.text}</p>
                            <p className="text-sm text-[#355E3B] font-semibold">{quote.author}</p>
                          </div>
                          {qIdx === 0 && (
                            <>
                              <div className="w-full max-w-[450px] h-[300px] my-6 relative overflow-hidden shadow-2xl">
                                <img src="/4.jpg" alt="" className="w-full h-full object-cover hover:grayscale transition-all duration-500" />
                              </div>
                              <p className="text-base leading-relaxed text-[#3a3a38]/90">We don't invest in ideas on paper. We invest in founders who hustle. Who iterate. Who refuse to quit when everyone says no. Because that's where greatness begins.</p>
                            </>
                          )}
                          {qIdx === 1 && (
                            <>
                              <p className="text-base italic leading-relaxed my-5" style={{ fontFamily: 'Georgia, serif' }}>
                                "Real work happens where real problems are. Not in conference rooms — but on factory floors, in customer meetings, in late-night Zoom calls solving urgent fires."
                              </p>
                              <p className="text-base leading-relaxed text-[#3a3a38]/90">We don't wait for decks to be perfect. We start building from day one. Strategy evolves, execution decides. And we're there for every single step.</p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }

              if (panel.type === 'full') {
                return (
                  <div key={panel.index} className="h-full flex-shrink-0 relative flex items-center justify-center" style={{ width: '100vw' }}>
                    <img src={panel.image} alt="" className="absolute inset-0 w-full h-full object-cover " />
                    <div className="absolute inset-0 bg-[#3a3a38]/50" />
                    <div className={`relative z-10 w-4/5 max-w-[800px] text-center transition-all duration-600 ${currentPanel === panel.index ? 'opacity-100 translate-y-0' : currentPanel > panel.index ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      {panel.chapter && <div className="uppercase mb-6 text-sm tracking-tight text-[#355E3B]">{panel.chapter}</div>}
                      <h2 className={`mb-6 leading-tight font-black uppercase tracking-tight ${panel.index === 4 || panel.index === 6 ? 'text-[clamp(6rem,15vw,10rem)] text-[#355E3B]' : 'text-4xl md:text-5xl text-[#f5f5f0]'}`} style={{ fontFamily: 'Georgia, serif' }}>
                        {panel.title}
                      </h2>
                      {panel.content && <p className="text-base md:text-lg leading-relaxed text-[#f5f5f0]/95">{panel.content}</p>}
                    </div>
                  </div>
                );
              }

              if (panel.type === 'fixed') {
                return (
                  <div key={panel.index} className="h-full flex-shrink-0 relative overflow-hidden" style={{ width: '100vw' }}>
                    <img src={panel.image} alt="" className="absolute inset-0 w-full h-full object-cover " />
                    <div className="absolute inset-0 bg-[#3a3a38]/50 flex items-center justify-center">
                      <div className="text-[clamp(6rem,15vw,10rem)] font-black uppercase tracking-tight text-[#355E3B]" style={{ fontFamily: 'Georgia, serif' }}>
                        {panel.title}
                      </div>
                    </div>
                  </div>
                );
              }

              if (panel.type === 'video') {
                return (
                  <div key={panel.index} className="h-full flex-shrink-0 relative flex items-center justify-center" style={{ width: '100vw' }}>
                    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover grayscale">
                      <source src={panel.videoSrc} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[#3a3a38]/60" />
                    <div className={`relative z-10 transition-all duration-600 ${currentPanel === panel.index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="text-[clamp(7rem,15vw,12rem)] font-black uppercase tracking-tighter text-[#355E3B]" style={{ fontFamily: 'Georgia, serif', textShadow: '0 0 20px rgba(53, 94, 59, 0.3)' }}>
                        {panel.title}
                      </div>
                    </div>
                  </div>
                );
              }

              if (panel.type === 'contact') {
                return (
                  <div key={panel.index} className="h-full flex-shrink-0 bg-[#f5f5f0] flex items-center justify-center" style={{ width: '100vw' }}>
                    <div className={`w-4/5 max-w-[800px] text-center transition-all duration-600 ${currentPanel === panel.index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="text-[clamp(6rem,15vw,10rem)] font-black uppercase tracking-tight text-[#3a3a38] mb-24 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                        GET IN TOUCH
                      </div>
                      <div className="inline-flex items-center gap-3 bg-[#3a3a38]/5 px-6 py-4 transition-all hover:bg-[#3a3a38]/10 hover:-translate-y-0.5">
                        <a href="mailto:hi@filip.fyi" className="text-2xl md:text-3xl text-[#3a3a38] no-underline transition-colors hover:text-[#355E3B]" style={{ fontFamily: 'Georgia, serif' }}>
                          hi@filip.fyi
                        </a>
                        <button 
                          onClick={handleCopyEmail}
                          className="copy-btn bg-transparent border-none cursor-pointer text-[#3a3a38]/70 p-2 flex items-center justify-center transition-all hover:opacity-100 hover:bg-[#3a3a38]/10 hover:scale-110 active:scale-95 relative"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                          </svg>
                          <span className={`absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#355E3B] text-white px-3 py-1 text-xs transition-all ${copyTooltipVisible ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            Copied!
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      </div>

      {/* Navigation Progress */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-40 text-[#3a3a38]">
        <div className="text-xs uppercase tracking-wide">SCROLL</div>
        <div className="w-[150px] h-0.5 bg-[#3a3a38]/30 relative overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-[#355E3B] origin-left transition-transform duration-200"
            style={{ transform: `scaleX(${currentPanel / (panels.length - 1)})` }}
          />
        </div>
        <div className="text-xs uppercase tracking-wide">
          {(currentPanel + 1).toString().padStart(2, '0')} / {panels.length.toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};

export default SpacePortfolio;