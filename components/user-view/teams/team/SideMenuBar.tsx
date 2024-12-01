"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
function SideMenuBar({ param,teamId }: { param: string,teamId:string }) {
    // console.log('....param', param)
    const path = usePathname().split('/').pop();
    return (
        <nav className='bg-gray-200 p-4 md:p-8 md:h-full'>
            <ul className='flex cursor-pointer whitespace-nowrap flex-row md:flex-col gap-4 overflow-x-auto '>
                <Link href={`/monitorx/${param}/teams`} 
                className={` hover:bg-slate-300 p-2 rounded-md ${path === 'teams' ? 'bg-slate-300 text-blue-500' : ''}`}>All teams</Link>
                <Link href={`/monitorx/${param}/teams/${teamId}/on-call`} 
                className={` hover:bg-slate-300 p-2 rounded-md ${path === 'on-call' ? 'bg-slate-300 text-blue-500' : ''}`}>On-call</Link>
                <Link href={`/monitorx/${param}/teams/integration`} className={` hover:bg-slate-300 p-2 rounded-md ${path === 'integration' ? 'bg-slate-300 text-blue-500' : ''}`}>Integrations</Link>
                <Link href={`/monitorx/${param}/teams/services`} className={` hover:bg-slate-300 p-2 rounded-md ${path === 'services' ? 'bg-slate-300 text-blue-500' : ''}`}>Services</Link>
                <Link href={`/monitorx/${param}/teams/${teamId}/members`} className={` hover:bg-slate-300 p-2 rounded-md ${path === 'members' ? 'bg-slate-300 text-blue-500' : ''}`}>Members</Link>
                <Link href={`/monitorx/${param}/teams/active-stream`} className={` hover:bg-slate-300 p-2 rounded-md ${path === 'active-stream' ? 'bg-slate-300 text-blue-500' : ''}`}>Active stream</Link>
            </ul>
        </nav>
    )
}

export default SideMenuBar
