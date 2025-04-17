import { Suspense } from 'react'
import VerifyEmailForm from '@/components/auth/VerifyEmailForm'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SearchParams {
  token_hash?: string
  type?: string
  next?: string
}

export default async function VerifyEmail({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const token_hash = searchParams.token_hash || ''
  const type = searchParams.type || ''
  const next = searchParams.next || '/'

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="p-4 max-w-md w-full bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-4">Cargando...</h1>
        </div>
      </div>
    }>
      <VerifyEmailForm token_hash={token_hash} type={type} next={next} />
    </Suspense>
  )
} 