'use client'

import Link from 'next/link'
import { WapsButton } from '@/components/Elements/WapsButton'

export default function NotFound() {
  return (
    <main
      className="
        flex min-h-screen flex-col items-center justify-center 
        bg-[radial-gradient(800px_500px_at_50%_-10%,rgba(125,255,106,0.30),transparent),_#F8FAFC]
        p-6 text-slate-900
        transition-colors duration-300
        dark:bg-[radial-gradient(800px_500px_at_50%_-10%,rgba(125,255,106,0.18),transparent),_#05060A]
        dark:text-white
      "
    >
      {/* Card wrapper */}
      <div
        className="
          rounded-3xl border border-slate-200 bg-white/70 
          px-10 py-12 text-center shadow-xl backdrop-blur-lg
          dark:border-white/10 dark:bg-white/5
        "
      >
        <h1
          className="
            text-7xl font-extrabold tracking-tight
            text-[#7DFF6A] drop-shadow-[0_0_25px_rgba(125,255,106,0.45)]
          "
        >
          404
        </h1>

        <p
          className="
            mt-4 text-lg text-slate-600
            dark:text-white/70
          "
        >
          This page could not be found.
        </p>

        <div className="mt-8 flex justify-center">
          <Link href="/">
            <WapsButton 
              variant="glow"
              className="
                rounded-full px-6 py-2 font-medium
                bg-[#7DFF6A] text-black
                shadow-[0_0_30px_rgba(125,255,106,0.6)]
                hover:bg-[#6BEE59]
                dark:bg-[#7DFF6A] dark:text-black
              "
            >
              Go Home
            </WapsButton>
          </Link>
        </div>
      </div>
    </main>
  )
}
