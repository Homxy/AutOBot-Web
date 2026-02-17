"use client"
import React from "react";
import Link from 'next/link';
import FuncRef from "./func_ref.mdx"
import { useMDXComponents } from "../../../../mdx"
import { MDXProvider } from '@mdx-js/react'


export default function Docs(){
    const components = useMDXComponents({});
    return(
        <MDXProvider components={components}>
            <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: '#e2e8f0' }}>
                <FuncRef />
                <section style={{ marginTop: '30px' }}>
                <h2 style={{ color: '#38bdf8' }}>More Info</h2>
                <ul style={{ lineHeight: '1.8' }}>
                <li><Link href="/docs/ai/demo" style={{ color: '#facc15' }}>Demo</Link></li>
                <li><Link href="/docs/ai/advanced" style={{ color: '#facc15' }}>Advance Edit</Link></li>
                </ul>
            </section>
            </div>
        </MDXProvider>
    )
}