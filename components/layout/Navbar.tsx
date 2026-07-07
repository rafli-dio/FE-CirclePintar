'use client';
// src/components/layout/Navbar.tsx
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
          {/* Taruh file logo Anda dengan nama "logo.png" di dalam folder public/ */}
          <Image
            src="/logo-circle-pintar.png"
            alt="Circle Pintar Logo"
            width={160}
            height={40}
            priority
            style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
          />
        </Link>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
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
        </div>

        {/* CTA Button */}
        <Link href="/daftar" className="nav-cta">
          Masuk
          <span className="material-icons" style={{ fontSize: '18px' }}>person</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;