// components/Footer.tsx
'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <footer className="min-w-7xl mx-20 px-5 pb-10 text-sm">
      <div
        className={`rounded-2xl border p-4 backdrop-blur transition-colors ${
          isDark
            ? 'border-white/10 bg-white/5 text-white/70'
            : 'border-slate-200 bg-white/90 text-slate-500 shadow-sm'
        }`}
      >
        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
          <div>© {new Date().getFullYear()} Mailico — Email for product teams</div>
          <div className="flex items-center gap-4">
            {['Blog', 'Privacy', 'Terms', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
