'use client'

import { useSearchParams } from 'next/navigation'
import ResetPasswordForm from '@/components/auth/ResetPasswordForm'

export default function ClientResetPassword() {
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''

  // Pasamos los parámetros como props al formulario
  return <ResetPasswordForm token_hash={token_hash} type={type} />
} 