"use client"

import React from 'react';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation'
import {GoogleLogo, FacebookLogo, MicrosoftLogo} from '@/components/ui/logo';
import {signIn} from "next-auth/react"

export default function SignInPage() {
  const route = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      
      <div className="bg-white p-8 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] w-full max-w-sm">
        <div className="flex flex-col gap-4">
          
          <Button onClick={() => {signIn("google", {callbackUrl: "/"})}}>
            <GoogleLogo />
            <span>Sign in with Google</span>
          </Button>
          
        </div>
      </div>
    </div>
  );
}