'use client'

import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <Image
      src="/images/keyon-logo.png"
      alt="KeyOn Smart Access"
      width={220}
      height={88}
      className={`object-contain ${className || ''}`}
      priority
      {...props}
    />
  )
} 