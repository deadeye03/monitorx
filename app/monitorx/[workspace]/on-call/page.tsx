import Image from 'next/image'
import React from 'react'

function page() {
  return (
    <div className='relative h-[82vh] w-full '>
    <Image src='/img/coming.jpg' height={800} width={800} className='h-full w-full object-containe' alt='coming'/>
  </div>
  )
}

export default page