

import React, { Suspense, useState } from 'react'
import All from './All';
import { configData } from '@/types/type';
import allMointor from '@/components/fetch/monitor';
import SkeletonTable from '@/components/ui/skeleton/TableSkelton';

import { getUserId } from '@/action/user';
import SearchBar from './SearchBar';
import SideMenu from './SideMenu';
import { findWorkSpaceId } from '@/action/workSpace';

interface MonitorDashboardProps {
  allMonitorConfig: configData[]
}

const MonitorDashboard = async (param:any) => {

  //gettign mongodb userid 
  console.log('params in dashboard ',param)
  const userId = await getUserId()
  const workSpaceId=await findWorkSpaceId(param.param);
  console.log('id is ', await getUserId());

  //fetch data through api
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getAllMonitor`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userId,workSpaceId }),
    // next: { revalidate: 3600 }
  });
  const response = await res.json()
  const allMonitorConfig = response.data
  // console.log('monitor is ', allMonitorConfig)
  // return allMonitorConfig;
  return (
    <div className=''>
      {/* serach bar */}
      <SearchBar />
      {/* feature menu */}
      <div className='flex gap-8 px-4 flex-col md:px-14 md:flex-row'>
        {/* sidebar menu */}

        <SideMenu />
        {/* content */}
        <div className='w-full md:w-[85%]'>

          <Suspense fallback={<SkeletonTable />}>
            <All allMonitorConfig={allMonitorConfig} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default MonitorDashboard

