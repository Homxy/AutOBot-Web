"use client"
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Advanced from "./advanced.mdx"
import { useMDXComponents } from "../../../../mdx" // Adjust path if needed
import { MDXProvider } from '@mdx-js/react'

// 1. Helper to turn text into a URL-friendly ID (e.g. "My Header" -> "my-header")
const slugify = (str: string) => {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\p{L}\p{N}\-]+/gu, '') // Remove non-letter/number chars (Unicode-aware)
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
};

// 2. Custom components to auto-add IDs to your Markdown headers
const CustomH2 = ({ children }: { children: React.ReactNode }) => {
  const id = typeof children === 'string' ? slugify(children) : '';
  return <h2 id={id} style={{ color: '#38bdf8', scrollMarginTop: '100px' }}>{children}</h2>;
};

const CustomH3 = ({ children }: { children: React.ReactNode }) => {
  const id = typeof children === 'string' ? slugify(children) : '';
  return <h3 id={id} style={{ color: 'var(--text-secondary)', scrollMarginTop: '100px' }}>{children}</h3>;
};

// 3. The Table of Contents Component
const TableOfContents = () => {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    // Find all H2 and H3 elements inside the article
    const elements = Array.from(document.querySelectorAll('h2, h3'));
    const data = elements.map((elem) => ({
      id: elem.id,
      text: (elem as HTMLElement).innerText,
      level: Number(elem.tagName.substring(1)), // 2 or 3
    }));
    setHeadings(data);
  }, []);

  return (
    <nav style={{ position: 'sticky', top: '20px', alignSelf: 'start' }}>
      <h4 style={{ color: 'var(--text-primary)', marginBottom: '10px', fontSize: '1.1rem' }}>ในหน้านี้</h4>
      <ul style={{ listStyle: 'none', padding: 0, borderLeft: '2px solid var(--border-color)' }}>
        {headings.map((heading) => (
          <li key={heading.id} style={{ marginBottom: '8px' }}>
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
                // Optional: Smooth scroll behavior
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
      {/* CHANGE: 
         1. Removed "margin: 0 auto" (which centered it).
         2. Reduced "padding" from 40px to 20px (optional, for tighter spacing).
      */}
      <div style={{
        display: 'flex',
        gap: '10px',
        maxWidth: '1200px',
        margin: '0',        // <--- Changed from '0 auto' to '0' to align left
        padding: '10px',    // <--- Reduced padding (was 40px)
        position: 'relative'
      }}>

        {/* Left Column: Content */}
        <div style={{ flex: 1, minWidth: 0, color: 'var(--text-secondary)' }}>
          <Advanced />

          <section style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <h2 id="more-info" style={{ color: '#38bdf8' }}>ข้อมูลเพิ่มเติม</h2>
            <ul style={{ lineHeight: '1.8' }}>
              <li><Link href="/docs/ai/usage_th" style={{ color: '#facc15' }}>วิธีใช้งาน</Link></li>
              <li><Link href="/docs/ai/demo_th" style={{ color: '#facc15' }}>ตัวอย่าง</Link></li>
              <li><Link href="/docs/ai/reference_th" style={{ color: '#facc15' }}>อ้างอิงฟังก์ชัน</Link></li>
            </ul>
          </section>
        </div>

        {/* Right Column: Table of Contents */}
        <div style={{ width: '250px', flexShrink: 0, display: 'none' }} className="toc-container">
          {/* We hide this on small screens via CSS class or use simple logic below */}
          <div className="hidden md:block">
            <TableOfContents />
          </div>
        </div>

        {/* Quick inline style for responsiveness (Optional: move to CSS file) */}
        <style jsx global>{`
          @media (min-width: 1000px) {
            .toc-container { display: block !important; }
          }
        `}</style>

      </div>
    </MDXProvider>
  )
}