"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { BellDotIcon, IndianRupee, Puzzle, Users } from 'lucide-react'
import Image from 'next/image'

function Functionality() {
  const features = [
    {
      name: 'HealthCheck Configuration',
      description:
        'Configue databases and queues from your architecture and get their health report.',
      icon: <BellDotIcon className='h-5 w-5 text-yellow-400' />,
      link: "/alert-list",
      img: '/img/alert.png'
    },
    {
      name: 'Manage OnCall Shifts',
      description:
        'Manage and Assign your team members in a flexible on call schedule based on their expertise and service needs.',
      icon: <Users className='h-5 w-5 text-blue-400' />,
      link: "/shift-list",
      img: '/img/manage.png'
    },
    {
      name: 'Alert Throttling',
      description:
        'Manage your costs by applying throttling at different levels of escalation matrix.',
      icon: <IndianRupee className='h-5 w-5 text-green-600' />,
      link: "/throttle-list",
      img: '/img/dynamic.png'
    },
    {
      name: 'Flexible Integration',
      description:
        'Integrate with available emailing and alerting services in click of a button',
      icon: <Puzzle className='h-5 w-5 text-red-500' />,
      link: "/integrate-list",
      img: '/img/incident.png'
    },

  ]
  const [img, setImg] = useState('/img/alert.png')
  const [cardIndex, setCardIndex] = useState(0)
  const handleChangle = (index: number, image: string) => {
    setImg(image);
    setCardIndex(index)
  }
  return (
    <div className='flex w-full  gap-5 px-4 py-3 md:py-8 flex-col-reverse md:flex-row'>
      {/* sidebar */}
      <div className='w-full  grid grid-cols-1 gap-4 md:px-40  md:grid-cols-2 md:gap-6  '>
        {features.map((feature, i) =>
          <Card className='w-full rounded-none p-0 shadow-md hover:shadow-2xl flex gap-4 cursor-pointer ' key={feature.name} onMouseOver={() => handleChangle(i, feature.img)} >
            <div className={`min-w-4  h-full ${cardIndex === i ? 'bg-blue-600' : 'bg-blue-300'}`}> </div>
            <div className='p-4'>
              <CardTitle className='flex gap-1 text-black font-bold items-center'>
                {feature.icon} {feature.name}
              </CardTitle>
              <CardContent className='text-black mt-1 p-1 leading-tight font-serif'>
                {feature.description}
              </CardContent>
            </div>
          </Card>
        )}
      </div>
      {/* featrue image */}
      {/* <div className='w-full md:w-3/4 shadow-2xl rounded-md'>
        <div className='relative h-full w-full rounded-md md:flex justify-center items-center'>
        <Image src={img} height={800} width={800} alt={`images`} className='h-full w-full' />
        </div>
       </div> */}
    </div>
  )
}

export default Functionality
