'use client'

import { motion } from 'framer-motion'
import { Check, Mail, Server, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function PricingPage() {
  const [isYearly, setIsYearly] = React.useState(false)

  const plans = [
    {
      name: 'Free',
      price: '0',
      description: 'Perfect for side projects and hobbies.',
      features: [
        '1 Verified Email per Domain',
        '3 Users per Domain',
        'Standard Deliverability',
        '24h Insights Retention',
        'Community Support'
      ],
      cta: 'Get Started',
      href: '/auth',
      highlight: false
    },
    {
      name: 'Pro',
      price: isYearly ? '3000' : '300',
      period: isYearly ? '/year' : '/month',
      description: 'Ideal for startups and professional teams.',
      features: [
        '3 Verified Emails per Domain',
        '8 Users per Domain',
        'Enhanced Deliverability',
        '30-day Insights Retention',
        'Priority Slack Support',
        'Custom Webhooks'
      ],
      cta: 'Start Pro Trial',
      href: '/auth?plan=pro',
      highlight: true
    },
    {
      name: 'Business',
      price: '600',
      period: '/month',
      description: 'For organizations with massive scale.',
      features: [
        'Unlimited Emails per Domain',
        'Unlimited Users per Domain',
        'Dedicated IP (Add-on)',
        'Lifetime Insights Retention',
        '24/7 Dedicated Support',
        'SLA Guarantee'
      ],
      cta: 'Contact Sales',
      href: '/auth?plan=business',
      highlight: false
    }
  ]

  return (
    <div className="min-h-screen bg-[#F9FBFF] dark:bg-[#05060A] dark:text-white pb-20">
      {/* Header */}
      <section className="relative pt-24 pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-2xl"
        >
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-none px-4 py-1">Pricing Plans</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="mt-6 text-lg text-slate-600 dark:text-slate-400">
            Choose the plan that fits your current stage. Scale as you grow without any hidden tech debt.
          </p>

          {/* Toggle */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>Monthly</span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className="relative h-6 w-11 rounded-full bg-slate-200 dark:bg-white/10 transition-colors focus:outline-none"
            >
              <div
                className={`absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform ${isYearly ? 'translate-x-5' : ''}`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-slate-900 dark:text-white' : 'text-slate-500'}`}>
              Yearly <span className="text-emerald-500 text-xs font-bold ml-1">Save 15%</span>
            </span>
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="px-6 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] border transition-all hover:scale-[1.02] ${
                plan.highlight 
                ? 'border-emerald-500/50 bg-white dark:bg-zinc-900 shadow-2xl z-10' 
                : 'border-slate-200 bg-white/50 dark:border-white/5 dark:bg-white/5'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-xl font-bold text-slate-900 dark:text-white">BDT</span>
                  {plan.period && <span className="text-slate-500 text-sm font-medium">{plan.period}</span>}
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map(feature => (
                  <div key={feature} className="flex gap-3 text-sm">
                    <div className="h-5 w-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-emerald-500" />
                    </div>
                    <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.href}>
                <Button 
                  className={`w-full h-12 rounded-full font-bold transition-all ${
                    plan.highlight 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200'
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Comparison Table / Detailed features */}
      <section className="mt-32 px-6 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Detailed Plan Comparison</h2>
          <p className="text-slate-600 dark:text-slate-400">Everything you need to know about our infrastructure limits.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-white/5 bg-white dark:bg-white/5">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/5">
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-500">Feature</th>
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white text-center">Free</th>
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-emerald-600 text-center">Pro</th>
                <th className="p-6 text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white text-center">Business</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/5">
              {[
                { label: 'Emails per Domain', free: '1', pro: '3', biz: 'Unlimited' },
                { label: 'Users per Domain', free: '3', pro: '8', biz: 'Unlimited' },
                { label: 'Domain Sharing', free: 'Max 3 Users', pro: 'Unlimited', biz: 'Unlimited' },
                { label: 'Real-time Insights', free: 'Standard', pro: 'Priority', biz: 'Enterprise' },
                { label: 'Custom Domain SSL', free: 'Check', pro: 'Check', biz: 'Check' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-sm font-medium">{row.label}</td>
                  <td className="p-6 text-sm text-center text-slate-600 dark:text-slate-400">{row.free === 'Check' ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : row.free}</td>
                  <td className="p-6 text-sm text-center font-semibold text-emerald-600">{row.pro === 'Check' ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : row.pro}</td>
                  <td className="p-6 text-sm text-center text-slate-600 dark:text-slate-400">{row.biz === 'Check' ? <Check className="mx-auto h-4 w-4 text-emerald-500" /> : row.biz}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ / Simple CTA */}
      <section className="mt-32 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
          <div>
            <h4 className="font-bold mb-2">Can I upgrade or downgrade anytime?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Yes, you can change your plan at any time from your dashboard. Pro-rated charges will apply.</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">What happens if I exceed my limits?</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">We don't block outgoing emails immediately, but you'll receive a notification to upgrade your plan.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
