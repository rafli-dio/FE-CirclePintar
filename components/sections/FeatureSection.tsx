// src/components/sections/FeatureSection.tsx
// This is the "Belajar Lebih Dekat, Kapan Saja & Di Mana Saja" section (second hero)
import Image from 'next/image';
import Link from 'next/link';

const FeatureSection = () => {
  return (
    <section style={{ background: '#ffffff', padding: '80px 0' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '72px',
      }}>
        {/* Left: Phone illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            borderRadius: '30px',
            padding: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <Image
              src="/about-section.png"
              alt="Belajar kapan saja dan dimana saja"
              width={440}
              height={440}
              style={{ objectFit: 'contain', borderRadius: '16px', width: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Right: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Badge */}
          <span style={{
            background: '#ffffff',
            border: '1.5px solid #F97316',
            color: '#F97316',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: '600',
            width: 'fit-content',
            letterSpacing: '0.3px',
          }}>
            TENTANG CIRCLE PINTAR
          </span>

          <h2 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '40px',
            fontWeight: '700',
            lineHeight: '1.2',
            margin: '0',
          }}>
            {/* Belajar → #0F766E, Lebih Dekat → #F97316 */}
            <span style={{ color: '#0F766E' }}>Belajar </span>
            <span style={{ color: '#F97316' }}>Lebih Dekat,</span>
            <br />
            {/* Kapan Saja & → #0F766E, Di Mana Saja → #F97316 */}
            <span style={{ color: '#0F766E' }}>Kapan Saja &amp; </span>
            <span style={{ color: '#F97316' }}>Di Mana Saja</span>
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#71717A',
            lineHeight: '1.75',
            maxWidth: '480px',
            margin: '0',
          }}>
            Platform belajar yang dirancang khusus untuk membantu kamu belajar dengan cara yang
            menyenangkan dan efektif. Akses materi kapan saja dan di mana saja, tanpa batas waktu
            dan tempat. Belajar bersama Circle Pintar!
          </p>

          {/* <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { icon: 'devices', text: 'Akses dari semua perangkat — HP, tablet, dan laptop' },
              { icon: 'cloud_done', text: 'Materi tersimpan di cloud, belajar tanpa internet' },
              { icon: 'schedule', text: 'Belajar sesuai jadwalmu sendiri, 24/7' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, rgba(27,170,138,0.15), rgba(27,170,138,0.08))',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: '0' as const,
                }}>
                  <span className="material-icons" style={{ fontSize: '20px', color: '#1BAA8A' }}>{item.icon}</span>
                </div>
                <span style={{ fontSize: '15px', color: '#374151', fontWeight: '500' }}>{item.text}</span>
              </div>
            ))}
          </div> */}

          <div style={{ paddingTop: '8px' }}>
            <Link href="/about" className="hero-cta" style={{ border: '2px solid #F97316' }}>
              Tentang Kami
              {/* Circle putih bulat di kanan */}
              <span style={{
                width: '36px',
                height: '36px',
                background: '#ffffff',
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span className="material-icons" style={{ fontSize: '20px', color: '#0F766E' }}>arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
