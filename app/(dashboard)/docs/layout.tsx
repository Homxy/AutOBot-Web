// app/(dashboard)/docs/layout.tsx
import Sidebar from './Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#020617', // Darkest background
      color: '#e2e8f0' 
    }}>
      <Sidebar />
      <main style={{ 
        flex: 1, 
        padding: '60px 40px', 
        overflowY: 'auto' 
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}