import { Resend } from 'resend'
import { EmailTemplate } from '@/components/Features/EmailTemplate'
import { createSupabaseServerClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient()

    // 1️⃣ Authenticate user
    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // 2️⃣ Parse request body
    const body = await request.json()

    const from = body?.from as string | undefined
    const toRaw = body?.email as string | undefined
    const subject = (body?.subject as string | undefined) ?? '(no subject)'
    const message = (body?.message as string | undefined) ?? ''
    const fromName = (body?.fromName as string | undefined) ?? 'Mailico'
    const scheduledAtRaw = body?.scheduledAt as string | undefined

    if (!from || !toRaw || !message) {
      return Response.json(
        { error: 'Missing required fields (from, email, message)' },
        { status: 400 }
      )
    }

    // Process multiple recipients
    const to = toRaw.split(',').map(e => e.trim()).filter(Boolean)

    // Process scheduling
    let scheduledAt: string | undefined
    if (scheduledAtRaw) {
      // Ensure ISO format
      scheduledAt = new Date(scheduledAtRaw).toISOString()
    }

    // 3️⃣ Fetch user’s profile and usage metrics
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('resend_api_key, plan')
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile?.resend_api_key) {
      return Response.json(
        { error: 'Resend API key not configured' },
        { status: 400 }
      )
    }

    const planName = (profile?.plan || 'free').toLowerCase()
    
    // 4️⃣ Check Usage Limits
    const { data: usage, error: usageError } = await supabase
      .from('usage_metrics')
      .select('emails_sent')
      .eq('user_id', user.id)
      .single()

    // If usage metrics don't exist, we'll create them later
    const emailsSent = usage?.emails_sent || 0
    
    const LIMITS: Record<string, number> = {
      free: 3000,
      pro: 50000,
      enterprise: 1000000000 // Effectively unlimited
    }

    const limit = LIMITS[planName] || LIMITS.free

    if (emailsSent >= limit) {
      return Response.json(
        { 
          error: 'Monthly email limit reached', 
          reason: `You have reached the limit for your ${planName} plan (${limit.toLocaleString()} emails).` 
        }, 
        { status: 403 }
      )
    }

    // 5️⃣ Send email
    const resend = new Resend(profile.resend_api_key)

    const fromHeader = `${fromName} <${from}>`

    const { data, error } = await resend.emails.send({
      from: fromHeader,
      to,
      subject,
      react: EmailTemplate({ firstName: message }),
      scheduledAt: scheduledAt
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error }, { status: 500 })
    }

    // 5️⃣ Save sent email (Sender's Copy)
    await supabase.from('emails').insert({
      user_id: user.id,
      direction: scheduledAt ? 'scheduled' : 'sent',
      from_email: from,
      to_email: to.join(', '),
      subject,
      message,
    })

    // 6️⃣ Deliver to Internal Inbox (Recipient's Copy)
    // Only if not scheduled (immediate delivery) to keep logic simple for now
    if (!scheduledAt) {
      try {
        const { createClient } = await import('@supabase/supabase-js')
        const adminAuthClient = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          }
        )

        // Find users who own these email addresses
        // Note: This relies on sender_identities being the source of truth for "receiving" addresses too
        const { data: identities } = await adminAuthClient
          .from('sender_identities')
          .select('user_id, address')
          .in('address', to)

        if (identities && identities.length > 0) {
          const inboxInserts = identities.map(identity => ({
            user_id: identity.user_id,
            direction: 'inbox',
            from_email: from,
            to_email: to.join(', '), // Recipient sees all To addresses
            subject,
            message,
            created_at: new Date().toISOString() // Ensure immediate timestamp
          }))

          await adminAuthClient.from('emails').insert(inboxInserts)
        }
      } catch (err) {
        console.error('Failed to deliver internal inbox message:', err)
        // Don't fail the request if internal delivery fails, just log it
      }
    }

    // 5.5️⃣ Update usage metrics
    try {
      const { data: usageData, error: usageUpdateError } = await supabase
        .from('usage_metrics')
        .update({ emails_sent: emailsSent + 1, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()

      if (!usageData || usageData.length === 0) {
        // Record might not exist, create it
        await supabase.from('usage_metrics').insert({
          user_id: user.id,
          emails_sent: 1,
          updated_at: new Date().toISOString()
        })
      }
    } catch (err) {
      console.error('Failed to update usage metrics:', err)
      // Non-fatal error for the user
    }

    return Response.json({ success: true, data }, { status: 200 })
  } catch (err) {
    console.error('Send API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
