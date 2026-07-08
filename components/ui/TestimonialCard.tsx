// src/components/ui/TestimonialCard.tsx
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  name: string;
  avatar: string;
  title: string;
  isActive?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, name, avatar, title, isActive }) => {
  return (
    <div style={{
      background: isActive ? '#0F766E' : '#ffffff',
      borderRadius: '24px',
      padding: '24px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      border: isActive ? '3px solid #0F766E' : '3px solid #0F766E', // Terdapat border di card aktif maupun tidak, atau bisa menyesuaikan. Pada gambar referensi yang tengah hijau, border warnanya hijau sehingga menyatu (atau tidak ada border/3px solid #0F766E)
      transition: 'all 0.3s ease',
      position: 'relative',
    }}>
      {/* Icon quote */}
      <div style={{ marginBottom: '-16px' }}>
        <span className="material-icons" style={{ 
          fontSize: '64px', 
          color: isActive ? '#ffffff' : '#0F766E',
          lineHeight: '1',
          marginLeft: '-8px' // geser sedikit ke kiri agar mepet
        }}>
          format_quote
        </span>
      </div>

      {/* Inject style untuk strong tag */}
      <style>{`
        .quote-text-${isActive ? 'active' : 'inactive'} strong {
          color: ${isActive ? '#ffffff' : '#0F766E'};
          font-weight: 800;
        }
      `}</style>

      {/* Quote text dengan HTML */}
      <p 
        className={`quote-text-${isActive ? 'active' : 'inactive'}`}
        style={{
          fontSize: '14px',
          color: isActive ? '#ffffff' : '#374151',
          lineHeight: '1.6',
          margin: '0',
          // Dihapus minHeight agar tinggi teks lebih fit
        }}
        dangerouslySetInnerHTML={{ __html: `"${quote}"` }}
      />

      {/* Pill Avatar + Name */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        background: isActive ? '#ffffff' : '#0F766E',
        padding: '6px 24px 6px 6px',
        borderRadius: '50px',
        border: '2px solid #F97316',
        alignSelf: 'flex-start',
      }}>
        {/* Avatar initial */}
        <div style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          background: isActive ? '#0F766E' : '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: isActive ? '#ffffff' : '#0F766E', fontSize: '14px', fontWeight: '700' }}>
            {name.charAt(0)}
          </span>
        </div>
        
        {/* Nama & Role */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '13px', fontWeight: '700', color: isActive ? '#0F766E' : '#ffffff', lineHeight: '1.2' }}>{name}</span>
          <span style={{ fontSize: '10px', color: isActive ? '#9CA3AF' : 'rgba(255,255,255,0.7)', lineHeight: '1.2' }}>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;