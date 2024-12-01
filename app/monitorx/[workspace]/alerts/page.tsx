import SkeletonTable from '@/components/ui/skeleton/TableSkelton'
import AlertSearchBar from '@/components/user-view/alerts/AlertSearchBar'
import AlertSideMenu from '@/components/user-view/alerts/AlertSideMenu'
import Allalerts from '@/components/user-view/alerts/Allalerts'
import prisma from '@/lib/prisma'
import React, { Suspense } from 'react'

async function page() {
  
  return (
    <div className=''>
      {/* serach bar */}
      <AlertSearchBar />
      {/* feature menu */}
      <div className='flex gap-8 px-4 flex-col md:px-14 md:flex-row'>
        {/* sidebar menu */}

        <AlertSideMenu />
        {/* content */}
        <div className='w-full md:w-3/4'>         
            <Allalerts />
        </div>
      </div>
    </div>
  )
}

export default page
