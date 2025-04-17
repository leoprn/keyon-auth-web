import { Suspense } from 'react'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SearchParams {
  token_hash?: string
  type?: string
}

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const token_hash = searchParams.token_hash || ''
  const type = searchParams.type || ''

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 max-w-md w-full bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-4">Cargando...</h1>
        </div>
      </div>
    }>
      <ResetPasswordForm token_hash={token_hash} type={type} />
    </Suspense>
  )
} 