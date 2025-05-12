'use client'
import React from 'react'
import { LoadingSpinner } from '@/components/global/login/loading'

export default function Page() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <LoadingSpinner fullPage={true} />
    </div>
  )
}
