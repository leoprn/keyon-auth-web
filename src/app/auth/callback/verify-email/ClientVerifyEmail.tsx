'use client'

import { useSearchParams } from 'next/navigation'
import VerifyEmailForm from '@/components/auth/VerifyEmailForm'

export default function ClientVerifyEmail() {
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''
  const next = searchParams.get('next') || '/'

  // Pasamos los parámetros como props al formulario
  return <VerifyEmailForm token_hash={token_hash} type={type} next={next} />
} 