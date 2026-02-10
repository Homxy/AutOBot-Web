import DocsSidebar from '@/components/layout/sidebar';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <DocsSidebar />

      <main className="flex-1">
        {children}
      </main>
    </div>
  )
}