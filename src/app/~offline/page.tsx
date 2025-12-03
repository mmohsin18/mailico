'use client'

import Link from 'next/link'
import { WifiOff } from 'lucide-react'
import { WapsButton } from '@/components/Elements/WapsButton'

export default function Offline() {
  return (
    <main
      className="
        flex min-h-screen flex-col items-center justify-center 
        bg-[radial-gradient(800px_500px_at_50%_-10%,rgba(125,255,106,0.18),transparent),_#F8FAFC]
        p-6 text-center text-slate-900
        transition-colors duration-300
        dark:bg-[radial-gradient(800px_500px_at_50%_-10%,rgba(125,255,106,0.16),transparent),_#05060A]
        dark:text-white
      "
    >
      {/* Icon */}
      <div
        className="
          flex h-20 w-20 items-center justify-center
          rounded-2xl border border-slate-200 bg-white shadow-lg
          dark:border-white/10 dark:bg-white/5
        "
      >
        <WifiOff className="h-10 w-10 text-[#7DFF6A]" />
      </div>

      {/* Title */}
      <h1 className="mt-6 text-2xl font-semibold tracking-tight">
        You’re Offline
      </h1>

      {/* Subtitle */}
      <p className="mt-2 max-w-sm text-sm text-slate-600 dark:text-slate-300">
        Looks like your internet connection dropped. You can still view your
        saved emails & drafts. Try reconnecting to continue.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex gap-3">
        <Link href="/">
          <WapsButton
            variant="default"
            className="
              rounded-full bg-[#7DFF6A] text-black shadow-[0_0_20px_rgba(125,255,106,0.6)]
              hover:bg-[#6BEE59]
            "
          >
            Try Again
          </WapsButton>
        </Link>

        <Link href="/saved">
          <WapsButton
            variant="outline"
            className="
              rounded-full border-slate-300 bg-white/80 text-slate-900 hover:bg-white
              dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20
            "
          >
            Saved Emails
          </WapsButton>
        </Link>
      </div>
    </main>
  )
}
