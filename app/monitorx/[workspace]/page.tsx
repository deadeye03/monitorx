import MonitorDashboard from '@/components/user-view/monitor/MonitorDashboard'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React from 'react'

function page({params}:{params:{workspace:string}}) {
    const param=params.workspace
    
  return (
    <> 
     
      <MonitorDashboard param={param}/>

     
    </>
  )
}

export default page
