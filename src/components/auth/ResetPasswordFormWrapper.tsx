'use client'

import { useSearchParams } from 'next/navigation'
import ResetPasswordForm from './ResetPasswordForm'

export default function ResetPasswordFormWrapper() {
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''

  return <ResetPasswordForm token_hash={token_hash} type={type} />
} 