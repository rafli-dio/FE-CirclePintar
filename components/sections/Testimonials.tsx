'use client';
// src/components/sections/Testimonials.tsx
import { useState } from 'react';
import TestimonialCard from '../ui/TestimonialCard';

const testimonials = [
  {
    quote: 'Nggak bosen dengerin materi. Materi interaktif juga kuis yang bikin belajar jadi seru banget bareng Circle Pintar! Nilai saya naik drastis!',
    name: 'Kania Rahayu',
    avatar: '/avatar-kania.png',
    title: 'Siswa Kelas 10, SMAN 1 Jakarta',
  },
  {
    quote: 'Materi terstruktur dan gampang dimengerti. Progress belajarnya juga bisa kepantau terus. Paling suka fitur gamifikasi dan reward-nya!',
    name: 'Arief Rahadian',
    avatar: '/avatar-arief.png',
    title: 'Siswa Kelas 11, SMAN 3 Bandung',
  },
  {
    quote: 'Platform belajar yang paling beda dari yang lain. Bener-bener anti bosan dan bikin ketagihan belajar. Highly recommended!',
    name: 'Fitriani',
    avatar: '/avatar-fitriani.png',
    title: 'Siswa Kelas 12, SMAN 2 Surabaya',
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
          marginBottom: '52px',
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
            CERITA SUKSES
          </span>

          <h2 style={{
            fontFamily: 'var(--font-fredoka)',
            fontSize: '40px',
            fontWeight: '700',
            color: '#121212',
            margin: '0',
            lineHeight: '1.2',
          }}>
            Apa Kata{' '}
            <span style={{
              background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Mereka
            </span>{' '}
            Yang Sudah Bergabung
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
          {testimonials.map((t, index) => (
            <TestimonialCard key={index} {...t} isActive={index === activeIndex} />
          ))}
        </div>

        {/* Carousel controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}>
          <button
            onClick={() => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: activeIndex === 0 ? '#f0f0f0' : 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
              color: activeIndex === 0 ? '#71717A' : 'white',
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
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: i === activeIndex ? '28px' : '10px',
                  height: '10px',
                  borderRadius: '50px',
                  background: i === activeIndex ? '#1BAA8A' : '#D1D5DB',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  padding: '0',
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActiveIndex((prev) => (prev + 1) % testimonials.length)}
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