// src/components/sections/CTASection.tsx
import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="px-4 md:px-6 mx-auto max-w-[1200px] pb-16 md:pb-20">
      <div className="p-8 md:p-[60px_40px] rounded-none md:rounded-[24px]" style={{
        background: 'linear-gradient(135deg, #1BAA8A 0%, #0D7A62 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background circles */}
        <div style={{
          position: 'absolute',
          top: '-60px',
          right: '20%',
          width: '200px',
          height: '200px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '10%',
          width: '280px',
          height: '280px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 1, alignItems: 'center' }}>
          
          <h2 className="text-[32px] md:text-[44px]" style={{
            fontFamily: 'var(--font-fredoka), sans-serif',
            fontWeight: '700',
            color: '#ffffff',
            margin: '0',
            lineHeight: '1.3',
            maxWidth: '600px',
          }}>
            Siap Jadi Juara Kelas
            <br />
            Bersama Circle Pintar?
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#ffffff',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0',
            fontWeight: '400',
          }}>
            Jangan tunda lagi untuk meraih nilai impianmu. Gabung sekarang dan nikmati kemudahan
            belajar dengan modul interaktif, kuis seru, serta pantau progres belajarmu kapan saja.
          </p>

          <div style={{ paddingTop: '16px' }}>
            <Link href="/daftar" style={{
              display: 'inline-flex',
              alignItems: 'center',
              background: '#ffffff',
              color: '#0F766E',
              padding: '6px 6px 6px 24px',
              borderRadius: '50px',
              border: '3px solid #F97316',
              fontWeight: '700',
              fontSize: '16px',
              textDecoration: 'none',
              gap: '12px',
            }}>
              Bergabung Gratis Sekarang
              <span style={{
                width: '36px',
                height: '36px',
                background: '#0F766E',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span className="material-icons" style={{ fontSize: '20px', color: '#ffffff' }}>arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;