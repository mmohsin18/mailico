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
    const to = body?.email as string | undefined
    const subject = (body?.subject as string | undefined) ?? '(no subject)'
    const message = (body?.message as string | undefined) ?? ''
    const fromName = (body?.fromName as string | undefined) ?? 'Mailico'

    if (!from || !to || !message) {
      return Response.json(
        { error: 'Missing required fields (from, email, message)' },
        { status: 400 }
      )
    }

    // 3️⃣ Fetch user’s Resend API key from DB
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('resend_api_key')
      .eq('user_id', user.id)
      .single()

    if (profileError || !profile?.resend_api_key) {
      return Response.json(
        { error: 'Resend API key not configured' },
        { status: 400 }
      )
    }

    // 4️⃣ Send email
    const resend = new Resend(profile.resend_api_key)

    const fromHeader = `${fromName} <${from}>`

    const { data, error } = await resend.emails.send({
      from: fromHeader,
      to,
      subject,
      react: EmailTemplate({ firstName: message })
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json({ error }, { status: 500 })
    }

    // 5️⃣ (Optional but recommended) Save sent email
    await supabase.from('emails').insert({
      user_id: user.id,
      direction: 'sent',
      from_email: from,
      to_email: to,
      subject,
      message
    })

    return Response.json({ success: true, data }, { status: 200 })
  } catch (err) {
    console.error('Send API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
