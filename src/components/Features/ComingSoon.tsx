'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Rocket, Sparkles, Bell, ArrowLeft } from 'lucide-react'

type ComingSoonProps = {
  title?: string
  description?: string
  badgeText?: string
  onBack?: () => void
  onNotify?: () => void
}

export default function ComingSoon({
  title = 'Coming soon',
  description = 'This section is under construction. We’re building it next.',
  badgeText = 'In progress',
  onBack,
  onNotify
}: ComingSoonProps) {
  return (
    <div className="grid min-h-[calc(100vh-10rem)] place-items-center px-4 py-8">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-white/5 md:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e8f0fe] dark:bg-white/10">
              <Rocket className="h-5 w-5" />
            </div>
            <div>
              <Badge className="border-slate-200 bg-white/80 text-slate-700 dark:border-white/10 dark:bg-white/10 dark:text-white">
                {badgeText}
              </Badge>
              <h2 className="mt-2 text-lg font-semibold tracking-tight text-slate-900 dark:text-white md:text-xl">
                {title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {description}
              </p>
            </div>
          </div>

          <Sparkles className="h-5 w-5 text-slate-400 dark:text-slate-500" />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row">
            {onNotify && (
              <Button
                className="rounded-full"
                onClick={onNotify}
              >
                <Bell className="mr-2 h-4 w-4" />
                Notify me
              </Button>
            )}

            {onBack && (
              <Button
                variant="outline"
                className="rounded-full"
                onClick={onBack}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go back
              </Button>
            )}
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400">
            Updates shipping soon ✨
          </div>
        </div>
      </div>
    </div>
  )
}
