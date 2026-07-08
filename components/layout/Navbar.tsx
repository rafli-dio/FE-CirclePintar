'use client';
// src/components/layout/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 50,
        background: '#ffffff',
        boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.08)' : '0 1px 0 #e5e7eb',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '70px',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Image
            src="/logo-circle-pintar.png"
            alt="Circle Pintar Logo"
            width={160}
            height={40}
            priority
            style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
          />
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button 
          className="md:hidden flex items-center justify-center p-2 text-[#1BAA8A]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-icons text-3xl">{isMobileMenuOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Desktop Nav Links & CTA */}
        <div className="hidden md:flex items-center gap-9">
          {['Home', 'Course', 'About', 'Feature'].map((item) => (
            <Link
              key={item}
              href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
              className="nav-link"
              style={{ color: '#0F766E' }}
            >
              {item}
            </Link>
          ))}
          <Link href="/daftar" className="nav-cta">
            Masuk
            <span className="material-icons" style={{ fontSize: '18px' }}>person</span>
          </Link>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-[70px] left-0 w-full bg-white shadow-lg flex flex-col items-center py-6 gap-6 z-40 border-t border-gray-100">
            {['Home', 'Course', 'About', 'Feature'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="nav-link"
                style={{ color: '#0F766E', fontSize: '16px' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link 
              href="/daftar" 
              className="nav-cta"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Masuk
              <span className="material-icons" style={{ fontSize: '18px' }}>person</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;