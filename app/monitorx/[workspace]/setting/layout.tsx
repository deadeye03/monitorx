import SettingMenubar from '@/components/user-view/setting/SettingMenubar'
import React from 'react'

export default function settingLayout({ children,params }: { children: React.ReactNode,params:{workspace:string} }) {
    return (
        <div className='h-screen w-full flex p-4 flex-col md:p-8 gap-4 md:flex-row' >
            {/* side-menu */}
            <div className='w-full md:w-[20%]' >
            <SettingMenubar param={params.workspace} />
            </div>
            <div className='w-full md:w-[80%]'>
                {children}
            </div>
        </div>
    )
}
