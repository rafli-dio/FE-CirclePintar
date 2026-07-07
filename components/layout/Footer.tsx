// src/components/layout/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #f0f0f0',
      padding: '64px 24px 32px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
        gap: '48px',
        marginBottom: '48px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontSize: '18px', fontWeight: '900', fontFamily: 'var(--font-fredoka)' }}>C</span>
            </div>
            <span style={{
              fontSize: '20px',
              fontWeight: '800',
              fontFamily: 'var(--font-fredoka)',
              color: '#1BAA8A',
            }}>
              Circle<span style={{ color: '#121212' }}>Pintar</span>
            </span>
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
              { icon: 'facebook', label: 'Facebook' },
              { icon: 'telegram', label: 'Telegram' },
              { icon: 'link', label: 'LinkedIn' },
            ].map((social, i) => (
              <Link
                key={i}
                href="#"
                className="social-icon-btn"
                aria-label={social.label}
              >
                <span className="material-icons" style={{ fontSize: '18px' }}>{social.icon}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tautan Cepat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#121212', margin: '0' }}>Tautan Cepat</h5>
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
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#121212', margin: '0' }}>Menu Populer</h5>
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
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#121212', margin: '0' }}>Hubungi Kami</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="material-icons" style={{ fontSize: '18px', color: '#1BAA8A', marginTop: '1px', flexShrink: 0 }}>email</span>
              <span style={{ fontSize: '14px', color: '#71717A' }}>circlepintar.id@gmail.com</span>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span className="material-icons" style={{ fontSize: '18px', color: '#1BAA8A', marginTop: '1px', flexShrink: 0 }}>location_on</span>
              <span style={{ fontSize: '14px', color: '#71717A', lineHeight: '1.6' }}>Telaga Warna, No. 13 Yogyakarta, Jawa Tengah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid #f0f0f0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: '13px', color: '#71717A', margin: '0' }}>
          © 2026 Circle Pintar. All rights reserved. Made with ❤️ for Indonesian students.
        </p>
      </div>
    </footer>
  );
};

export default Footer;