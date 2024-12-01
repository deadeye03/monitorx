import ModernComingSoon from '@/components/ui/coming-soon'
import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className='relative h-[calc(100vh-4rem)] w-full'>
    {/* <Image src='/img/coming.jpg' height={800} width={800} className='h-full w-full object-cover' alt='coming'/> */}
    <ModernComingSoon/>
  </div>
  )
}

export default page
