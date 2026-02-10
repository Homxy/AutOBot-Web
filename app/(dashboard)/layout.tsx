import Navbar from "@/components/layout/navbar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen">
      <Navbar />
      <main  className="flex-1">
        {children}
      </main>
    </div>
  )
}