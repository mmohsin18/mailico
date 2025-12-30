'use client'

import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

function getHashParams() {
  if (typeof window === 'undefined') return {}
  return Object.fromEntries(
    new URLSearchParams(window.location.hash.slice(1)).entries()
  )
}

export default function ConfirmClient() {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const run = async () => {
      // token_hash flow
      const token_hash = params.get('token_hash')
      const type = params.get('type')

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as any
        })
        if (!error) {
          router.replace('/sent')
          router.refresh()
          return
        }
      }

      // hash access_token flow
      const hash = getHashParams()
      if (hash.access_token && hash.refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token: hash.access_token,
          refresh_token: hash.refresh_token
        })
        if (!error) {
          router.replace('/sent')
          router.refresh()
          return
        }
      }

      router.replace('/auth?error=confirm_failed')
    }

    run()
  }, [params, router])

  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
      Confirming your email…
    </div>
  )
}
