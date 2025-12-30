'use client'

import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SplashPage() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)

    const timer = setTimeout(() => {
      router.replace('/sent')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='flex min-h-screen items-center justify-center bg-white dark:bg-black'>
      <div
        className={`flex flex-col items-center gap-4 transition-all duration-700 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className='grid h-16 w-16 place-items-center rounded-2xl bg-[#e8f0fe] shadow-sm dark:bg-white/10'>
          <span className='text-xl font-bold'>M</span>
        </div>

        <h1 className='text-xl font-semibold tracking-tight'>Mailico</h1>

        <Loader2 className='h-5 w-5 animate-spin text-slate-500' />

        <p className='text-xs text-slate-500'>Loading emails…</p>
      </div>
    </div>
  )
}
