// mdx.tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: 'bold', marginTop: '40px', marginBottom: '20px' }}>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 style={{ color: 'var(--text-primary)', fontSize: '2rem', fontWeight: 'bold', marginTop: '30px', marginBottom: '15px' }}>{children}</h2>
    ),
    h4: ({ children }) => (
      <h4 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 'bold', marginTop: '20px', marginBottom: '10px' }}>{children}</h4>
    ),
    img: (props) => (
      <img {...props} style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px', marginTop: '20px', marginBottom: '20px', border: '1px solid var(--border-color)' }} />
    ),
    p: ({ children }) => (
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px' }}>{children}</p>
    ),
    table: ({ children }) => (
      <div style={{ overflowX: 'auto', margin: '20px 0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid var(--border-color)' }}>{children}</table>
      </div>
    ),
    th: ({ children }) => (
      <th style={{ backgroundColor: 'var(--bg-sidebar)', padding: '12px', border: '1px solid var(--border-color)', textAlign: 'left', color: 'var(--text-primary)' }}>{children}</th>
    ),
    td: ({ children }) => (
      <td style={{ padding: '12px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>{children}</td>
    ),
    pre: ({ children }) => (
      <pre style={{ backgroundColor: 'var(--code-bg)', padding: '20px', borderRadius: '8px', overflowX: 'auto', border: '1px solid var(--border-color)', marginBottom: '20px', color: 'var(--text-secondary)' }}>{children}</pre>
    ),
    code: ({ children }) => (
      <code style={{ color: 'var(--text-secondary)', backgroundColor: 'var(--code-bg)', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>{children}</code>
    ),
    a: ({ children, href }) => (
      <a href={href} style={{ color: '#facc15', textDecoration: 'underline', textUnderlineOffset: '4px' }}>{children}</a>
    ),
    ...components,
  }
}