'use client'

import ComposeModal from '@/components/Layout/ComposeModal'
import SideBar from '@/components/Layout/SideBar'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { Mail, RefreshCcw, Settings } from 'lucide-react'
import Image from 'next/image'
import * as React from 'react'
import { toast } from 'sonner'

export default function TasksLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [composeOpen, setComposeOpen] = React.useState(false)

  return (
    <>
      {/* Compose */}
      <ComposeModal open={composeOpen} onOpenChange={setComposeOpen} />

      {/* App shell */}
      <div className='min-h-screen bg-[#f6f8fc] dark:bg-black'>
        <div className='mx-auto max-w-[1400px] px-3 py-4 md:px-5'>
          {/* Top bar */}
          <div className='sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60'>
            <div className='mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-3 md:px-5'>
              <div className='flex items-center gap-2'>
                <div className='grid h-9 w-9 place-items-center rounded-full bg-[#e9eef6] dark:bg-white/10'>
                  <Mail className='h-5 w-5' />
                </div>
                <div className='hidden text-sm font-semibold md:block'>
                  Mailico
                </div>
              </div>

              {/* <div className='flex flex-1 items-center'>
                <div className='relative w-full max-w-[720px]'>
                  <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
                  <Input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder='Search mail'
                    className='h-10 rounded-full border-slate-200 bg-[#eef3fb] pl-9 shadow-none focus-visible:ring-0 dark:border-white/10 dark:bg-white/5'
                  />
                </div>
              </div> */}

              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  className='h-10 rounded-full'
                  onClick={() => toast.message('Refresh (mock)')}
                >
                  <RefreshCcw className='h-4 w-4' />
                </Button>
                <Button
                  variant='ghost'
                  className='h-10 rounded-full'
                  onClick={() => toast.message('Settings (mock)')}
                >
                  <Settings className='h-4 w-4' />
                </Button>

                <div className='ml-1 flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1 dark:border-white/10 dark:bg-white/5'>
                  <Image
                    src={''}
                    alt={"username"}
                    width={64}
                    height={64}
                    className='h-8 w-8 rounded-full object-cover'
                  />
                  <div className='hidden pr-2 md:block'>
                    <div className='text-xs font-semibold leading-4'>
                      User
                    </div>
                    <div className='text-[11px] leading-4 text-slate-500 dark:text-slate-400'>
                      demo@gatekeepr.live
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='grid grid-cols-1 gap-4 md:grid-cols-[280px_1fr]'>
            {/* Sidebar */}
            <aside className='hidden md:block'>
              <SideBar setComposeOpen={setComposeOpen} />
            </aside>

            {/* Page content */}
            <main>{children}</main>
          </div>
        </div>
      </div>
    </>
  )
}
