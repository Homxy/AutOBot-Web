import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // หัวข้อ h1, h2
    h1: ({ children }) => <h1 style={{ color: '#38bdf8', fontSize: '2.5rem', borderBottom: '1px solid #334155', paddingBottom: '10px', marginTop: '40px' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ color: '#7dd3fc', fontSize: '1.8rem', marginTop: '30px' }}>{children}</h2>,
    h4: ({ children }) => <h4 style={{ color: '#94a3b8', fontSize: '1.2rem', marginTop: '20px' }}>{children}</h4>,
    
    // ตาราง (สำคัญมากเพราะในรูปตารางเละ)
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '20px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #334155' }}>{children}</table>
      </div>
    ),
    tr: ({ children }) => <tr style={{ borderBottom: '1px solid #334155' }}>{children}</tr>,
    th: ({ children }) => <th style={{ backgroundColor: '#1e293b', padding: '12px', border: '1px solid #334155', textAlign: 'left', fontWeight: 'bold', color: '#e2e8f0' }}>{children}</th>,
    td: ({ children }) => <td style={{ padding: '12px', border: '1px solid #334155', color: '#cbd5e1' }}>{children}</td>,
    
    // โค้ด
    pre: ({ children }) => <pre style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', overflowX: 'auto', border: '1px solid #334155', marginBottom: '20px' }}>{children}</pre>,
    code: ({ children }) => <code style={{ color: '#f472b6', backgroundColor: 'rgba(244, 114, 182, 0.1)', padding: '2px 5px', borderRadius: '4px' }}>{children}</code>,
    
    // เส้นใต้เดิมที่คุณมี
    ins: ({ children }) => <span className="underline decoration-sky-500">{children}</span>,
    ...components,
  }
}