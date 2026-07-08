// src/components/sections/ClassListing.tsx
import Link from 'next/link';
import ClassCard from '../ui/ClassCard';

const classes = [
  {
    image: '/class-ipa.png',
    title: 'Biologi SMA/MA Kelas 10',
    author: 'Oleh: Ibu Sari P., S.Pd.',
    description: 'Jelajahi rahasia makhluk hidup dan ekosistem alam dengan cara seru',
    progress: 7,
    totalMateri: 10,
  },
  {
    image: '/class-mtk.png',
    title: 'Fisika SMA/MA Kelas 10',
    author: 'Oleh: Ibu Sari P., S.Pd.',
    description: 'Jelajahi rahasia fisika dan hukum alam dengan cara seru',
    progress: 7,
    totalMateri: 10,
  },
  {
    image: '/class-ipa.png',
    title: 'Matematika SMA/MA Kelas 10',
    author: 'Oleh: Ibu Sari P., S.Pd.',
    description: 'Jelajahi rahasia angka dan logika hitung dengan cara seru',
    progress: 7,
    totalMateri: 10,
  },
  {
    image: '/class-ips.png',
    title: 'Sejarah SMA/MA Kelas 10',
    author: 'Oleh: Ibu Sari P., S.Pd.',
    description: 'Jelajahi rahasia sejarah alam dan masa lalu dengan cara seru',
    progress: 7,
    totalMateri: 10,
  },
  {
    image: '/class-mtk.png',
    title: 'Biologi SMA/MA Kelas 10',
    author: 'Oleh: Ibu Sari P., S.Pd.',
    description: 'Jelajahi rahasia anatomi dan jaringan tubuh dengan cara seru',
    progress: 7,
    totalMateri: 10,
  },
  {
    image: '/class-ipa.png',
    title: 'Biologi SMA/MA Kelas 10',
    author: 'Oleh: Ibu Sari P., S.Pd.',
    description: 'Jelajahi rahasia sel dan perkembangbiakan dengan cara seru',
    progress: 7,
    totalMateri: 10,
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
            background: '#ffffff',
            border: '1.5px solid #F97316',
            color: '#F97316',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.5px',
          }}>
            BELAJAR DI CIRCLE PINTAR
          </span>

          <h2 className="text-[32px] md:text-[40px]" style={{
            fontFamily: 'var(--font-fredoka)',
            fontWeight: '700',
            margin: '0',
            lineHeight: '1.2',
          }}>
            <span style={{ color: '#0F766E' }}>Temukan</span>{' '}
            <span style={{ color: '#F97316' }}>
              Kelas Favoritmu
            </span>{' '}
            <span style={{ color: '#0F766E' }}>di Sini</span>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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