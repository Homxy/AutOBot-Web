"use client"
import React from "react";
import Guide from "./guide.mdx"
import { useMDXComponents } from "../../../../mdx"
import { MDXProvider } from '@mdx-js/react'


export default function Docs(){
    const components = useMDXComponents({});
    return(
        <MDXProvider components={components}>
            <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', color: '#e2e8f0' }}>
                <Guide />
            </div>
        </MDXProvider>
    )
}