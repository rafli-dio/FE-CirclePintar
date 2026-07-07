// src/components/sections/FeatureCards.tsx
import Image from 'next/image';

const features = [
  {
    icon: 'menu_book',
    color: '#1BAA8A',
    bgColor: 'rgba(27,170,138,0.1)',
    title: 'Kurikulum Terarah',
    description: 'Materi terstruktur dan terukur mulai dari materi dasar hingga lanjut sesuai kurikulum terbaru.',
  },
  {
    icon: 'emoji_emotions',
    color: '#6366F1',
    bgColor: 'rgba(99,102,241,0.1)',
    title: 'Belajar Anti Bosan',
    description: 'Materi interaktif dikemas secara seru agar belajar tidak membosankan dan selalu semangat.',
  },
  {
    icon: 'trending_up',
    color: '#F97316',
    bgColor: 'rgba(249,115,22,0.1)',
    title: 'Pantau Progressmu',
    description: 'Tersedia progress tracker canggih yang membantu memantau perkembangan belajarmu setiap hari.',
  },
  {
    icon: 'military_tech',
    color: '#EF4444',
    bgColor: 'rgba(239,68,68,0.1)',
    title: 'Gamifikasi & Reward',
    description: 'Kerjakan soal atau tantangan di Circle Pintar untuk kumpulkan badge, koin, dan reward seru!',
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
        {/* Header centered */}
        <div style={{
          textAlign: 'center',
          marginBottom: '52px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <span style={{
            background: 'linear-gradient(135deg, rgba(27,170,138,0.12), rgba(27,170,138,0.06))',
            border: '1px solid rgba(27,170,138,0.25)',
            color: '#0D7A62',
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
            color: '#121212',
            margin: '0',
            lineHeight: '1.2',
          }}>
            Kenapa Harus Belajar di{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              CirclePintar?
            </span>
          </h2>
        </div>

        {/* Two-column layout: features grid + illustration */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}>
          {/* Left: 2x2 feature grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="feature-card"
              >
                <div style={{
                  width: '52px',
                  height: '52px',
                  background: feature.bgColor,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <span className="material-icons" style={{ fontSize: '26px', color: feature.color }}>
                    {feature.icon}
                  </span>
                </div>
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#121212',
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
            ))}
          </div>

          {/* Right: Illustration */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'linear-gradient(135deg, #FFF7ED, #FEF3C7)',
              borderRadius: '40px',
              padding: '32px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Image
                src="/why-illustration.png"
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