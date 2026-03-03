import Navbar from "@/components/layout/navbar"
import { ToastProvider } from "@/components/ui/toast/ToastContext"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen">
      <Navbar />
      <main  className="flex-1">
        <ToastProvider>
          {children}
        </ToastProvider>
      </main>
    </div>
  )
}