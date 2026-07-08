// src/components/layout/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #f0f0f0',
      padding: '64px 0 32px',
    }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-10 lg:gap-12 mb-12" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Image
              src="/logo-circle-pintar.png"
              alt="Circle Pintar Logo"
              width={160}
              height={40}
              style={{ objectFit: 'contain', height: '40px', width: 'auto' }}
            />
          </Link>

          <p style={{
            fontSize: '14px',
            color: '#71717A',
            lineHeight: '1.75',
            maxWidth: '280px',
            margin: '0',
          }}>
            Platform belajar interaktif dan lengkap, mulai dari course, ringkasan,
            latihan soal, latihan coding, dan kuis seru!
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              {
                label: 'Instagram',
                svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              },
              {
                label: 'GitHub',
                svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              },
              {
                label: 'LinkedIn',
                svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              },
            ].map((social, i) => (
              <Link
                key={i}
                href="#"
                className="social-icon-btn"
                aria-label={social.label}
              >
                {social.svg}
              </Link>
            ))}
          </div>
        </div>

        {/* Tautan Cepat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#0F766E', margin: '0', height: '40px', display: 'flex', alignItems: 'center' }}>Tautan Cepat</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'Home', href: '/' },
              { label: 'Course', href: '/course' },
              { label: 'About', href: '/about' },
              { label: 'Feature', href: '/feature' },
            ].map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="footer-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Menu Populer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#0F766E', margin: '0', height: '40px', display: 'flex', alignItems: 'center' }}>Menu Populer</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              'Kursus IPA',
              'Latihan Koding SMP',
              'Matematika SMA',
              'Latihan Soal',
            ].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="footer-link"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Hubungi Kami */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#0F766E', margin: '0', height: '40px', display: 'flex', alignItems: 'center' }}>Hubungi Kami</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="material-icons" style={{ fontSize: '18px', color: '#1BAA8A', marginTop: '1px', flexShrink: 0 }}>email</span>
              <span style={{ fontSize: '14px', color: '#71717A' }}>circlepintar.id@gmail.com</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="material-icons" style={{ fontSize: '18px', color: '#1BAA8A', marginTop: '1px', flexShrink: 0 }}>location_on</span>
              <span style={{ fontSize: '14px', color: '#71717A', lineHeight: '1.6' }}>Sukoharjo, Indonesia</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 24px 0 24px', // Tambahan padding horizontal
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: '13px', color: '#0F766E', margin: '0' }}>
          © 2026 Circle Pintar. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;