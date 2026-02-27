// Example for app/(dashboard)/docs/feature/spec/page.tsx
import Link from 'next/link';

export default function SoftwareDocs() {
  const categories = [
    { id: 'logic', name: 'Logic', nameTh: 'ตรรกะ' },
    { id: 'loops', name: 'Loops', nameTh: 'ลูป' },
    { id: 'math', name: 'Math', nameTh: 'คณิตศาสตร์' },
    { id: 'text', name: 'Text', nameTh: 'ข้อความ' },
    { id: 'pins', name: 'Pins', nameTh: 'พิน' },
    { id: 'control', name: 'Control', nameTh: 'การควบคุม' },
    { id: 'autobot', name: 'AutOBot', nameTh: 'ไลบรารี AutOBot' },
  ];

  return (
    <div style={{ color: 'var(--text-secondary)' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', marginBottom: '20px' }}>
        Software Documentation
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '40px' }}>
        Select a category below to view its documentation. Both English and Thai versions are available.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {categories.map((cat) => (
          <div key={cat.id} style={{
            padding: '20px',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>{cat.name} / {cat.nameTh}</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Link href={`/docs/software/${cat.id}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                English
              </Link>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <Link href={`/docs/software/${cat.id}_th`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                ภาษาไทย
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}