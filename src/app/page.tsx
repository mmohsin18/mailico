// app/(marketing)/page.tsx
'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Globe,
  Mail,
  Server,
  ShieldCheck,
  Sparkles,
  Users,
  Sun,
  Moon
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import WaitlistForm from '@/components/Features/WaitlistForm'

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
  const [isDark, setIsDark] = useState(false) // 🌞 light by default

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

  const pillSurface = isDark
    ? 'border-white/15 bg-white/10'
    : 'border-slate-200 bg-white/70 shadow-sm'

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
          onClick={() => setIsDark((prev) => !prev)}
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
              <Link href='#waitlist'>
                <Button
                  className={`rounded-full px-6 py-2 text-sm font-medium transition-shadow ${
                    isDark
                      ? 'shadow-[0_0_40px_rgba(125,255,106,0.4)]'
                      : 'shadow-[0_0_40px_rgba(125,255,106,0.6)]'
                  }`}
                >
                  Join the waitlist
                </Button>
              </Link>
              <Link href='#features'>
                <Button
                  className={`rounded-full border px-6 py-2 text-sm transition-colors ${
                    isDark
                      ? 'border-white/30 bg-white/5 text-white hover:bg-white/10'
                      : 'border-slate-300 bg-white/80 text-slate-900 hover:bg-white'
                  }`}
                >
                  View features
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero mock / device frame */}
          <div className='h-72 overflow-hidden'>
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className={`mx-auto mt-10 w-full max-w-xl rounded-[2rem] border p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-colors ${
                isDark ? 'border-white/15 bg-white/10' : 'border-slate-200 bg-white'
              }`}
            >
              <div
                className={`rounded-[1.6rem] border p-4 transition-colors ${
                  isDark
                    ? 'border-white/20 bg-zinc-950/90'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                {/* Faux header */}
                <div
                  className={`flex items-center justify-between text-xs ${
                    isDark ? 'text-white/70' : 'text-slate-600'
                  }`}
                >
                  <div className='flex items-center gap-2'>
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        isDark ? 'bg-lime-400/20' : 'bg-lime-400/15'
                      }`}
                    >
                      <Mail className='h-3.5 w-3.5' />
                    </div>
                    <span className='font-medium'>Mailico</span>
                  </div>
                  <Badge
                    className={`border-lime-400/30 bg-lime-400/15 text-[10px] text-lime-700 ${
                      isDark && 'text-lime-200'
                    }`}
                  >
                    Live dashboard
                  </Badge>
                </div>

                {/* Faux stats row */}
                <div className='mt-4 grid gap-3 md:grid-cols-3'>
                  <div
                    className={`${subtleBlock} rounded-2xl p-3 text-xs transition-colors`}
                  >
                    <div
                      className={`flex items-center justify-between text-[11px] ${
                        isDark ? 'text-white/60' : 'text-slate-500'
                      }`}
                    >
                      <span>Sends (24h)</span>
                      <Sparkles className='h-3 w-3' />
                    </div>
                    <div className='mt-2 text-lg font-semibold'>184,921</div>
                    <div
                      className={`mt-1 text-[11px] ${
                        isDark ? 'text-emerald-300' : 'text-emerald-600'
                      }`}
                    >
                      +12.4% vs yesterday
                    </div>
                  </div>
                  <div
                    className={`${subtleBlock} rounded-2xl p-3 text-xs transition-colors`}
                  >
                    <div
                      className={`flex items-center justify-between text-[11px] ${
                        isDark ? 'text-white/60' : 'text-slate-500'
                      }`}
                    >
                      <span>Delivery</span>
                      <ShieldCheck className='h-3 w-3' />
                    </div>
                    <div className='mt-2 text-lg font-semibold'>98.7%</div>
                    <div
                      className={`mt-1 text-[11px] ${
                        isDark ? 'text-white/60' : 'text-slate-500'
                      }`}
                    >
                      0.2% bounces
                    </div>
                  </div>
                  <div
                    className={`${subtleBlock} rounded-2xl p-3 text-xs transition-colors`}
                  >
                    <div
                      className={`flex items-center justify-between text-[11px] ${
                        isDark ? 'text-white/60' : 'text-slate-500'
                      }`}
                    >
                      <span>Product updates</span>
                      <BarChart3 className='h-3 w-3' />
                    </div>
                    <div className='mt-2 text-lg font-semibold'>42.3%</div>
                    <div
                      className={`mt-1 text-[11px] ${
                        isDark ? 'text-sky-300' : 'text-sky-600'
                      }`}
                    >
                      Avg open rate
                    </div>
                  </div>
                </div>

                {/* Faux activity list */}
                <div className='mt-4 space-y-2'>
                  {['Welcome flow', 'Invoice sent', 'Password reset', 'Churn rescue'].map(
                    (label, i) => (
                      <div
                        key={label}
                        className={`flex items-center justify-between rounded-xl border px-3 py-2 text-[11px] transition-colors ${
                          isDark
                            ? 'border-white/5 bg-white/[0.03]'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className='flex items-center gap-2'>
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isDark ? 'bg-lime-400' : 'bg-lime-500'
                            }`}
                          />
                          <span
                            className={isDark ? 'text-white/80' : 'text-slate-700'}
                          >
                            {label}
                          </span>
                        </div>
                        <span className={isDark ? 'text-white/50' : 'text-slate-500'}>
                          {i === 0 ? 'Running' : 'Sent · 2m ago'}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================== FEATURES ====================== */}
      <section
        id='features'
        className='mx-auto max-w-6xl px-5 py-10 md:py-16'
      >
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.45 }}
          className='text-center text-2xl font-semibold'
        >
          Everything you need to send serious email
        </motion.h2>
        <p
          className={`mt-2 text-center text-sm ${
            isDark ? 'text-white/70' : 'text-slate-600'
          }`}
        >
          From first OTP to millionth newsletter—all in one Mailico workspace.
        </p>

        <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`${cardBase} ${cardSurface}`}
            >
              <div
                className='mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl'
                style={{
                  background:
                    'linear-gradient(135deg, #7DFF6A, rgba(56,189,248,0.85))'
                }}
              >
                {f.icon}
              </div>
              <div className='text-base font-semibold'>{f.title}</div>
              <p
                className={`mt-1 text-sm ${
                  isDark ? 'text-white/80' : 'text-slate-600'
                }`}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================== HOW IT WORKS ====================== */}
      <section className='mx-auto max-w-5xl px-5 py-10 md:py-16'>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className='text-center text-2xl font-semibold'
        >
          How Mailico fits into your stack
        </motion.h2>

        <div className='mt-6 grid gap-4 md:grid-cols-4'>
          {[
            {
              step: '1',
              title: 'Connect your domain',
              text: 'We guide you through SPF, DKIM & DNS so your emails land in inboxes, not spam.'
            },
            {
              step: '2',
              title: 'Create a workspace',
              text: 'One place per product or client with environments, API keys, and roles.'
            },
            {
              step: '3',
              title: 'Wire up the API',
              text: 'Drop in our TS SDK or SMTP credentials. Start with OTPs, resets, and receipts.'
            },
            {
              step: '4',
              title: 'Send & observe',
              text: 'Watch live metrics, debug failures, and iterate on flows without redeploys.'
            }
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`${cardBase} ${cardSurface}`}
            >
              <Badge
                className={`mb-2 border-white/20 bg-white/10 text-white ${
                  !isDark && '!border-slate-200 !bg-slate-900 !text-white'
                }`}
              >
                {s.step}
              </Badge>
              <div className='font-semibold'>{s.title}</div>
              <p
                className={`mt-1 text-sm ${
                  isDark ? 'text-white/80' : 'text-slate-600'
                }`}
              >
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ====================== PRICING / CTA ====================== */}
      <section className='mx-auto max-w-4xl px-5 pb-16 md:pb-24'>
        <div
          className={`rounded-3xl border p-6 backdrop-blur transition-colors ${
            isDark
              ? 'border-white/15 bg-white/10'
              : 'border-slate-200 bg-white/90 shadow-sm'
          }`}
        >
          <div className='flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between'>
            <div>
              <h3 className='text-xl font-semibold'>
                Start free, scale as you grow
              </h3>
              <p
                className={`mt-1 text-sm ${
                  isDark ? 'text-white/80' : 'text-slate-600'
                }`}
              >
                Mailico is built for founders and product teams who want
                production-grade email without enterprise drama. Friendly free
                tier, simple overage, no lock-in.
              </p>
              <div
                className={`mt-3 flex items-center gap-2 text-xs ${
                  isDark ? 'text-white/60' : 'text-slate-500'
                }`}
              >
                <Globe className='h-3 w-3' />
                <span>Optimized for modern Next.js / Node stacks</span>
              </div>
            </div>
            <div className='flex flex-col gap-3 text-xs md:items-end'>
              <Link href='#waitlist'>
                <Button
                  className={`w-full rounded-full px-5 py-2 text-sm font-medium transition-shadow ${
                    isDark
                      ? 'shadow-[0_0_30px_rgba(125,255,106,0.5)]'
                      : 'shadow-[0_0_35px_rgba(125,255,106,0.7)]'
                  }`}
                >
                  Get early access
                </Button>
              </Link>
              <Link href='/pricing'>
                <Button
                  className={`w-full rounded-full border px-5 py-2 text-sm transition-colors ${
                    isDark
                      ? 'border-white/30 bg-white/5 text-white hover:bg-white/10'
                      : 'border-slate-300 bg-white/80 text-slate-900 hover:bg-white'
                  }`}
                >
                  View pricing draft
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== WAITLIST ====================== */}
      <div
        id='waitlist'
        className='mx-auto hidden max-w-4xl items-center justify-center px-5 pb-16 md:pb-24'
      >
        <WaitlistForm source='landing-hero' />
      </div>

      {/* ====================== FOOTER ====================== */}
      <footer className='mx-auto max-w-6xl px-5 pb-10 text-sm'>
        <div
          className={`rounded-2xl border p-4 backdrop-blur transition-colors ${
            isDark
              ? 'border-white/10 bg-white/5 text-white/70'
              : 'border-slate-200 bg-white/90 text-slate-500 shadow-sm'
          }`}
        >
          <div className='flex flex-col items-center justify-between gap-2 md:flex-row'>
            <div>
              © {new Date().getFullYear()} Mailico — Email for product teams
            </div>
            <div className='flex items-center gap-4'>
              <Link
                href='/blog'
                className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}
              >
                Blog
              </Link>
              <Link
                href='/privacy'
                className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}
              >
                Privacy
              </Link>
              <Link
                href='/terms'
                className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}
              >
                Terms
              </Link>
              <Link
                href='/contact'
                className={isDark ? 'hover:text-white' : 'hover:text-slate-900'}
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
