// Example for app/(dashboard)/docs/feature/spec/page.tsx
export default function DummyPage() {
  return (
    <div style={{ color: '#e2e8f0' }}>
      <h1 style={{ color: '#ffffff', fontSize: '2.5rem', marginBottom: '20px' }}>
        Spec Coming Soon
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
        This section of the <strong>Autobot</strong> documentation is currently under development. 
        Please check back later for technical specifications and details.
      </p>
      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        border: '1px dashed #334155', 
        borderRadius: '8px',
        textAlign: 'center',
        color: '#64748b'
      }}>
        [ Documentation Placeholder ]
      </div>
    </div>
  );
}