'use client'

import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase/client'
import { CheckCircle2, Loader2, LogOut, Pencil, XCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'
import { toast } from 'sonner'

type ProfileRow = {
  user_id: string
  name: string | null
  email: string | null
  domain: string | null
  phone: string | null
  country: string | null
  avatar: string | null
}

type SenderIdentity = {
  id: number
  name: string
  address: string
  verified: boolean
}

export default function ProfileViewClient() {
  const [loading, setLoading] = React.useState(true)
  const [profile, setProfile] = React.useState<ProfileRow | null>(null)
  const [senders, setSenders] = React.useState<SenderIdentity[]>([])

  const load = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) {
        window.location.href = '/auth?next=/profile'
        return
      }

      const { data: p, error: pErr } = await supabase
        .from('profiles')
        .select('user_id,name,email,domain,phone,country,avatar')
        .eq('user_id', auth.user.id)
        .single()
      if (pErr) throw pErr

      const { data: s, error: sErr } = await supabase
        .from('sender_identities')
        .select('id,name,address,verified')
        .eq('user_id', auth.user.id)
        .order('id', { ascending: true })
      if (sErr) throw sErr

      setProfile(p as any)
      setSenders((s ?? []) as any)
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  const signOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/auth'
  }

  if (loading) {
    return (
      <div className='flex min-h-[70vh] items-center justify-center'>
        <div className='flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300'>
          <Loader2 className='h-4 w-4 animate-spin' />
          Loading profile…
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#f6f8fc] p-4 dark:bg-black'>
      <div className='mx-auto max-w-[1100px]'>
        {/* Header */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='min-w-0'>
            <h1 className='truncate text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl'>
              Profile
            </h1>
            <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
              View your account info and sender identities.
            </p>
          </div>

          <div className='flex w-full gap-2 sm:w-auto sm:justify-end'>
            <Button
              variant='outline'
              className='h-10 flex-1 rounded-full sm:flex-none'
              onClick={signOut}
            >
              <LogOut className='mr-2 h-4 w-4' />
              Sign out
            </Button>
            <Link href='/profile/edit' className='flex-1 sm:flex-none'>
              <Button className='h-10 w-full rounded-full'>
                <Pencil className='mr-2 h-4 w-4' />
                Edit profile
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]'>
          {/* Profile card */}
          <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5'>
            <div className='flex items-center gap-3'>
              <div className='h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/10'>
                <Image
                  src={profile?.avatar || 'https://i.pravatar.cc/150?img=12'}
                  alt='Avatar'
                  width={96}
                  height={96}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='min-w-0'>
                <div className='truncate text-sm font-semibold text-slate-900 dark:text-white'>
                  {profile?.name || '—'}
                </div>
                <div className='truncate text-xs text-slate-500 dark:text-slate-400'>
                  {profile?.email || '—'}
                </div>
              </div>
            </div>

            <div className='mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2'>
              <Info label='Domain' value={profile?.domain} />
              <Info label='Phone' value={profile?.phone} />
              <Info label='Country' value={profile?.country} />
              <Info label='User ID' value={profile?.user_id} mono />
            </div>
          </section>

          {/* Senders list */}
          <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5'>
            <h2 className='text-base font-semibold text-slate-900 dark:text-white'>
              Sender identities
            </h2>
            <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
              These appear as “From” options.
            </p>

            <div className='mt-4 space-y-2'>
              {senders.length === 0 ? (
                <div className='rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300'>
                  No sender identities yet.
                </div>
              ) : (
                senders.map(s => (
                  <div
                    key={s.id}
                    className='flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5'
                  >
                    <div className='min-w-0'>
                      <div className='flex items-center gap-2'>
                        <div className='truncate text-sm font-semibold text-slate-900 dark:text-white'>
                          {s.name}
                        </div>
                        {s.verified ? (
                          <span className='inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] text-emerald-700 dark:text-emerald-300'>
                            <CheckCircle2 className='h-3.5 w-3.5' />
                            Verified
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1 rounded-full bg-slate-500/10 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300'>
                            <XCircle className='h-3.5 w-3.5' />
                            Unverified
                          </span>
                        )}
                      </div>
                      <div className='truncate text-xs text-slate-600 dark:text-slate-300'>
                        {s.address}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
          <div className='h-14' />
        </div>
      </div>
    </div>
  )
}

function Info({
  label,
  value,
  mono
}: {
  label: string
  value?: string | null
  mono?: boolean
}) {
  return (
    <div className='rounded-xl border border-slate-200 bg-white p-3 dark:border-white/10 dark:bg-white/5'>
      <div className='text-xs text-slate-500 dark:text-slate-400'>{label}</div>
      <div
        className={`mt-1 text-sm font-semibold text-slate-900 dark:text-white ${mono ? 'font-mono text-xs' : ''}`}
      >
        {value || '—'}
      </div>
    </div>
  )
}
