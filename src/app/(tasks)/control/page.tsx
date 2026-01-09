// app/(app)/control/page.tsx
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bug,
  Code2,
  CreditCard,
  ExternalLink,
  FileText,
  LifeBuoy,
  LogOut,
  Settings2,
  Shield,
  Sparkles,
  Users,
  Webhook
} from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

// shadcn/ui
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getAllPosts } from '@/lib/blogs'
import { fetchUser } from 'data/fetchUser'

// -----------------------------
// ✅ CONTROL PAGE
// -----------------------------
export default async function ControlPage() {
  const user = await fetchUser()

  const whatsNew = [
    {
      title: 'Premium billing & usage tracking',
      date: 'Jan 9, 2026',
      href: '/changelog'
    },
    {
      title: 'Router & Navigation stability fixes',
      date: 'Jan 9, 2026',
      href: '/changelog'
    },
    {
      title: 'Dashboard V2 & Real-time Analytics',
      date: 'Jan 3, 2026',
      href: '/changelog'
    }
  ]

  const blog = getAllPosts()

  return (
    <main className='mx-auto w-full max-w-6xl px-2 pb-28 pt-6 md:px-8 md:pb-10'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl font-semibold tracking-tight'>Control</h1>
          <p className='mt-1 text-sm text-muted-foreground'>
            Your account, product tools, updates, and support — all in one
            place.
          </p>
        </div>

        <div className='hidden items-center gap-2 md:flex'>
          <Button asChild variant='outline' className='rounded-full'>
            <Link href='/settings'>
              <Settings2 className='mr-2 h-4 w-4' />
              Settings
            </Link>
          </Button>
          <Button asChild className='rounded-full'>
            <Link href='/profile/edit'>
              Edit profile <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>

      {/* Top user bar */}
      <Card className='mt-6 rounded-2xl border bg-background/60 p-4 shadow-sm backdrop-blur'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='flex items-center gap-3'>
            <Avatar className='h-11 w-11'>
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback className='text-xs'>
                {initials(user?.name || 'MG')}
              </AvatarFallback>
            </Avatar>

            <div className='min-w-0'>
              <div className='flex items-center gap-2'>
                <p className='truncate font-medium'>{user?.name}</p>
                <Badge
                  variant='secondary'
                  className={cn(
                    'rounded-full',
                    // a “neon” feeling without hard-coding a theme system
                    'border border-foreground/10'
                  )}
                >
                  {user?.plan_name ? user.plan_name.charAt(0).toUpperCase() + user.plan_name.slice(1) : 'Free'}
                </Badge>
              </div>
              <p className='truncate text-sm text-muted-foreground'>
                {user?.email}
              </p>
            </div>
          </div>

          <div className='flex min-w-0 flex-wrap items-center gap-2 overflow-hidden'>
            <Badge
              variant='outline'
              className='min-w-0 max-w-full rounded-full'
            >
              <span className='shrink-0'>Workspace:</span>
              <span className='ml-1 min-w-0 truncate font-medium'>
                {user?.domain || '—'}
              </span>
            </Badge>

            <div className='flex w-full justify-between gap-2 md:hidden'>
              <Button variant='outline' asChild className='w-1/2 rounded-full'>
                <Link href='/profile/edit'>
                  Edit <ArrowRight className='ml-2 h-4 w-4' />
                </Link>
              </Button>

              <Button className='rounded-full'>
                <LogOut className='mr-2 h-4 w-4' />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Control tiles */}
      <section className='mt-6'>
        <div className='flex items-center justify-between'>
          <h2 className='text-sm font-semibold text-muted-foreground'>
            Core Controls
          </h2>
        </div>

        <div className='mt-3 grid grid-cols-1 gap-3 md:grid-cols-2'>
          <ControlTile
            icon={<Settings2 className='h-5 w-5' />}
            title='Settings'
            desc='Sender identities, tracking, defaults, and preferences.'
            href='/settings'
          />
          <ControlTile
            icon={<CreditCard className='h-5 w-5' />}
            title='Billing & Plan'
            desc='Upgrade, invoices, payment methods, and usage.'
            href='/billing'
          />
          <ControlTile
            icon={<Code2 className='h-5 w-5' />}
            title='Developer'
            desc='API keys, events, and request logs.'
            href='/developers'
          />
          <ControlTile
            icon={<Users className='h-5 w-5' />}
            title='Team'
            desc='Invite members, roles, and workspace access.'
            href='/team'
            badge='Soon'
          />
        </div>
      </section>

      <Separator className='my-8' />

      {/* Resources */}
      <section className='grid grid-cols-1 gap-3 md:grid-cols-3'>
        <ResourceCard
          title='What’s New'
          icon={<Sparkles className='h-4 w-4' />}
          items={whatsNew}
          cta={{ label: 'View changelog', href: '/changelog' }}
        />
        <ResourceCard
          title='Featured'
          icon={<Bell className='h-4 w-4' />}
          items={[
            {
              title: 'Set up sender domain properly',
              date: 'Guide',
              href: '/features/sender-domains'
            },
            {
              title: 'Ship your first onboarding flow',
              date: 'Tutorial',
              href: '/features/onboarding-flow'
            },
            {
              title: 'Debug deliverability with logs',
              date: 'How-to',
              href: '/features/logs'
            }
          ]}
          cta={{ label: 'Explore features', href: '/features' }}
        />
        <ResourceCard
          title='Blog'
          icon={<BookOpen className='h-4 w-4' />}
          items={blog.slice(0, 2).map(post => ({
            title: post.title || 'Latest post',
            date: post.date || 'Date',
            href: `/blog/${post.slug}` || '/blog'
          }))}
          cta={{ label: 'Read all posts', href: '/blog' }}
        />
      </section>

      <Separator className='my-8' />

      {/* Support & Trust */}
      <section className='grid grid-cols-1 gap-3 md:grid-cols-2'>
        <Card className='rounded-2xl p-4'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-sm font-semibold'>Support</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                Get help fast — docs, support, and bug reporting.
              </p>
            </div>
            <LifeBuoy className='h-5 w-5 text-muted-foreground' />
          </div>

          <div className='mt-4 grid gap-2'>
            <RowLink
              href='/support'
              icon={<LifeBuoy className='h-4 w-4' />}
              label='Help Center'
            />
            <RowLink
              href='/support/contact'
              icon={<FileText className='h-4 w-4' />}
              label='Contact Support'
            />
            <RowLink
              href='/support/bug'
              icon={<Bug className='h-4 w-4' />}
              label='Report a Bug'
            />
            <RowLink
              href='/status'
              icon={<ExternalLink className='h-4 w-4' />}
              label='Status Page'
            />
          </div>
        </Card>

        <Card className='rounded-2xl p-4'>
          <div className='flex items-start justify-between gap-4'>
            <div>
              <p className='text-sm font-semibold'>Security & Legal</p>
              <p className='mt-1 text-sm text-muted-foreground'>
                Privacy, terms, and security controls.
              </p>
            </div>
            <Shield className='h-5 w-5 text-muted-foreground' />
          </div>

          <div className='mt-4 grid gap-2'>
            <RowLink
              href='/security'
              icon={<Shield className='h-4 w-4' />}
              label='Security'
            />
            <RowLink
              href='/privacy'
              icon={<FileText className='h-4 w-4' />}
              label='Privacy Policy'
            />
            <RowLink
              href='/terms'
              icon={<FileText className='h-4 w-4' />}
              label='Terms of Service'
            />
            <RowLink
              href='/developers/webhooks'
              icon={<Webhook className='h-4 w-4' />}
              label='Webhooks'
            />
          </div>
        </Card>
      </section>

      {/* Advanced (collapsed) */}
      <section className='mt-6'>
        <Card className='rounded-2xl p-0'>
          <Accordion type='single' collapsible>
            <AccordionItem value='advanced' className='border-none'>
              <AccordionTrigger className='px-4 py-4'>
                <div className='flex items-center gap-2'>
                  <Badge variant='outline' className='rounded-full'>
                    Advanced
                  </Badge>
                  <span className='text-sm text-muted-foreground'>
                    Export, sessions, and workspace danger zone.
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className='px-4 pb-4'>
                <div className='grid gap-2'>
                  <RowLink
                    href='/security/sessions'
                    icon={<Shield className='h-4 w-4' />}
                    label='Active Sessions'
                  />
                  <RowLink
                    href='/export'
                    icon={<FileText className='h-4 w-4' />}
                    label='Export Data'
                  />
                  <RowLink
                    href='/developers/logs'
                    icon={<Code2 className='h-4 w-4' />}
                    label='Request Logs'
                  />
                  <RowLink
                    href='/workspace/danger'
                    icon={<Bug className='h-4 w-4' />}
                    label='Danger Zone'
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </section>
    </main>
  )
}

