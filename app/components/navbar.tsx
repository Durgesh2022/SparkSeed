'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollProgress?: number;
  isScrolled?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrollProgress = 0, isScrolled = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localScrollProgress, setLocalScrollProgress] = useState(0);
  const [localIsScrolled, setLocalIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollTop = window.scrollY;
      const percentage = (scrollTop / scrollHeight) * 100;
      setLocalScrollProgress(percentage);
      setLocalIsScrolled(scrollTop > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use props if provided, otherwise use local state
  const progress = scrollProgress || localScrollProgress;
  const scrolled = isScrolled !== undefined ? isScrolled : localIsScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 w-full py-8 z-[60] transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-[#f5f5f0]'
      }`}
      style={{ height: '90px' }}
    >
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between max-w-full mx-auto px-8">
        <div className="text-2xl text-[#3a3a38] font-bold tracking-tight">SPARKSEED</div>
        
        <div className="flex items-center ml-auto">
          <a 
            href="#contact" 
            className="inline-block bg-[#355E3B] text-white px-4 py-2 text-sm uppercase no-underline transition-all hover:bg-[#2d4f32]"
          >
            +GET IN TOUCH
          </a>
          <div className="w-[40vw] h-0.5 ml-4 bg-[rgba(34,34,32,0.1)]">
            <div 
              className="h-full bg-[#355E3B] transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <nav className="flex gap-12 ml-12">
          <a href="/" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">home</a>
          <a href="/about/investors" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">for investors</a>
          <a href="/about/founders" className="text-lg no-underline text-[#355E3B] lowercase hover:opacity-70 transition-opacity">for founders</a>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-6">
        <div className="text-xl text-[#3a3a38] font-bold tracking-tight">SPARKSEED</div>
        
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-[#355E3B] p-2 z-[70]"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-white z-50 transition-all duration-300 ${
          isMenuOpen ? 'top-[64px] opacity-100' : 'top-[-100%] opacity-0'
        }`}
      >
        <nav className="flex flex-col p-6 gap-6">
          <a 
            href="/" 
            className="text-lg text-[#355E3B] lowercase py-2 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            home
          </a>
          <a 
            href="/about/investors" 
            className="text-lg text-[#355E3B] lowercase py-2 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            for investors
          </a>
          <a 
            href="/about/founders" 
            className="text-lg text-[#355E3B] lowercase py-2 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            for founders
          </a>
          <a 
            href="#contact" 
            className="inline-block bg-[#355E3B] text-white px-4 py-3 text-sm uppercase text-center mt-4 hover:bg-[#2d4f32] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            +GET IN TOUCH
          </a>
        </nav>

        {/* Mobile Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[rgba(34,34,32,0.1)]">
          <div 
            className="h-full bg-[#355E3B] transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;