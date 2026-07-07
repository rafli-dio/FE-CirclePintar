// src/components/sections/ClassListing.tsx
import Link from 'next/link';
import ClassCard from '../ui/ClassCard';

const classes = [
  {
    image: '/class-ipa.png',
    category: 'IPA',
    categoryColor: '#10B981',
    title: 'IPA Terpadu Kelas 8',
    rating: 4.8,
    students: 1200,
    label: 'TERPOPULER',
  },
  {
    image: '/class-mtk.png',
    category: 'Matematika',
    categoryColor: '#6366F1',
    title: 'Matematika Dasar Kelas 7',
    rating: 4.7,
    students: 1150,
  },
  {
    image: '/class-ipa.png',
    category: 'IPA',
    categoryColor: '#10B981',
    title: 'Kimia Dasar Kelas 10',
    rating: 4.9,
    students: 980,
    label: 'TERBARU',
  },
  {
    image: '/class-ips.png',
    category: 'IPS',
    categoryColor: '#F97316',
    title: 'Sejarah Indonesia Modern',
    rating: 4.8,
    students: 1050,
  },
  {
    image: '/class-mtk.png',
    category: 'Matematika',
    categoryColor: '#6366F1',
    title: 'Matematika SMA Kelas 10',
    rating: 4.7,
    students: 1100,
  },
  {
    image: '/class-ipa.png',
    category: 'IPA',
    categoryColor: '#10B981',
    title: 'Fisika Dasar SMP Kelas 8',
    rating: 4.6,
    students: 950,
  },
];

const ClassListing = () => {
  return (
    <section style={{ background: '#f8fffe', padding: '80px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: '16px',
          marginBottom: '48px',
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
            BELAJAR DI CIRCLE PINTAR
          </span>

          <h2 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '40px',
            fontWeight: '700',
            color: '#121212',
            margin: '0',
            lineHeight: '1.2',
          }}>
            Temukan{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Kelas Favoritmu
            </span>{' '}
            di Sini
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#71717A',
            maxWidth: '560px',
            lineHeight: '1.7',
            margin: '0',
          }}>
            Belajar nggak harus bosen! Mulai dari materi sains hingga coding. 
            Pilih materi yang kamu sukai di Circle Pintar!
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
        }}>
          {classes.map((cls, index) => (
            <ClassCard key={index} {...cls} />
          ))}
        </div>

        {/* See all link */}
        <div style={{ textAlign: 'right', marginTop: '32px' }}>
          <Link
            href="/course"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#1BAA8A',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
          >
            Lihat Semua Kelas
            <span className="material-icons" style={{ fontSize: '18px' }}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ClassListing;