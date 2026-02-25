// Example for app/(dashboard)/docs/feature/spec/page.tsx
export default function DummyPage() {
  return (
    <div style={{ color: 'var(--text-secondary)' }}>
      <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', marginBottom: '20px' }}>
        Hardware Coming Soon
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
        This section of the <strong>Autobot</strong> documentation is currently under development.
        Please check back later for technical specifications and details.
      </p>
      <div style={{
        marginTop: '40px',
        padding: '20px',
        border: '1px dashed var(--border-color)',
        borderRadius: '8px',
        textAlign: 'center',
        color: 'var(--text-muted)'
      }}>
        [ Documentation Placeholder ]
      </div>
    </div>
  );
}