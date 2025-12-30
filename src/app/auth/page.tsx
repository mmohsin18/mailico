import { Suspense } from 'react'
import AuthClient from './auth-client'

export default function AuthPage() {
  return (
    <Suspense fallback={<AuthFallback />}>
      <AuthClient />
    </Suspense>
  )
}

function AuthFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
      Loading…
    </div>
  )
}
