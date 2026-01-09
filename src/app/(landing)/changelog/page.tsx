'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Calendar, 
  ChevronRight, 
  Rocket, 
  ShieldCheck, 
  Zap, 
  Bug, 
  Layout, 
  CreditCard 
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const updates = [
  {
    date: 'January 9, 2026',
    version: 'v0.8.4',
    title: 'Billing, Navigation & Performance',
    description: 'We focused on making Mailico more reliable and ready for production usage.',
    items: [
      {
        type: 'feature',
        title: 'Premium Billing & Usage Dashboard',
        description: 'New billing page with real-time usage tracking for emails, sender identities, and team members.',
        icon: <CreditCard className="h-4 w-4" />
      },
      {
        type: 'fix',
        title: 'Router Initialization Fix',
        description: 'Resolved a critical issue where "router" was undefined in the tasks layout, causing navigation failures.',
        icon: <Bug className="h-4 w-4" />
      },
      {
        type: 'improvement',
        title: 'Landing Page v2',
        description: 'Complete redesign of the landing page with high-fidelity mockups and improved conversion flows.',
        icon: <Layout className="h-4 w-4" />
      }
    ]
  },
  {
    date: 'January 3, 2026',
    version: 'v0.8.0',
    title: 'Dashboard V2 & Real-time Analytics',
    description: 'A major milestone in how you observe and manage your email traffic.',
    items: [
      {
        type: 'feature',
        title: 'Real-time Ingestion Graphs',
        description: 'New real-time charts in the control panel showing email ingestion and delivery status as it happens.',
        icon: <Zappy className="h-4 w-4" />
      },
      {
        type: 'feature',
        title: 'Inbox View Redesign',
        description: 'A cleaner, faster inbox interface with improved filtering and rapid-preview reading panes.',
        icon: <Layout className="h-4 w-4" />
      },
      {
        type: 'improvement',
        title: 'Advanced Security Logs',
        description: 'SOC2-ready activity logs and per-session security monitoring now available in the control panel.',
        icon: <ShieldCheck className="h-4 w-4" />
      }
    ]
  }
]

// Fixed icon name (Zap instead of Zappy)
function Zappy(props: any) {
  return <Zap {...props} />
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-[#f6f8fc] dark:bg-black">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/10 text-emerald-600 transition-colors group-hover:bg-emerald-500/20">
              <ArrowLeft className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Changelog Updates</span>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-5 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <Badge className="mb-4 bg-indigo-500/10 text-indigo-600 border-none">Product Updates</Badge>
          <h1 className="text-4xl font-bold md:text-5xl">What's New in Mailico</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Stay up to date with the latest features, improvements, and fixes we're shipping to make Mailico the best email platform for product teams.
          </p>
        </motion.div>

        <div className="space-y-12">
          {updates.map((update, i) => (
            <motion.section 
              key={update.date}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline Connector */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-white/10 md:hidden" />
              
              <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8">
                {/* Side Date Info */}
                <div className="hidden md:block pt-1 text-right">
                  <div className="flex items-center justify-end gap-2 text-sm font-semibold text-emerald-500">
                    <Calendar className="h-4 w-4" />
                    {update.date}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{update.version}</div>
                </div>

                {/* Content Card */}
                <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-white/5 md:p-8">
                  <div className="md:hidden flex items-center gap-2 mb-4 text-xs font-bold text-emerald-500 uppercase tracking-widest">
                    {update.date} • {update.version}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3">{update.title}</h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {update.description}
                  </p>

                  <div className="space-y-6">
                    {update.items.map((item, j) => (
                      <div key={j} className="flex gap-4">
                        <div className={`mt-1 h-9 w-9 shrink-0 flex items-center justify-center rounded-xl ${
                          item.type === 'feature' ? 'bg-emerald-500/10 text-emerald-600' :
                          item.type === 'fix' ? 'bg-red-500/10 text-red-600' :
                          'bg-sky-500/10 text-sky-600'
                        }`}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-sm">{item.title}</h3>
                            <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md ${
                              item.type === 'feature' ? 'bg-emerald-500/10 text-emerald-600' :
                              item.type === 'fix' ? 'bg-red-500/10 text-red-600' :
                              'bg-sky-500/10 text-sky-600'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground leading-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 rounded-[2.5rem] bg-indigo-600 text-white text-center overflow-hidden relative"
        >
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <h3 className="text-xl font-bold relative z-10">Follow the journey</h3>
          <p className="mt-2 text-indigo-100/80 text-sm relative z-10">Get real-time updates as we ship new features.</p>
          <div className="mt-6 flex justify-center gap-3 relative z-10">
            <Button className="rounded-full bg-white text-indigo-600 hover:bg-slate-100">
              Subscribe to Updates
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
