'use client';
// src/components/ui/ClassCard.tsx
import Image from 'next/image';
import Link from 'next/link';

interface ClassCardProps {
  image: string;
  category: string;
  categoryColor: string;
  title: string;
  rating: number;
  students: number;
  label?: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ image, category, categoryColor, title, rating, students, label }) => {
  return (
    <div className="class-card">
      {/* Image */}
      <div style={{ position: 'relative', width: '100%', height: '180px', overflow: 'hidden', background: '#f5f5f5' }}>
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        {label && (
          <span style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'linear-gradient(135deg, #F97316, #ea6c0f)',
            color: 'white',
            fontSize: '11px',
            fontWeight: '700',
            padding: '4px 12px',
            borderRadius: '50px',
            letterSpacing: '0.5px',
          }}>
            {label}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
        {/* Category badge */}
        <span style={{
          background: categoryColor,
          color: 'white',
          fontSize: '11px',
          fontWeight: '700',
          padding: '4px 10px',
          borderRadius: '50px',
          width: 'fit-content',
          letterSpacing: '0.5px',
        }}>
          {category}
        </span>

        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#121212',
          margin: '0',
          lineHeight: '1.4',
        }}>
          {title}
        </h4>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          marginTop: 'auto',
          borderTop: '1px solid #f0f0f0',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: '#F59E0B', fontSize: '16px' }}>★</span>
            <span style={{ fontSize: '14px', fontWeight: '700', color: '#121212' }}>{rating.toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#71717A' }}>
            <span className="material-icons" style={{ fontSize: '16px', color: '#1BAA8A' }}>groups</span>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>{students.toLocaleString()} Siswa</span>
          </div>
        </div>

        {/* Enroll button */}
        <Link
          href="#"
          className="class-card-btn"
        >
          Mulai Belajar
          <span className="material-icons" style={{ fontSize: '16px' }}>arrow_forward</span>
        </Link>
      </div>
    </div>
  );
};

export default ClassCard;