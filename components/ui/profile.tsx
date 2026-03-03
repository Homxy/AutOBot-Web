"use client"

import { useEffect, useRef, useState } from "react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

type ProfileMenuProps = {
  image?: string | null
}

export default function ProfileMenu({ image }: ProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      {/* Avatar */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="focus:outline-none"
      >
        <img
          src={image || "/assets/default-avatar.png"}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-gray-200 hover:ring-2 hover:ring-blue-500 transition"
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          <button
            onClick={() => {
              setOpen(false)
              router.push("/profile")
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
          >
            My Profile
          </button>

          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  )
}
