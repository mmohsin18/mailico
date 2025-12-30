import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Create a response that we can attach cookies to
  const response = NextResponse.next({
    request: {
      headers: request.headers
    }
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            // Update request cookies so getUser() sees the latest
            request.cookies.set(name, value)
            // Attach cookies to the outgoing response
            response.cookies.set(name, value, options)
          })
        }
      }
    }
  )

  // Refresh session (important)
  const {
    data: { user }
  } = await supabase.auth.getUser()

  // Protect routes
  const pathname = request.nextUrl.pathname
  const isProtected =
    pathname.startsWith('/sent') ||
    pathname.startsWith('/inbox') ||
    pathname.startsWith('/drafts') ||
    pathname.startsWith('/trash') ||
    pathname.startsWith('/profile')

  if (isProtected && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    url.searchParams.set('next', pathname)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    '/sent/:path*',
    '/inbox/:path*',
    '/drafts/:path*',
    '/trash/:path*',
    '/profile/:path*'
  ]
}
