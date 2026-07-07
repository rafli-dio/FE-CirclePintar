'use client';
// src/components/ui/ClassCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ClassCardProps {
  image: string;
  title: string;
  author: string;
  description: string;
  progress: number;
  totalMateri: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ image, title, author, description, progress, totalMateri }) => {
  return (
    <div className="class-card" style={{
      padding: '12px',
      gap: '12px',
      border: '2px solid #0F766E',
      borderRadius: '24px',
    }}>
      {/* Image Container */}
      <div style={{ position: 'relative', width: '100%', height: '160px', borderRadius: '16px', overflow: 'hidden' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {/* Badge "10 Materi" */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: '#0F766E',
          color: 'white',
          fontSize: '11px',
          fontWeight: '700',
          padding: '6px 14px',
          borderRadius: '50px',
        }}>
          {totalMateri} Materi
        </span>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '0 4px' }}>
        <h4 style={{ fontFamily: 'var(--font-fredoka), sans-serif', fontSize: '17px', fontWeight: '700', color: '#0F766E', margin: '0' }}>{title}</h4>
        <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '0', fontWeight: '500' }}>{author}</p>
        <p style={{ fontSize: '11px', color: '#71717A', margin: '8px 0 0 0', lineHeight: '1.4' }}>{description}</p>
      </div>

      {/* Buttons: Modul, Kuis, Lihat Kelas */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 4px', marginTop: '4px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {/* Modul Button */}
          <Link href="#" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: '#0F766E', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '600', textDecoration: 'none'
          }}>
            Modul
            <span className="material-icons" style={{ fontSize: '14px' }}>menu_book</span>
          </Link>
          {/* Kuis Button */}
          <Link href="#" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: '#0F766E', color: 'white', padding: '6px 12px', borderRadius: '50px', fontSize: '11px', fontWeight: '600', textDecoration: 'none'
          }}>
            Kuis
            <span className="material-icons" style={{ fontSize: '14px' }}>visibility</span>
          </Link>
        </div>
        
        {/* Lihat Kelas Button */}
        <Link href="#" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#62A8A0', color: 'white', padding: '4px 4px 4px 14px', borderRadius: '50px', fontSize: '11px', fontWeight: '700', textDecoration: 'none'
        }}>
          Lihat Kelas
          <span style={{
            width: '22px', height: '22px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <span className="material-icons" style={{ fontSize: '14px', color: '#62A8A0' }}>arrow_forward</span>
          </span>
        </Link>
      </div>

      {/* Progress Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '0 4px', marginTop: '6px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F766E' }}>Progress</span>
          <span style={{ fontSize: '10px', color: '#9CA3AF', fontWeight: '600' }}>{progress}/{totalMateri} Materi Selesai</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: '#E4E4E7', borderRadius: '50px', overflow: 'hidden' }}>
          <div style={{ width: `${(progress / totalMateri) * 100}%`, height: '100%', background: '#0F766E', borderRadius: '50px' }}></div>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;