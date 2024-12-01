"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import TeamForm from './TeamForm'
import Link from 'next/link'
import { useUserRole } from '@/context/UserRoleContexts'

function TeamDashboard({param}:{param:string}) {
    console.log('param in teamDashboard',param)
    const [isForm,setIsForm]=useState(false)
    const { userRole } = useUserRole()
    const [open, setOpen] = useState(userRole === 'user' ? false : userRole === 'stackholder' ? false : true)
    return (
        <>
         {isForm && <TeamForm setIsForm={setIsForm}/>}
        <div className='p-8'>
            <h1 className='text-3xl font-bold text-start'>Teams</h1>
            <div className='relative  w-full flex justify-center items-center p-8'>
                <Image src='/img/teams.svg' height={300} width={300} alt='teams' className='h-[250px] w-full object-contain' />
            </div>
            <div className=' flex   justify-center items-center'>
                <div className='w-[480px] flex flex-col justify-center items-center gap-4'>
                    <h1 className='text-3xl font-bold font-serif'>Start building your teams</h1>
                    <p className='text-center'>
                        Add a team to create on-call schedules, assign services and integrations. Once your team is ready, you can add users as team members. <span className='text-blue-500'>Learn more</span>
                    </p>
                  <div className='flex gap-4'>
                    <Button className='bg-blue-500 rounded-md' onClick={()=>setIsForm(true)} > Add Teams </Button>
                    <Link href={`/monitorx/${param}/setting/users`} className='bg-slate-300 rounded-md text-gray-500 flex justify-center items-center px-4 hover:bg-black hover:text-white'> {(userRole === 'user' || userRole === 'stackholder') ? 'See Users' : 'Invite User'} </Link>
                  </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default TeamDashboard
