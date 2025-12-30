'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { sentEmails } from 'data/sentEmail'
import { userData } from 'data/userData'
import Image from 'next/image'
import * as React from 'react'
import { toast } from 'sonner'

import SideBar from '@/components/Layout/SideBar'
import {
  Mail,
  RefreshCcw,
  Search,
  Send,
  Settings,
  Star,
  StarOff,
  Trash2
} from 'lucide-react'

type MailItem = (typeof sentEmails)[number]

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleString(undefined, {
    month: 'short',
    day: '2-digit'
  })
}

export default function SentPage() {
  const user = userData[0]

  const [query, setQuery] = React.useState('')
  const [selectedId, setSelectedId] = React.useState<string | null>(
    sentEmails?.[0]?.id ?? null
  )

  const [composeOpen, setComposeOpen] = React.useState(false)
  const [sending, setSending] = React.useState(false)

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sentEmails
    return sentEmails.filter(m => {
      return (
        m.to.toLowerCase().includes(q) ||
        m.from.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      )
    })
  }, [query])

  const selected = React.useMemo(() => {
    return sentEmails.find(m => m.id === selectedId) ?? null
  }, [selectedId])

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const data = {
      from: formData.get('from'),
      fromName: user.default_email.find(
        email => (email as any)?.address === formData.get('from')
      )
        ? (
            user.default_email.find(
              email => (email as any)?.address === formData.get('from')
            ) as any
          )?.name
        : '',
      email: formData.get('email'),
      api: user.api,
      subject: formData.get('subject'),
      message: formData.get('message')
    }

    if (!data.from || !data.email || !data.subject || !data.message) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      setSending(true)
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success('Email sent successfully!')
        form.reset()
        setComposeOpen(false)
      } else {
        const error = await response.json().catch(() => ({}))
        toast.error(
          `Failed to send: ${error?.error?.message || JSON.stringify(error)}`
        )
      }
    } catch (err) {
      toast.error('Error sending email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#f6f8fc] text-slate-900 dark:bg-black dark:text-white'>
      {/* Top bar */}
      <div className='sticky top-0 z-30 border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/60'>
        <div className='mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-3 md:px-5'>
          <div className='flex items-center gap-2'>
            <div className='grid h-9 w-9 place-items-center rounded-full bg-[#e9eef6] dark:bg-white/10'>
              <Mail className='h-5 w-5' />
            </div>
            <div className='hidden text-sm font-semibold md:block'>Mailico</div>
          </div>

          <div className='flex flex-1 items-center'>
            <div className='relative w-full max-w-[720px]'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500' />
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder='Search mail'
                className='h-10 rounded-full border-slate-200 bg-[#eef3fb] pl-9 shadow-none focus-visible:ring-0 dark:border-white/10 dark:bg-white/5'
              />
            </div>
          </div>

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
                src={user.avatar}
                alt={user.name}
                width={64}
                height={64}
                className='h-8 w-8 rounded-full object-cover'
              />
              <div className='hidden pr-2 md:block'>
                <div className='text-xs font-semibold leading-4'>
                  {user.name}
                </div>
                <div className='text-[11px] leading-4 text-slate-500 dark:text-slate-400'>
                  {user.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div className='mx-auto grid max-w-[1400px] grid-cols-1 gap-4 px-3 py-4 md:grid-cols-[280px_1fr] md:px-5'>
        <SideBar setComposeOpen={setComposeOpen} />

        {/* Content */}
        <main className='grid grid-cols-1 gap-4 lg:grid-cols-[minmax(420px,1fr)_minmax(420px,1fr)]'>
          {/* List */}
          <section className='rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5'>
            <div className='flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10'>
              <div>
                <h1 className='text-base font-semibold'>Sent</h1>
                <p className='text-xs text-slate-500 dark:text-slate-400'>
                  {filtered.length} messages
                </p>
              </div>
              <div className='text-xs text-slate-500 dark:text-slate-400'>
                Sorted by date
              </div>
            </div>

            <div className='max-h-[calc(100vh-12rem)] overflow-auto'>
              {/* Header row (gmail-ish) */}
              <div className='grid grid-cols-[24px_1fr_90px] items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400'>
                <div />
                <div>Recipient • Subject</div>
                <div className='text-right'>Date</div>
              </div>

              <div className='divide-y divide-slate-200 dark:divide-white/10'>
                {filtered.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={cn(
                      'grid w-full grid-cols-[24px_1fr_90px] items-center gap-2 px-4 py-3 text-left transition',
                      'hover:bg-[#f2f6ff] dark:hover:bg-white/5',
                      selectedId === m.id && 'bg-[#e8f0fe] dark:bg-white/10'
                    )}
                  >
                    <div className='flex items-center justify-center'>
                      {m.starred ? (
                        <Star className='h-4 w-4' />
                      ) : (
                        <StarOff className='h-4 w-4 text-slate-400' />
                      )}
                    </div>

                    <div className='min-w-0'>
                      <div className='truncate text-sm font-semibold'>
                        To: <span className='font-semibold'>{m.to}</span>
                      </div>
                      <div className='truncate text-xs text-slate-600 dark:text-slate-300'>
                        <span className='font-medium text-slate-800 dark:text-white'>
                          {m.subject}
                        </span>
                        <span className='mx-2 text-slate-400'>—</span>
                        {m.message}
                      </div>
                    </div>

                    <div className='text-right text-xs text-slate-500 dark:text-slate-400'>
                      {formatDate(m.date)}
                    </div>
                  </button>
                ))}

                {filtered.length === 0 && (
                  <div className='px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400'>
                    No sent emails found.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Reading pane */}
          <section className='rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5'>
            <div className='border-b border-slate-200 px-4 py-3 dark:border-white/10'>
              <h2 className='truncate text-base font-semibold'>
                {selected?.subject || 'Select an email'}
              </h2>
              {selected && (
                <div className='mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400'>
                  <span>
                    <span className='font-medium text-slate-700 dark:text-slate-200'>
                      From:
                    </span>{' '}
                    {selected.from}
                  </span>
                  <span>
                    <span className='font-medium text-slate-700 dark:text-slate-200'>
                      To:
                    </span>{' '}
                    {selected.to}
                  </span>
                  <span>
                    <span className='font-medium text-slate-700 dark:text-slate-200'>
                      Date:
                    </span>{' '}
                    {new Date(selected.date).toLocaleString()}
                  </span>
                </div>
              )}
            </div>

            <div className='p-4'>
              {!selected ? (
                <div className='grid place-items-center py-20 text-sm text-slate-500 dark:text-slate-400'>
                  Choose a sent email to preview it here.
                </div>
              ) : (
                <div className='space-y-4'>
                  <div className='rounded-xl border border-slate-200 bg-white p-4 text-sm leading-6 dark:border-white/10 dark:bg-white/5'>
                    {selected.message}
                  </div>

                  <div className='flex items-center gap-2'>
                    <Button
                      variant='outline'
                      className='rounded-full'
                      onClick={() => toast.message('Resend (mock)')}
                    >
                      <Send className='mr-2 h-4 w-4' />
                      Resend
                    </Button>
                    <Button
                      variant='outline'
                      className='rounded-full'
                      onClick={() => toast.message('Delete (mock)')}
                    >
                      <Trash2 className='mr-2 h-4 w-4' />
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Compose modal (simple, gmail-ish) */}
      {composeOpen && (
        <div className='fixed inset-0 z-50 grid place-items-end bg-black/30 p-3 md:p-6'>
          <div className='w-full max-w-[520px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0b0b0c]'>
            <div className='flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-white/10'>
              <div className='text-sm font-semibold'>New Message</div>
              <Button
                variant='ghost'
                className='h-9 rounded-full'
                onClick={() => setComposeOpen(false)}
              >
                Close
              </Button>
            </div>

            <form className='p-4' onSubmit={sendEmail}>
              <div className='grid gap-3'>
                <div className='grid gap-2'>
                  <Label>From</Label>
                  <Select name='from'>
                    <SelectTrigger className='w-full rounded-xl'>
                      <SelectValue placeholder='Select Sender Email' />
                    </SelectTrigger>
                    <SelectContent>
                      {user.default_email.map((email, index) => (
                        <SelectItem
                          key={index}
                          value={(email as any)?.address || email}
                        >
                          {(email as any)?.name || email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='email'>To</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='recipient@example.com'
                    required
                    className='rounded-xl'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='subject'>Subject</Label>
                  <Input
                    id='subject'
                    name='subject'
                    placeholder='Subject'
                    required
                    className='rounded-xl'
                  />
                </div>

                <div className='grid gap-2'>
                  <Label htmlFor='message'>Message</Label>
                  <Textarea
                    id='message'
                    name='message'
                    placeholder='Write your message…'
                    required
                    className='min-h-[140px] rounded-xl'
                  />
                </div>

                <div className='flex items-center justify-between pt-1'>
                  <Button
                    type='submit'
                    className='rounded-full'
                    disabled={sending}
                  >
                    <Send className='mr-2 h-4 w-4' />
                    {sending ? 'Sending…' : 'Send'}
                  </Button>

                  <Button
                    type='button'
                    variant='ghost'
                    className='rounded-full'
                    onClick={() => setComposeOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
