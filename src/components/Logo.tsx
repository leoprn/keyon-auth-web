'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <div className="flex justify-center mb-6">
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