'use client'

import Image from 'next/image'
import { HTMLAttributes } from 'react'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={`flex justify-center ${className || ''}`} {...props}>
      <div className="relative w-[180px] h-[90px]">
        <Image
          src="/images/keyon-logo.png"
          alt="KeyOn Smart Access"
          width={180}
          height={90}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
} 