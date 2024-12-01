// import SideMenuBar from '@/components/user-view/teams/SideMenuBar'
import TeamSideMenuBar from '@/components/user-view/teams/team-side-menubar'
import React from 'react'

export default function teamLayout({ children, params }: { children: React.ReactNode, params: { workspace: string } }) {
    return (
        <> 
        <div className='min-h-screen w-full flex flex-col  gap-4 md:flex-row'>
            <TeamSideMenuBar param={params.workspace}/>
            <div className='w-full '>
            {children}

            </div>

        </div>
        </>
    )
}


