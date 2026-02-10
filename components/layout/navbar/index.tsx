"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession, signOut } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import Button from '../../ui/button'
import ProfileMenu from '../profile'

const Links = [
  { href: "/", text: "Home" },
  { href: "/docs", text: "Docs" },
]

export default function Navbar() {
  const router = useRouter()
  const { data: session, status } = useSession()

  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 h-16 max-w-[1400px] mx-auto">

        {/* Left */}
        <div className="flex items-center gap-6">
          <img src="/assets/logo/logo.svg" alt="logo" width={40} height={40} />

          <nav className="hidden md:block text-sm font-medium text-gray-600">
            <ul className="flex gap-6">
              {Links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-black">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-8 w-8 animate-pulse bg-gray-200 rounded-full" />
          ) : session ? (
            <ProfileMenu image={session.user?.image} />
          ) : (
            <Button className="px-3" onClick={() => router.push("/login")}>
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
