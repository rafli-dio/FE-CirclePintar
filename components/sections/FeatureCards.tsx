// src/components/sections/FeatureCards.tsx
import Image from 'next/image';

const features = [
  {
    icon: 'menu_book',
    title: 'Kurikulum Terarah',
    description: 'Materi disusun rapi sesuai standar akademis agar belajarmu lebih fokus dan tidak membuang waktu.',
  },
  {
    icon: 'timer',
    title: 'Belajar Anti Bosan',
    description: 'Materi disusun rapi sesuai standar akademis agar belajarmu lebih fokus dan tidak membuang waktu.',
  },
  {
    icon: 'show_chart',
    title: 'Pantau Progresmu',
    description: 'Tersedia fitur progress bar dan analitik untuk memastikan tidak ada materi yang terlewat.',
  },
  {
    icon: 'sports_esports',
    title: 'Gamifikasi & Reward',
    description: 'Kumpulkan poin dan XP setiap kali kamu menyelesaikan modul. Belajar jadi terasa seru seperti sedang bermain game!',
  },
];

const FeatureCards = () => {
  return (
    <section style={{ background: '#ffffff', padding: '80px 0' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Header left-aligned */}
        <div style={{
          textAlign: 'left',
          marginBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        }}>
          <span style={{
            background: '#ffffff',
            border: '1.5px solid #F97316',
            color: '#F97316',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}>
            KENAPA CIRCLE PINTAR?
          </span>

          <h2 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '40px',
            fontWeight: '700',
            color: '#0F766E',
            margin: '0',
            lineHeight: '1.2',
          }}>
            Kenapa Harus Belajar di CirclePintar?
          </h2>

          <p style={{
            fontSize: '15px',
            color: '#71717A',
            lineHeight: '1.6',
            margin: '0',
            maxWidth: '700px',
          }}>
            Circle Pintar hadir sebagai solusi platform belajar digital yang dirancang khusus untuk memenuhi kebutuhan pelajar masa kini. Temukan ekosistem belajar mandiri yang efisien melalui berbagai keunggulan utama yang kami tawarkan untuk mendukung kesuksesan akademismu.
          </p>
        </div>

        {/* Two-column layout: features grid + illustration */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr', // Kiri (Fitur), Kanan (Gambar)
          gap: '64px',
          alignItems: 'flex-start',
        }}>
          {/* Left: feature list (2 baris/kolom) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '32px 24px',
          }}>
            {features.map((feature, index) => (
              <div key={index} style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                {/* Icon Container */}
                <div style={{
                  minWidth: '64px',
                  height: '64px',
                  background: 'rgba(249,115,22,0.1)',
                  border: '2px solid #F97316',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span className="material-icons" style={{ fontSize: '32px', color: '#F97316' }}>
                    {feature.icon}
                  </span>
                </div>
                
                {/* Text Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{
                    fontFamily: 'var(--font-fredoka), sans-serif',
                    fontSize: '22px',
                    fontWeight: '700',
                    color: '#0F766E',
                    margin: '0',
                  }}>
                    {feature.title}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#71717A',
                    lineHeight: '1.6',
                    margin: '0',
                  }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Illustration */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-150px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
              borderRadius: '40px',
              padding: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                src="/why-section.png"
                alt="Kenapa Belajar di Circle Pintar"
                width={380}
                height={380}
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;