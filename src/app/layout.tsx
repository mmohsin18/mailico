import BottomNav from '@/components/Layout/BottomNav'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const APP_NAME = 'Mailico'
const APP_DEFAULT_TITLE = 'Mailico - Your Emailing Buddy'
const APP_TITLE_TEMPLATE = '%s - Mailico'
const APP_DESCRIPTION = 'Your Emailing Buddy'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',

  // 🔥 Light & dark browser UI colors
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F8FAFC' },
    { media: '(prefers-color-scheme: dark)', color: '#05060A' }
  ],

  // 🧊 Light / dark favicons
  icons: {
    icon: [
      { url: '/favicon-light.svg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', media: '(prefers-color-scheme: dark)' }
    ],
    apple: '/favicon/icon-192.png'
  },

  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent'
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
}

export const viewport: Viewport = {
  // fallback; browsers that understand the array above will override
  themeColor: '#F8FAFC'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Viewport + PWA bits */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Let browser know we support both */}
        <meta name="color-scheme" content="light dark" />

        {/* manifest + apple touch icon (also set in metadata.icons) */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/favicon/icon-192.png" />
      </head>
      <body className={inter.className}>
        <div className="mx-auto flex min-h-screen flex-col">
          <main className="flex grow flex-col">{children}</main>
          <BottomNav />
        </div>
      </body>
    </html>
  )
}
