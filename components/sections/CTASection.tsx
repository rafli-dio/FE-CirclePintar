// src/components/sections/CTASection.tsx
import Link from 'next/link';
import Image from 'next/image';

const CTASection = () => {
  return (
    <section style={{ padding: '0 24px 80px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{
        background: 'linear-gradient(135deg, #0D7A62 0%, #1BAA8A 50%, #14B8A6 100%)',
        borderRadius: '32px',
        padding: '60px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        alignItems: 'center',
        gap: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background circles */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '200px',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          right: '320px',
          width: '280px',
          height: '280px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '-40px',
          width: '150px',
          height: '150px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Left content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: 1 }}>
          <span style={{
            background: 'rgba(255,255,255,0.15)',
            color: 'rgba(255,255,255,0.95)',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: '600',
            width: 'fit-content',
            letterSpacing: '0.5px',
          }}>
            🎓 CIRCLE PINTAR
          </span>

          <h2 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '42px',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0',
            lineHeight: '1.2',
            maxWidth: '520px',
          }}>
            Siap Jadi Juara Kelas
            <br />
            Bersama Circle Pintar?
          </h2>

          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: '1.7',
            maxWidth: '460px',
            margin: '0',
          }}>
            Jangan tunda lagi kesuksesanmu. Bergabung sekarang dan mulai
            perjalanan belajarmu bersama jutaan siswa di Circle Pintar.
          </p>

          <div style={{ paddingTop: '8px' }}>
            <Link href="/daftar" className="cta-btn-white">
              Bergabung Gratis Sekarang
              <span className="material-icons" style={{ fontSize: '20px' }}>arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right illustration */}
        <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <Image
            src="/cta-illustration.png"
            alt="Bergabung dengan Circle Pintar"
            width={300}
            height={300}
            style={{ objectFit: 'contain', filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.2))' }}
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;