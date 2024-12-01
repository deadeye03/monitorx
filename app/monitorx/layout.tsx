import FeaturNav from '@/components/user-view/FeaturNav'
import { UserRoleProvider } from '@/context/UserRoleContexts'
import React from 'react'

export default function MonitorLayout({children}:{children:React.ReactNode}) {
  return (
    <div className='bg-white mt-4'>
      <UserRoleProvider>

      {children}
      </UserRoleProvider>

    </div>
  )
}


