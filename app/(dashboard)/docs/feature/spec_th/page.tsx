"use client"
import Link from 'next/link';
import React, { useEffect, useState } from "react";
import Spec from "./spec.mdx"
import { useMDXComponents } from "../../../../mdx"
import { MDXProvider } from '@mdx-js/react'

const slugify = (str: string) => {
    return str
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\p{L}\p{N}\-]+/gu, '')
        .replace(/\-\-+/g, '-');
};

const CustomH2 = ({ children }: { children: React.ReactNode }) => {
    const id = typeof children === 'string' ? slugify(children) : '';
    return <h2 id={id} style={{ color: '#38bdf8', scrollMarginTop: '100px' }}>{children}</h2>;
};

const CustomH3 = ({ children }: { children: React.ReactNode }) => {
    const id = typeof children === 'string' ? slugify(children) : '';
    return <h3 id={id} style={{ color: 'var(--text-secondary)', scrollMarginTop: '100px' }}>{children}</h3>;
};

const TableOfContents = () => {
    const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('h2, h3'));
        const data = elements.map((elem) => ({
            id: elem.id,
            text: (elem as HTMLElement).innerText,
            level: Number(elem.tagName.substring(1)),
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
            <div style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '1200px',
                margin: '0',
                padding: '10px',
                position: 'relative'
            }}>

                <div style={{ flex: 1, minWidth: 0, color: 'var(--text-secondary)' }}>
                    <Spec />

                    <section style={{ marginTop: '50px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
                        <h2 id="more-info" style={{ color: '#38bdf8' }}>ข้อมูลเพิ่มเติม</h2>
                        <ul style={{ lineHeight: '1.8' }}>
                            <li><Link href="/docs/feature/component_th" style={{ color: '#facc15' }}>รายการส่วนประกอบ</Link></li>
                            <li><Link href="/docs/hardware_th" style={{ color: '#facc15' }}>ฮาร์ดแวร์</Link></li>
                            <li><Link href="/docs/ai/usage_th" style={{ color: '#facc15' }}>AI - วิธีใช้งาน</Link></li>
                        </ul>
                    </section>
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
