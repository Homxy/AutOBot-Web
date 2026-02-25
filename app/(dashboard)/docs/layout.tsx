// app/(dashboard)/docs/layout.tsx
import Sidebar from './Sidebar';
import { ThemeProvider } from './ThemeContext';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <div style={{ 
        display: 'flex', 
        height: '93vh', 
        overflow: 'hidden',
        backgroundColor: 'var(--bg-main)', 
        color: 'var(--text-secondary)',
        transition: 'background-color 0.3s ease'
      }}>
        <Sidebar />
        <main style={{ 
          flex: 1, 
          padding: '60px 40px', 
          overflowY: 'auto',
          height: '100%'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}