import { Suspense } from 'react'
import ConfirmClient from './auth-confirm'

export default function ConfirmPage() {
  return (
    <Suspense fallback={<ConfirmFallback />}>
      <ConfirmClient />
    </Suspense>
  )
}

function ConfirmFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">
      Confirming…
    </div>
  )
}