// -----------------------------
// UI bits
// -----------------------------
function ControlTile(props: {
  icon: React.ReactNode
  title: string
  desc: string
  href: string
  badge?: string
}) {
  return (
    <Link href={props.href} className='group'>
      <Card className='rounded-2xl p-4 transition hover:border-foreground/20 hover:bg-foreground/[0.02]'>
        <div className='flex items-start justify-between gap-3'>
          <div className='flex items-start gap-3'>
            <div className='mt-0.5 rounded-xl border bg-background p-2 text-muted-foreground'>
              {props.icon}
            </div>
            <div>
              <div className='flex items-center gap-2'>
                <p className='font-medium'>{props.title}</p>
                {props.badge ? (
                  <Badge variant='secondary' className='rounded-full'>
                    {props.badge}
                  </Badge>
                ) : null}
              </div>
              <p className='mt-1 text-sm text-muted-foreground'>{props.desc}</p>
            </div>
          </div>

          <ArrowRight className='h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5' />
        </div>
      </Card>
    </Link>
  )
}

function ResourceCard(props: {
  title: string
  icon: React.ReactNode
  items: { title: string; date: string; href: string }[]
  cta: { label: string; href: string }
}) {
  return (
    <Card className='rounded-2xl p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <span className='text-muted-foreground'>{props.icon}</span>
          <p className='text-sm font-semibold'>{props.title}</p>
        </div>
        <Button asChild variant='ghost' size='sm' className='rounded-full'>
          <Link href={props.cta.href}>
            {props.cta.label} <ArrowRight className='ml-1 h-4 w-4' />
          </Link>
        </Button>
      </div>

      <div className='mt-3 grid gap-2'>
        {props.items.map(it => (
          <Link
            key={it.title}
            href={it.href}
            className='group block w-full overflow-hidden rounded-xl border bg-background/40 px-3 py-2 transition hover:border-foreground/20 hover:bg-foreground/[0.02]'
          >
            <div className='flex w-full items-center gap-3'>
              <div className='min-w-0 flex-1 overflow-hidden'>
                <p className='truncate text-sm font-medium'>{it.title}</p>
                <p className='truncate text-xs text-muted-foreground'>
                  {it.date}
                </p>
              </div>

              <ArrowRight className='h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5' />
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}

function RowLink(props: {
  href: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={props.href}
      className='group flex items-center justify-between rounded-xl border bg-background/40 px-3 py-2 transition hover:border-foreground/20 hover:bg-foreground/[0.02]'
    >
      <div className='flex min-w-0 items-center gap-2'>
        <span className='shrink-0 text-muted-foreground'>{props.icon}</span>
        <span className='min-w-0 truncate text-sm'>{props.label}</span>
      </div>

      <ArrowRight className='h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5' />
    </Link>
  )
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map(p => p[0]?.toUpperCase()).join('')
}
