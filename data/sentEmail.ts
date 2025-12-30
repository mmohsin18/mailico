// data/sentEmail.ts
export type SentEmail = {
  id: string
  from: string
  to: string
  subject: string
  message: string
  date: string // ISO or readable string
  starred?: boolean
  unread?: boolean
}

export const sentEmails: SentEmail[] = [
  {
    id: '1',
    from: 'hello@mailico.app',
    to: 'someone@gmail.com',
    subject: 'Welcome to Mailico',
    message: 'Hey! This is a test email from Mailico.',
    date: '2025-12-30T08:15:00.000Z',
    starred: false,
    unread: false
  }
]
