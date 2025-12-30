'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase/client'
import {
  CheckCircle2,
  Loader2,
  LogOut,
  Plus,
  Trash2,
  XCircle
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
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
  resend_api_key: string | null
}

type SenderIdentity = {
  id: number
  user_id: string
  name: string
  address: string
  verified: boolean
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export default function ProfileEditClient() {
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  const [profile, setProfile] = React.useState<ProfileRow | null>(null)
  const [senders, setSenders] = React.useState<SenderIdentity[]>([])

  // form state
  const [name, setName] = React.useState('')
  const [domain, setDomain] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [country, setCountry] = React.useState('')
  const [avatar, setAvatar] = React.useState('')
  const [resendKey, setResendKey] = React.useState('')

  // new sender form
  const [newSenderName, setNewSenderName] = React.useState('')
  const [newSenderAddress, setNewSenderAddress] = React.useState('')
  const [addingSender, setAddingSender] = React.useState(false)

  const router = useRouter()

  const load = React.useCallback(async () => {
    setLoading(true)
    try {
      const { data: auth } = await supabase.auth.getUser()
      const user = auth.user
      if (!user) {
        window.location.href = '/auth?next=/profile'
        return
      }

      const { data: p, error: pErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (pErr) throw pErr

      const { data: s, error: sErr } = await supabase
        .from('sender_identities')
        .select('*')
        .eq('user_id', user.id)
        .order('id', { ascending: true })

      if (sErr) throw sErr

      setProfile(p as ProfileRow)
      setSenders((s ?? []) as SenderIdentity[])

      setName(p?.name ?? '')
      setDomain(p?.domain ?? '')
      setPhone(p?.phone ?? '')
      setCountry(p?.country ?? '')
      setAvatar(p?.avatar ?? '')
      setResendKey(p?.resend_api_key ?? '')
    } catch (e: any) {
      toast.error(e?.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    load()
  }, [load])

  const saveProfile = async () => {
    if (!profile?.user_id) return
    setSaving(true)
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: name.trim(),
          domain: domain.trim(),
          phone: phone.trim(),
          country: country.trim(),
          avatar: avatar.trim(),
          resend_api_key: resendKey.trim() || null // MVP only (encrypt later)
        })
        .eq('user_id', profile.user_id)

      if (error) throw error
      toast.success('Profile updated')
      router.push('/profile')
      await load()
    } catch (e: any) {
      toast.error(e?.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const addSender = async () => {
    if (!profile?.user_id) return
    if (!newSenderName.trim() || !newSenderAddress.trim()) {
      toast.error('Sender name and address are required')
      return
    }

    setAddingSender(true)
    try {
      const { error } = await supabase.from('sender_identities').insert({
        user_id: profile.user_id,
        name: newSenderName.trim(),
        address: newSenderAddress.trim(),
        verified: true
      })

      if (error) throw error
      toast.success('Sender added')
      setNewSenderName('')
      setNewSenderAddress('')
      await load()
    } catch (e: any) {
      toast.error(e?.message || 'Failed to add sender')
    } finally {
      setAddingSender(false)
    }
  }

  const deleteSender = async (id: number) => {
    try {
      const { error } = await supabase
        .from('sender_identities')
        .delete()
        .eq('id', id)
      if (error) throw error
      toast.success('Sender removed')
      await load()
    } catch (e: any) {
      toast.error(e?.message || 'Failed to delete sender')
    }
  }

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
          {/* Title */}
          <div className='min-w-0'>
            <h1 className='truncate text-xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-2xl'>
              Profile
            </h1>
            <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
              Manage your account details and sender identities.
            </p>
          </div>

          {/* Actions */}
          <div className='flex w-full gap-2 sm:w-auto sm:justify-end'>
            <Button
              variant='outline'
              className='h-10 flex-1 rounded-full sm:flex-none'
              onClick={signOut}
            >
              <LogOut className='mr-2 h-4 w-4' />
              Sign out
            </Button>

            <Button
              className='h-10 flex-1 rounded-full sm:flex-none'
              onClick={saveProfile}
              disabled={saving}
            >
              {saving ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Saving…
                </>
              ) : (
                'Save changes'
              )}
            </Button>
          </div>
        </div>

        {/* Content grid */}
        <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_420px]'>
          {/* Left: Profile info */}
          <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5'>
            <div className='flex items-center gap-3'>
              <div className='h-14 w-14 overflow-hidden rounded-2xl bg-slate-100 dark:bg-white/10'>
                <Image
                  src={avatar || 'https://i.pravatar.cc/150?img=12'}
                  alt='Avatar'
                  width={96}
                  height={96}
                  className='h-full w-full object-cover'
                />
              </div>
              <div>
                <div className='text-sm font-semibold text-slate-900 dark:text-white'>
                  {profile?.email}
                </div>
                <div className='text-xs text-slate-500 dark:text-slate-400'>
                  User ID: {profile?.user_id?.slice(0, 8)}…
                </div>
              </div>
            </div>

            <div className='mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <Field label='Name'>
                <Input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className='h-11 rounded-xl'
                />
              </Field>

              <Field label='Domain'>
                <Input
                  value={domain}
                  onChange={e => setDomain(e.target.value)}
                  placeholder='gatekeepr.live'
                  className='h-11 rounded-xl'
                />
              </Field>

              <Field label='Phone'>
                <Input
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder='+880...'
                  className='h-11 rounded-xl'
                />
              </Field>

              <Field label='Country'>
                <Input
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  placeholder='Bangladesh'
                  className='h-11 rounded-xl'
                />
              </Field>

              <div className='sm:col-span-2'>
                <Field label='Avatar URL'>
                  <Input
                    value={avatar}
                    onChange={e => setAvatar(e.target.value)}
                    placeholder='https://...'
                    className='h-11 rounded-xl'
                  />
                </Field>
              </div>

              <div className='sm:col-span-2'>
                <Field label='Resend API Key (MVP)'>
                  <Input
                    value={resendKey}
                    onChange={e => setResendKey(e.target.value)}
                    placeholder='re_...'
                    className='h-11 rounded-xl'
                  />
                  <p className='mt-2 text-xs text-slate-500 dark:text-slate-400'>
                    For production, store this encrypted server-side (we’ll do
                    that next).
                  </p>
                </Field>
              </div>
            </div>
          </section>

          {/* Right: Sender identities */}
          <section className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5'>
            <h2 className='text-base font-semibold text-slate-900 dark:text-white'>
              Sender identities
            </h2>
            <p className='mt-1 text-sm text-slate-600 dark:text-slate-300'>
              These are the “From” options in your composer.
            </p>

            {/* Add sender */}
            <div className='mt-4 grid gap-3'>
              <div className='grid gap-2'>
                <Label className='text-xs'>Sender name</Label>
                <Input
                  value={newSenderName}
                  onChange={e => setNewSenderName(e.target.value)}
                  placeholder='Mohsin from Gatekeepr'
                  className='h-11 rounded-xl'
                />
              </div>
              <div className='grid gap-2'>
                <Label className='text-xs'>Sender address</Label>
                <Input
                  value={newSenderAddress}
                  onChange={e => setNewSenderAddress(e.target.value)}
                  placeholder='onboarding@gatekeepr.live'
                  className='h-11 rounded-xl'
                />
              </div>
              <Button
                className='rounded-full'
                onClick={addSender}
                disabled={addingSender}
              >
                {addingSender ? (
                  <>
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                    Adding…
                  </>
                ) : (
                  <>
                    <Plus className='mr-2 h-4 w-4' />
                    Add sender
                  </>
                )}
              </Button>
            </div>

            {/* Sender list */}
            <div className='mt-5 space-y-2'>
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

                    <Button
                      variant='outline'
                      className='rounded-full'
                      onClick={() => deleteSender(s.id)}
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
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

function Field({
  label,
  children
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className='grid gap-2'>
      <Label className='text-sm'>{label}</Label>
      {children}
    </div>
  )
}
