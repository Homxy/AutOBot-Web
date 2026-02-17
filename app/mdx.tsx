import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings: Using pure white (#ffffff) to match the "Autobot Library" style
    h1: ({ children }) => (
      <h1 style={{ 
        color: '#ffffff', 
        fontSize: '2.5rem', 
        fontWeight: 'bold',
        marginTop: '40px',
        marginBottom: '20px' 
      }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ 
        color: '#ffffff', 
        fontSize: '2rem', 
        fontWeight: 'bold',
        marginTop: '30px',
        marginBottom: '15px' 
      }}>{children}</h2>
    ),
    // For smaller headers like "Create Class Robot(Init)"
    h4: ({ children }) => (
      <h4 style={{ 
        color: '#ffffff', 
        fontSize: '1.2rem', 
        fontWeight: 'bold',
        marginTop: '20px',
        marginBottom: '10px' 
      }}>{children}</h4>
    ),
    
    // Paragraphs: Subtle grey/white for readability
    p: ({ children }) => (
      <p style={{ 
        color: '#e2e8f0', 
        lineHeight: '1.6', 
        marginBottom: '16px' 
      }}>{children}</p>
    ),

    // Tables
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '20px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #334155' }}>{children}</table>
      </div>
    ),
    tr: ({ children }) => <tr style={{ borderBottom: '1px solid #334155' }}>{children}</tr>,
    th: ({ children }) => <th style={{ backgroundColor: '#1e293b', padding: '12px', border: '1px solid #334155', textAlign: 'left', fontWeight: 'bold', color: '#ffffff' }}>{children}</th>,
    td: ({ children }) => <td style={{ padding: '12px', border: '1px solid #334155', color: '#cbd5e1' }}>{children}</td>,
    
    // Code Blocks: Matching the dark grey container in the image
    pre: ({ children }) => (
      <pre style={{ 
        backgroundColor: '#2b2e35d0', 
        padding: '20px', 
        borderRadius: '8px', 
        overflowX: 'auto', 
        border: '1px solid #334155', 
        marginBottom: '20px',
        color: '#e2e8f0'
      }}>{children}</pre>
    ),
    // Inline Code: Using the muted highlight style
    code: ({ children }) => (
      <code style={{ 
        color: '#e2e8f0', 
        backgroundColor: '#2b2e357c', 
        padding: '2px 6px', 
        borderRadius: '4px',
        fontSize: '0.9em'
      }}>{children}</code>
    ),
    
    // Links: Using the yellow/gold underline style seen in "Demo" links
    a: ({ children, href }) => (
      <a href={href} style={{ 
        color: '#facc15', 
        textDecoration: 'underline', 
        textUnderlineOffset: '4px' 
      }}>{children}</a>
    ),

    ins: ({ children }) => <span className="underline decoration-sky-500">{children}</span>,
    ...components,
  }
}