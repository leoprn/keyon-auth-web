'use client'

import { useSearchParams } from 'next/navigation'
import VerifyEmailForm from './VerifyEmailForm'

export default function VerifyEmailFormWrapper() {
  const searchParams = useSearchParams()
  const token_hash = searchParams.get('token_hash') || ''
  const type = searchParams.get('type') || ''
  const next = searchParams.get('next') || '/'

  return <VerifyEmailForm token_hash={token_hash} type={type} next={next} />
} 