import SideMenuBar from '@/components/user-view/teams/team/SideMenuBar'
import React from 'react'

export default function teamLayout({ children, params }: { children: React.ReactNode, params: { workspace: string,id:string } }) {
    // console.log('teams id params is ',params.id)
    return (
        <div className='h-full w-full flex flex-col  gap-4 md:flex-row' >
            {/* side-menu */}
            <div className='w-full md:w-[20%]' >
            <SideMenuBar param={params.workspace} teamId={params.id} />
            </div>
            <div className='w-full md:w-[80%]  '>
                {children}
            </div>
        </div>
    )
}