'use client';
// src/components/sections/Testimonials.tsx
import { useState } from 'react';
import TestimonialCard from '../ui/TestimonialCard';

const testimonials = [
  // Page 1
  {
    quote: 'Penjelasan materi Biologinya gampang banget dipahami! <strong>Animasi</strong> dan <strong>visual</strong> di modulnya bikin materi yang tadinya ribet jadi langsung nempel di kepala.',
    name: 'Andi Setiawan Nugroho',
    avatar: '/avatar-andi.png',
    title: 'Siswa Kelas 10',
  },
  {
    quote: 'Suka banget sama fitur <strong>progress bar-nya!</strong> Aku jadi tahu bab mana yang belum selesai dibaca, jadi pas mau ujian nggak ada materi yang kelewat.',
    name: 'Rara Amelia',
    avatar: '/avatar-rara.png',
    title: 'Siswa Kelas 11',
  },
  {
    quote: 'Biasanya malas banget kalau disuruh baca rangkuman lewat PDF, tapi kuis <strong>interaktif</strong> di Circle Pintar <strong>seru pol</strong>. Belajar berasa kayak lagi main game!',
    name: 'Farel Putra',
    avatar: '/avatar-farel.png',
    title: 'Siswa Kelas 12',
  },
  // Page 2
  {
    quote: 'Materi terstruktur dan gampang dimengerti. <strong>Fitur gamifikasi</strong> bikin aku makin semangat buat ngumpulin koin belajar setiap hari.',
    name: 'Dinda Kirana',
    avatar: '/avatar-dinda.png',
    title: 'Siswa Kelas 11',
  },
  {
    quote: 'Belajar Matematika yang awalnya bikin pusing, sekarang jadi seru banget karena banyak <strong>contoh soal interaktif</strong>. Keren banget Circle Pintar!',
    name: 'Bima Sakti',
    avatar: '/avatar-bima.png',
    title: 'Siswa Kelas 10',
  },
  {
    quote: 'Tampilan aplikasinya bagus dan <strong>user-friendly</strong>. Paling suka karena materinya selalu update dengan kurikulum terbaru.',
    name: 'Cindy Pramesti',
    avatar: '/avatar-cindy.png',
    title: 'Siswa Kelas 12',
  },
];

const Testimonials = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const displayedTestimonials = testimonials.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

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
          marginBottom: '24px',
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
            CERITA SUKSES
          </span>

          <h2 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '40px',
            fontWeight: '700',
            margin: '0',
            lineHeight: '1.2',
          }}>
            <span style={{ color: '#0F766E' }}>Apa Kata</span>{' '}
            <span style={{ color: '#F97316' }}>Mereka</span>{' '}
            <span style={{ color: '#0F766E' }}>Yang Sudah</span>{' '}
            <span style={{ color: '#F97316' }}>Bergabung</span>
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#71717A',
            maxWidth: '520px',
            lineHeight: '1.7',
            margin: '0',
          }}>
            Ribuan siswa sudah membuktikan keseruan belajar bersama Circle Pintar. 
            Giliran kamu untuk merasakan perbedaannya!
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          marginBottom: '40px',
        }}>
          {displayedTestimonials.map((t, index) => (
            <TestimonialCard 
              key={index} 
              {...t} 
              isActive={index === 1} // Kartu yang di tengah (index 1 dari 3) selalu active (warna hijau)
            />
          ))}
        </div>

        {/* Carousel controls (Pagination) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <button
            onClick={() => setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: currentPage === 0 ? '#f0f0f0' : 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              color: currentPage === 0 ? '#71717A' : 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <span className="material-icons" style={{ fontSize: '20px' }}>chevron_left</span>
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                style={{
                  width: i === currentPage ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '50px',
                  background: i === currentPage ? '#1BAA8A' : '#D1D5DB',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '0',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => (prev + 1) % totalPages)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <span className="material-icons" style={{ fontSize: '20px' }}>chevron_right</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;