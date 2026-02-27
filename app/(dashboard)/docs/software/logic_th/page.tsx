"use client"
import React, { useEffect, useState } from "react";
import Content from "./logic_th.mdx"
import { useMDXComponents } from "../../../../mdx" // Adjust path up to root /mdx.tsx
import { MDXProvider } from '@mdx-js/react'

const slugify = (str: string) => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

const extractString = (children: any): string => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractString).join('');
  if (children && typeof children === 'object' && 'props' in children) return extractString((children as any).props.children);
  return '';
};

const CustomH2 = ({ children }: { children: React.ReactNode }) => {
  const text = extractString(children);
  const id = slugify(text) || Math.random().toString(36).substring(2, 9);
  return <h2 id={id} style={{ color: '#38bdf8', scrollMarginTop: '100px' }}>{children}</h2>;
};

const CustomH3 = ({ children }: { children: React.ReactNode }) => {
  const text = extractString(children);
  const id = slugify(text) || Math.random().toString(36).substring(2, 9);
  return <h3 id={id} style={{ color: 'var(--text-secondary)', scrollMarginTop: '100px' }}>{children}</h3>;
};

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    const data = elements.map((elem, index) => ({
      id: elem.id || `heading-${index}`,
      text: (elem as HTMLElement).innerText,
      level: Number(elem.tagName.substring(1)),
    }));
    setHeadings(data);
  }, []);

  return (
    <nav style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
      <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.1rem' }}>On this page</h4>
      <ul style={{ listStyle: 'none', padding: 0, borderLeft: '2px solid var(--border-color)' }}>
        {headings.map((heading, index) => (
          <li key={`${heading.id}-${index}`} style={{ marginBottom: '8px' }}>
            <a
              href={`#${heading.id}`}
              style={{
                display: 'block',
                paddingLeft: heading.level === 3 ? '20px' : '10px',
                color: heading.level === 2 ? 'var(--text-secondary)' : 'var(--text-muted)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                borderLeft: '2px solid transparent',
                marginLeft: '-2px',
              }}
              className="toc-link"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default function Docs() {
  const components = useMDXComponents({
    h2: CustomH2,
    h3: CustomH3,
  });

  return (
    <MDXProvider components={components}>
      <div style={{ display: 'flex', gap: '10px', maxWidth: '1200px', margin: '0', padding: '10px', position: 'relative' }}>
        <div style={{ flex: 1, minWidth: 0, color: 'var(--text-secondary)' }}>
          <Content />
        </div>
        <div style={{ width: '250px', flexShrink: 0, display: 'none' }} className="toc-container">
          <div className="hidden md:block">
            <TableOfContents />
          </div>
        </div>
        <style jsx global>{`
          @media (min-width: 1000px) {
            .toc-container { display: block !important; }
          }
        `}</style>
      </div>
    </MDXProvider>
  )
}
