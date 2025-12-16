import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  scrollProgress: number;
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrollProgress, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header 
      className={`fixed top-0 left-0 w-full py-4 z-[60] transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
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
              style={{ width: `${scrollProgress}%` }}
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
          className="text-[#355E3B] p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] bg-white z-50">
          <nav className="flex flex-col p-6 gap-6">
            <a 
              href="/" 
              className="text-lg text-[#355E3B] lowercase py-2 border-b border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              home
            </a>
            <a 
              href="/about/investors" 
              className="text-lg text-[#355E3B] lowercase py-2 border-b border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              for investors
            </a>
            <a 
              href="/about/founders" 
              className="text-lg text-[#355E3B] lowercase py-2 border-b border-gray-200"
              onClick={() => setIsMenuOpen(false)}
            >
              for founders
            </a>
            <a 
              href="#contact" 
              className="inline-block bg-[#355E3B] text-white px-4 py-3 text-sm uppercase text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              +GET IN TOUCH
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;