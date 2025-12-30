import { EmailTemplate } from '@/components/Features/EmailTemplate'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const api = body?.api as string | undefined
    const from = body?.from as string | undefined // expected: sender email
    const to = body?.email as string | undefined
    const subject = (body?.subject as string | undefined) ?? ''
    const message = (body?.message as string | undefined) ?? ''
    const fromName = (body?.fromName as string | undefined) ?? 'Mailico'

    if (!api || !from || !to) {
      return Response.json(
        { error: 'Missing required fields (api, from, or email)' },
        { status: 400 }
      )
    }

    const resend = new Resend(api)

    // Resend expects: "Name <email@domain.com>"
    const fromHeader = `${fromName} <${from}>`

    const { data, error } = await resend.emails.send({
      from: fromHeader,
      to,
      subject: subject || '(no subject)',
      react: EmailTemplate({ firstName: message })
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data, { status: 200 })
  } catch (error) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
