'use client'

import { Mail, Send, Workflow, UserRound } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Footer from './Footer'

const tabs = [
  { href: '/inbox', label: 'Inbox', icon: Mail },
  { href: '/sent', label: 'Sent', icon: Send },
  { href: '/automation', label: 'Automation', icon: Workflow },
  { href: '/control', label: 'Control', icon: UserRound }
] as const

export default function BottomNav() {
  const pathname = usePathname()

  // Hide on home page & auth
  if (!pathname || pathname === '/' || pathname === '/auth' || pathname.startsWith('/blog')) return <Footer/>

  return (
    <nav className="fixed inset-x-0 bottom-0 md:hidden z-50">
      <div className="mx-auto max-w-screen-sm px-4 pb-[env(safe-area-inset-bottom)]">
        <div
          className="
            mb-4 rounded-2xl border 
            border-slate-200 bg-white/90 backdrop-blur-xl shadow-lg
            dark:border-white/10 dark:bg-white/5
          "
        >
          <div className="grid grid-cols-4 gap-1 p-2">
            {tabs.map(({ href, label, icon: Icon }) => {
              const active =
                pathname === href || pathname.startsWith(href + '/')

              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={false}
                  aria-current={active ? 'page' : undefined}
                  className={[
                    'flex flex-col items-center rounded-xl px-3 py-2 text-[11px] transition-colors',
                    active
                      ? 'bg-[#7DFF6A] text-black shadow-[0_0_14px_rgba(125,255,106,0.5)]'
                      : 'text-slate-500 hover:text-black dark:text-white/60 dark:hover:text-white'
                  ].join(' ')}
                >
                  <Icon className="mb-1 h-5 w-5" />
                  <span className="leading-none">{label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
