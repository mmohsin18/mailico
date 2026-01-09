// app/(marketing)/page.tsx
'use client'

import { motion } from 'framer-motion'
import {
  BarChart3,
  Globe,
  Mail,
  Moon,
  Server,
  ShieldCheck,
  Sparkles,
  Sun,
  Users
} from 'lucide-react'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

/* --- tiny parallax hook (reads scroll and returns offsets for layers) --- */
function useParallax() {
  const [y, setY] = useState(0)

  useEffect(() => {
    const onScroll = () => setY(window.scrollY || 0)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return {
    far: y * 0.15,
    mid: y * 0.3,
    near: y * 0.45
  }
}

export default function LandingPage() {
  const p = useParallax()

  // 🌞 light by default
  const [isDark, setIsDark] = useState(false)

  // ✅ Read saved theme on mount (client only)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark') setIsDark(true)
    } catch {
      // ignore
    }
  }, [])

  // ✅ Persist theme whenever it changes (client only)
  useEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [isDark])

  const lightBg =
    'radial-gradient(1200px 700px at 10% -10%, rgba(125,255,106,0.18), transparent 55%), ' +
    'radial-gradient(1100px 700px at 110% 10%, rgba(56,189,248,0.16), transparent 50%), #F9FBFF'

  const darkBg =
    'radial-gradient(1200px 700px at 10% -10%, rgba(125,255,106,0.22), transparent 55%), ' +
    'radial-gradient(1100px 700px at 110% 10%, rgba(56,189,248,0.18), transparent 50%), #05060A'

  const bg = isDark ? darkBg : lightBg

  const features = useMemo(
    () => [
      {
        icon: <Mail className='h-5 w-5' />,
        title: 'Transactional email that just delivers',
        desc: 'Order confirmations, OTPs, password resets—sent in milliseconds with battle-tested infrastructure.'
      },
      {
        icon: <Sparkles className='h-5 w-5' />,
        title: 'Campaigns without the bloat',
        desc: 'Ship product updates and newsletters from the same place you ship transactional emails. No clunky “enterprise” UI.'
      },
      {
        icon: <Users className='h-5 w-5' />,
        title: 'Lists, segments & tags',
        desc: 'Group users by behavior, plan, or custom traits. Send the right message to the right cohort, every time.'
      },
      {
        icon: <Server className='h-5 w-5' />,
        title: 'Developer-first API',
        desc: 'Typed SDKs, API keys per project, sandbox mode, and clear logs. Built for modern TS/Next.js stacks.'
      },
      {
        icon: <ShieldCheck className='h-5 w-5' />,
        title: 'Deliverability guardrails',
        desc: 'SPF/DKIM helpers, suppression lists, bounce handling, and webhooks so you don’t end up in spam hell.'
      },
      {
        icon: <BarChart3 className='h-5 w-5' />,
        title: 'Live insights that matter',
        desc: 'Opens, clicks, failures, and cohorts—at a glance. No vanity charts, just the numbers you actually use.'
      }
    ],
    []
  )

  const cardBase = `rounded-2xl border p-4 backdrop-blur transition-colors duration-300`
  const cardSurface = isDark
    ? 'border-white/15 bg-white/10'
    : 'border-slate-200 bg-white/80 shadow-sm'

  const subtleBlock = isDark
    ? 'border-white/10 bg-white/5'
    : 'border-slate-200 bg-white/80 shadow-sm'

  return (
    <main
      className={`min-h-dvh transition-colors duration-500 ${
        isDark ? 'text-white' : 'text-slate-900'
      }`}
      style={{ background: bg }}
    >
      {/* ====================== THEME TOGGLE ====================== */}
      <div className='pointer-events-none fixed right-5 top-5 z-40'>
        <Button
          onClick={() => {
            // ✅ avoids stale isDark, also persists correctly
            setIsDark(prev => !prev)
          }}
          className={`pointer-events-auto h-9 w-9 rounded-full border text-xs transition-colors duration-300 ${
            isDark
              ? 'border-white/25 bg-white/5 text-white hover:bg-white/10'
              : 'border-slate-200 bg-white/90 text-slate-900 hover:bg-white'
          }`}
          aria-label='Toggle color mode'
        >
          {isDark ? <Sun className='h-4 w-4' /> : <Moon className='h-4 w-4' />}
        </Button>
      </div>

      {/* ====================== HERO ====================== */}
      <section className='relative overflow-hidden'>
        {/* Parallax BG layers */}
        <div
          className='pointer-events-none absolute -left-36 -top-36 h-96 w-96 rounded-full blur-3xl'
          style={{
            transform: `translateY(${p.far}px)`,
            background: isDark
              ? 'radial-gradient(closest-side, rgba(125,255,106,0.30), transparent)'
              : 'radial-gradient(closest-side, rgba(125,255,106,0.40), transparent)'
          }}
        />
        <div
          className='pointer-events-none absolute -right-24 top-24 h-[26rem] w-[26rem] rounded-full blur-3xl'
          style={{
            transform: `translateY(${p.mid}px)`,
            background: isDark
              ? 'radial-gradient(closest-side, rgba(56,189,248,0.25), transparent)'
              : 'radial-gradient(closest-side, rgba(56,189,248,0.28), transparent)'
          }}
        />
        <div
          className='pointer-events-none absolute -bottom-24 left-10 h-[22rem] w-[22rem] rounded-full blur-3xl'
          style={{
            transform: `translateY(${p.near}px)`,
            background: isDark
              ? 'radial-gradient(closest-side, rgba(125,255,106,0.18), transparent)'
              : 'radial-gradient(closest-side, rgba(125,255,106,0.24), transparent)'
          }}
        />

        {/* Hero content */}
        <div className='relative mx-auto max-w-5xl px-5 pb-10 pt-16 md:pb-16 md:pt-24'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mx-auto max-w-2xl text-center'
          >
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur transition-colors ${
                isDark
                  ? 'border-white/15 bg-white/10 text-white/80'
                  : 'border-slate-200 bg-white/90 text-slate-700 shadow-sm'
              }`}
            >
              <span className='inline-block h-2 w-2 rounded-full bg-lime-400' />
              New: One stack for transactional &amp; product email
            </div>

            <h1 className='mt-4 text-4xl font-semibold leading-tight md:text-5xl'>
              Mailico — Email infrastructure for product teams
            </h1>
            <p
              className={`mt-3 text-sm md:text-base ${
                isDark ? 'text-white/80' : 'text-slate-600'
              }`}
            >
              A modern email layer for SaaS and startups. Ship transactional and
              marketing emails from one clean dashboard, with developer-first
              APIs and real-time insight into every send.
            </p>

            <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
              <Link href='/auth'>
                <Button
                  className={`rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-lime-400 text-black shadow-[0_0_40px_rgba(125,255,106,0.4)] hover:bg-lime-300'
                      : 'bg-slate-900 text-white shadow-[0_0_40px_rgba(0,0,0,0.2)] hover:bg-slate-800'
                  }`}
                >
                  Get Started Free
                </Button>
              </Link>
              <Link href='/auth?mode=login'>
                <Button
                  variant="outline"
                  className={`rounded-full px-8 py-6 text-base font-semibold transition-all hover:scale-105 ${
                    isDark
                      ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                      : 'border-slate-300 bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero mock / device frame */}
          <div className='mt-12 overflow-hidden'>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
              className={`mx-auto w-full max-w-4xl rounded-[2.5rem] border p-2 shadow-[0_40px_100px_rgba(0,0,0,0.25)] backdrop-blur-2xl transition-colors ${
                isDark
                  ? 'border-white/10 bg-white/5'
                  : 'border-slate-200 bg-white/80'
              }`}
            >
              <div
                className={`overflow-hidden rounded-[2.2rem] border transition-colors ${
                  isDark
                    ? 'border-white/10 bg-zinc-950'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                {/* Faux header */}
                <div
                  className={`flex items-center justify-between border-b px-6 py-4 transition-colors ${
                    isDark ? 'border-white/5 text-white/70' : 'border-slate-200 text-slate-600'
                  }`}
                >
                  <div className='flex items-center gap-3'>
                    <div className='flex h-3 gap-1.5'>
                      <div className='h-3 w-3 rounded-full bg-red-500/20 border border-red-500/30' />
                      <div className='h-3 w-3 rounded-full bg-amber-500/20 border border-amber-500/30' />
                      <div className='h-3 w-3 rounded-full bg-emerald-500/20 border border-emerald-500/30' />
                    </div>
                    <div className='ml-4 flex items-center gap-2'>
                      <Mail className='h-4 w-4' />
                      <span className='text-sm font-semibold'>Mailico Cloud</span>
                    </div>
                  </div>
                  <Badge
                    className={`border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium text-emerald-600 ${
                      isDark && 'text-emerald-400'
                    }`}
                  >
                    System Operational
                  </Badge>
                </div>

                {/* Main Content Area */}
                <div className='grid grid-cols-1 md:grid-cols-[240px_1fr] min-h-[400px]'>
                  {/* Faux Sidebar */}
                  <div className={`hidden md:block border-r p-4 transition-colors ${
                    isDark ? 'border-white/5 bg-white/[0.02]' : 'border-slate-200 bg-white/40'
                  }`}>
                    <div className='space-y-1'>
                      {['Summary', 'Analytics', 'Templates', 'Settings'].map((item, i) => (
                        <div key={item} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                          i === 0 
                            ? (isDark ? 'bg-white/10 text-white' : 'bg-slate-900 text-white') 
                            : (isDark ? 'text-white/50 hover:text-white/80' : 'text-slate-500 hover:text-slate-900')
                        }`}>
                          <div className={`h-1.5 w-1.5 rounded-full ${i === 0 ? 'bg-emerald-400' : 'bg-transparent'}`} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Faux Content */}
                  <div className='p-6'>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <div className={`${subtleBlock} rounded-2xl p-5 transition-all hover:scale-[1.02]`}>
                        <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Total Deliveries</div>
                        <div className='mt-2 text-3xl font-bold'>1.2M</div>
                        <div className='mt-2 flex items-center gap-2 text-xs text-emerald-500'>
                          <Sparkles className='h-3 w-3' />
                          <span>99.9% Success rate</span>
                        </div>
                      </div>
                      <div className={`${subtleBlock} rounded-2xl p-5 transition-all hover:scale-[1.02]`}>
                        <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>Active Users</div>
                        <div className='mt-2 text-3xl font-bold'>48.5k</div>
                        <div className='mt-2 flex items-center gap-2 text-xs text-sky-500'>
                          <Users className='h-3 w-3' />
                          <span>+24% this month</span>
                        </div>
                      </div>
                    </div>

                    <div className={`mt-6 ${subtleBlock} rounded-2xl p-5`}>
                      <div className='flex items-center justify-between'>
                        <div className='text-sm font-semibold'>Real-time Ingestion</div>
                        <div className='h-2 w-2 animate-pulse rounded-full bg-emerald-500' />
                      </div>
                      <div className='mt-4 flex items-end gap-1 h-20'>
                        {[40, 70, 45, 90, 65, 80, 50, 85, 60, 75, 55, 95].map((h, i) => (
                          <div 
                            key={i} 
                            style={{ height: `${h}%` }} 
                            className={`flex-1 rounded-t-sm ${isDark ? 'bg-emerald-400/40' : 'bg-emerald-500/30'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================== FEATURES ====================== */}
      <section id='features' className='mx-auto max-w-6xl px-5 py-20'>
        <div className='text-center'>
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-none hover:bg-emerald-500/10">Powerful Features</Badge>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl font-bold md:text-4xl'
          >
            Everything you need for serious email
          </motion.h2>
          <p className={`mx-auto mt-4 max-w-2xl text-lg ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
            Built for developers, loved by marketing. Mailico combines production-grade deliverability with a clean, modern interface.
          </p>
        </div>

        <div className='mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${cardBase} ${cardSurface} group hover:border-emerald-500/50 hover:shadow-xl transition-all p-8`}
            >
              <div className='mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform'>
                {f.icon}
              </div>
              <h3 className='text-xl font-bold mb-3'>{f.title}</h3>
              <p className={`text-base leading-relaxed ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================== SOCIAL PROOF / STATS ====================== */}
      <section className={`border-y transition-colors py-20 ${isDark ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-slate-50/50'}`}>
        <div className='mx-auto max-w-6xl px-5'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            {[
              { label: 'Emails Sent', value: '1.2B+' },
              { label: 'Active Users', value: '50k+' },
              { label: 'Uptime', value: '99.99%' },
              { label: 'Latency', value: '<50ms' },
            ].map((stat, i) => (
              <div key={i} className='text-center'>
                <div className='text-3xl font-bold md:text-4xl text-emerald-500'>{stat.value}</div>
                <div className={`mt-2 text-sm font-medium uppercase tracking-wider ${isDark ? 'text-white/40' : 'text-slate-500'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PRICING / CTA ====================== */}
      <section className='mx-auto max-w-5xl px-5 py-24'>
        <div
          className={`relative overflow-hidden rounded-[3rem] border p-12 text-center transition-colors ${
            isDark
              ? 'border-white/10 bg-white/5 shadow-2xl'
              : 'border-slate-200 bg-white shadow-xl'
          }`}
        >
          {/* BG Decoration */}
          <div className='pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl' />
          <div className='pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl' />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className='text-3xl font-bold md:text-5xl'>Ready to scale your email?</h2>
            <p className={`mx-auto mt-6 max-w-xl text-lg md:text-xl ${isDark ? 'text-white/60' : 'text-slate-600'}`}>
              Join thousands of developers and product teams building with Mailico. Start free, no credit card required.
            </p>
            
            <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
              <Link href='/auth'>
                <Button
                  className={`rounded-full px-12 py-8 text-lg font-bold transition-all hover:scale-105 ${
                    isDark
                      ? 'bg-lime-400 text-black shadow-emerald-500/20'
                      : 'bg-emerald-600 text-white shadow-emerald-600/20'
                  }`}
                >
                  Start Sending Now
                </Button>
              </Link>
              <Link href='/auth?mode=login'>
                <Button
                  variant="outline"
                  className={`rounded-full px-12 py-8 text-lg font-bold transition-all hover:scale-105 ${
                    isDark
                      ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                      : 'border-slate-200 bg-white text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  Login to Account
                </Button>
              </Link>
            </div>
            
            <div className={`mt-8 flex items-center justify-center gap-6 text-sm ${isDark ? 'text-white/40' : 'text-slate-500'}`}>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='h-4 w-4 text-emerald-500' />
                SOC2 Compliant
              </div>
              <div className='flex items-center gap-2'>
                <Globe className='h-4 w-4 text-emerald-500' />
                GDPR Ready
              </div>
              <div className='flex items-center gap-2'>
                <Sparkles className='h-4 w-4 text-emerald-500' />
                No Credit Card
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================== FOOTER ====================== */}
      <footer className={`border-t py-12 transition-colors ${isDark ? 'border-white/5 text-white/40' : 'border-slate-100 text-slate-500'}`}>
        <div className='mx-auto max-w-6xl px-5 flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex items-center gap-2 font-bold text-lg text-slate-900 dark:text-white'>
            <Mail className='h-5 w-5 text-emerald-500' />
            Mailico
          </div>
          <div className='flex gap-8 text-sm font-medium'>
            <Link href="/pricing" className="hover:text-emerald-500 transition-colors">Pricing</Link>
            <Link href="#" className="hover:text-emerald-500 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-emerald-500 transition-colors">Terms</Link>
            <Link href="/blog" className="hover:text-emerald-500 transition-colors">Blog</Link>
            <Link href="#" className="hover:text-emerald-500 transition-colors">Contact</Link>
          </div>
          <div className='text-sm'>
            &copy; {new Date().getFullYear()} Mailico. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}
