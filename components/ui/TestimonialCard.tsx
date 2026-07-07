// src/components/ui/TestimonialCard.tsx

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
      background: '#ffffff',
      borderRadius: '24px',
      padding: '28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      boxShadow: isActive
        ? '0 12px 40px rgba(27, 170, 138, 0.18)'
        : '0 4px 16px rgba(0,0,0,0.07)',
      border: isActive
        ? '2px solid rgba(27,170,138,0.3)'
        : '1px solid #f0f0f0',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative quote mark */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '80px',
        color: 'rgba(27,170,138,0.06)',
        fontFamily: 'Georgia, serif',
        lineHeight: '1',
        userSelect: 'none',
      }}>
        &ldquo;
      </div>

      {/* Quote icon */}
      <div style={{
        width: '44px',
        height: '44px',
        background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span className="material-icons" style={{ fontSize: '22px', color: 'white' }}>format_quote</span>
      </div>

      {/* Quote text */}
      <p style={{
        fontSize: '15px',
        color: '#374151',
        lineHeight: '1.75',
        margin: '0',
        fontStyle: 'italic',
      }}>
        &ldquo;{quote}&rdquo;
      </p>

      {/* Avatar + Name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* Avatar placeholder with initials */}
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #1BAA8A, #0D7A62)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{ color: 'white', fontSize: '18px', fontWeight: '700' }}>
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <h5 style={{ fontSize: '15px', fontWeight: '700', color: '#121212', margin: '0' }}>{name}</h5>
          <p style={{ fontSize: '13px', color: '#71717A', margin: '0' }}>{title}</p>
        </div>

        {/* Star rating */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '2px' }}>
          {[...Array(5)].map((_, i) => (
            <span key={i} style={{ color: '#F59E0B', fontSize: '14px' }}>★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;