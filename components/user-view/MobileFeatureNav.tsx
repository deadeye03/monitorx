"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'

function MobileFeatureNav ( ) {
    const pathName = usePathname();
    const param=pathName.split('/')[2];
    console.log("ppsdfda",param)
     if (!param) {
        return <div> </div>
     }
    return (<>
        <nav className='bg-slate-100 px-4  md:mt-20 w-full shadow-lg flex md:px-20 md:gap-10 items-center font-semibold text-black'>

            <ul className='flex-col  flex md:flex-row md:gap-10 md:items-center cursor-pointer '>
                <Link href={`/monitorx/${param}`} className={`py-2 box-border border-b-2 ${pathName === `/monitorx/${param}` ? 'border-blue-500' : 'border-transparent'}`}  >
                    <li>Monitor</li>
                </Link>
                <Link href={`/monitorx/${param}/incidents`} className={`py-2 box-border border-b-2 ${pathName === `/monitorx/${param}/incidents` ? 'border-blue-500' : 'border-transparent'}`}>
                    <li>Incident</li>
                </Link>
                <Link href={`/monitorx/${param}/on-call`} className={`py-2 box-border border-b-2 ${pathName === `/monitorx/${param}/on-call` ? 'border-blue-500' : 'border-transparent'}`}>
                    <li>Who is on-call</li>
                </Link>
                <Link href={`/monitorx/${param}/teams`} className={`py-2 box-border border-b-2 ${pathName === `/monitorx/${param}/teams` ? 'border-blue-500' : 'border-transparent'}`}>
                    <li>Teams</li>
                </Link>
                <Link href={`/monitorx/${param}/setting`} className={`py-2 box-border border-b-2 ${pathName === `/monitorx/${param}/setting` ? 'border-blue-500' : 'border-transparent'}`}>
                    <li>Settings</li>
                </Link>
            </ul>

        </nav>
        
    </>
    )
}

export default MobileFeatureNav
