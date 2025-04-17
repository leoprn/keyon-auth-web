import { Suspense } from 'react'
import ResetPasswordFormWrapper from '@/components/auth/ResetPasswordFormWrapper'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="p-4 max-w-md w-full bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-4">Cargando...</h1>
    </div>
  </div>
)

export default function ResetPassword() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordFormWrapper />
    </Suspense>
  )
} 