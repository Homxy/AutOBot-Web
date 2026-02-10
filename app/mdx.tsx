import type { MDXComponents } from 'mdx/types'
 
const components: MDXComponents = {}
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ins: ({ children }) => <span className="underline decoration-sky-500">{children}</span>,
    ...components,
  }
}