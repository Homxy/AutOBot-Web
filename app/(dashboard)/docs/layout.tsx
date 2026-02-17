// app/(dashboard)/docs/layout.tsx
import Sidebar from './Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ 
      display: 'flex', 
      height: '93vh',        // Lock height to the screen
      overflow: 'hidden',     // Prevent the whole page from scrolling
      backgroundColor: '#020617', 
      color: '#e2e8f0' 
    }}>
      {/* Sidebar stays fixed on the left */}
      <Sidebar />
      
      {/* Only this 'main' section will scroll */}
      <main style={{ 
        flex: 1, 
        padding: '60px 40px', 
        overflowY: 'auto',    // Enable vertical scrolling here
        height: '100%'        // Occupy full height of parent
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}