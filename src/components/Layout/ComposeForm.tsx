'use client'

import * as React from 'react'
import { supabase } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import RichEditor from '@/components/Elements/RichEditor'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Loader2, Send } from 'lucide-react'
import { fetchRejectionReason } from '@/lib/rejection'

type SenderIdentity = {
  id: number
  name: string
  address: string
  verified: boolean
}

export default function ComposeForm({
  onSent
}: {
  onSent?: () => void
}) {
  const [loading, setLoading] = React.useState(false)
  const [senders, setSenders] = React.useState<SenderIdentity[]>([])

  const [from, setFrom] = React.useState('')
  const [to, setTo] = React.useState('')
  const [subject, setSubject] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [scheduledAt, setScheduledAt] = React.useState('')

  // Load sender identities for logged-in user
  React.useEffect(() => {
    const loadSenders = async () => {
      const { data: auth } = await supabase.auth.getUser()
      if (!auth.user) return

      const { data } = await supabase
        .from('sender_identities')
        .select('id,name,address,verified')
        .eq('user_id', auth.user.id)
        .order('id', { ascending: true })

      setSenders((data ?? []) as SenderIdentity[])
    }

    loadSenders()
  }, [])

  const sendEmail = async () => {
    if (!from || !to || !message) {
      const reason = await fetchRejectionReason()
      toast.error(`${reason} (From, To, and Message are required)`)
      return
    }

    const sender = senders.find(s => s.address === from)

    setLoading(true)
    try {
      const res = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from,
          fromName: sender?.name || 'Mailico',
          email: to,
          subject,
          message,
          scheduledAt: scheduledAt ? new Date(scheduledAt).toISOString() : undefined
        })
      })

      const data = await res.json()

      if (!res.ok) {
        const naasReason = await fetchRejectionReason()
        const apiError = data?.reason || data?.error || 'Failed to send email'
        throw new Error(`${naasReason} (${apiError})`)
      }

      toast.success('Email sent')

      // reset
      setTo('')
      setSubject('')
      setMessage('')
      setScheduledAt('')

      onSent?.()
    } catch (err: any) {
      toast.error(err.message || 'Failed to send email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col w-full gap-3 p-4">
      {/* Header */}
      <div className="text-sm font-semibold text-slate-900 dark:text-white">
        New Message
      </div>

      {/* From */}
      <Select value={from} onValueChange={setFrom}>
        <SelectTrigger className="h-10">
          <SelectValue placeholder="From" />
        </SelectTrigger>
        <SelectContent>
          {senders.map(sender => (
            <SelectItem key={sender.id} value={sender.address}>
              {sender.name} &lt;{sender.address}&gt;
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* To */}
      <Input
        placeholder="To (separate multiple emails with commas)"
        value={to}
        onChange={e => setTo(e.target.value)}
      />

      {/* Subject */}
      <Input
        placeholder="Subject"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />

      {/* Message */}
      <RichEditor
        value={message}
        onChange={setMessage}
      />

      {/* Schedule (Optional) */}
      <div className="grid gap-1">
        <div className="text-xs font-medium text-slate-500">Schedule (optional)</div>
        <Input
          type="datetime-local"
          value={scheduledAt}
          onChange={e => setScheduledAt(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button
          onClick={sendEmail}
          disabled={loading}
          className="rounded-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
