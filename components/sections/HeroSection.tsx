// src/components/sections/HeroSection.tsx
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #f0fdf9 0%, #ffffff 60%, #fff7ed 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decorative blobs */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(27,170,138,0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-60px', left: '-60px',
        width: '300px', height: '300px',
        background: 'radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '60px',
      }}>
        {/* Left Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', width: 'fit-content' }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(27,170,138,0.12), rgba(27,170,138,0.06))',
              border: '1px solid rgba(27,170,138,0.25)',
              color: '#0D7A62',
              padding: '6px 16px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: '600',
              letterSpacing: '0.3px',
            }}>
              ✨ Belajar Lebih Seru, Pintar Lebih Cepat!
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '54px',
            fontWeight: '700',
            lineHeight: '1.15',
            color: '#121212',
            margin: '0',
          }}>
            Belajar Lebih Seru,{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Pintar Lebih Cepat!
            </span>
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '17px',
            color: '#71717A',
            lineHeight: '1.7',
            maxWidth: '480px',
            margin: '0',
          }}>
            Platform belajar interaktif dan lengkap, mulai dari course, ringkasan,
            latihan soal, latihan coding, dan kuis seru bareng Circle Pintar!
          </p>

          {/* CTA Button */}
          <div>
            <Link href="/course" className="hero-cta">
              Belajar Sekarang
              <span className="material-icons" style={{ fontSize: '20px' }}>arrow_forward</span>
            </Link>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', paddingTop: '8px' }}>
            {[
              { number: '10K+', label: 'Siswa Aktif' },
              { number: '200+', label: 'Kelas Tersedia' },
              { number: '4.9⭐', label: 'Rating Rata-rata' },
            ].map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#1BAA8A', fontFamily: 'var(--font-fredoka)' }}>{stat.number}</div>
                <div style={{ fontSize: '13px', color: '#71717A', fontWeight: '500' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Illustration */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <div className="animate-float" style={{
            background: 'linear-gradient(135deg, rgba(27,170,138,0.08), rgba(249,115,22,0.06))',
            borderRadius: '40% 60% 60% 40% / 40% 40% 60% 60%',
            padding: '20px',
          }}>
            <Image
              src="/hero-illustration.png"
              alt="Ilustrasi Belajar Circle Pintar"
              width={520}
              height={420}
              priority
              style={{ borderRadius: '20px', objectFit: 'contain' }}
            />
          </div>

          {/* Floating badge */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '-20px',
            background: 'white',
            borderRadius: '16px',
            padding: '12px 18px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{ fontSize: '28px' }}>🏆</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#121212' }}>Juara Kelas</div>
              <div style={{ fontSize: '11px', color: '#71717A' }}>dengan Circle Pintar</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;