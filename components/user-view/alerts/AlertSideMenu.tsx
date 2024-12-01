"use client"
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation';
function AlertSideMenu() {
  const [status, setStatus] = useState('all');
  const searchParams = useSearchParams();
  const router = useRouter();
  // const newSearchParams = new URLSearchParams(searchParams.toString());
  // newSearchParams.set("status", status);
  // router.push(`/monitorx?${newSearchParams.toString()}`);
  useEffect(()=>{
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("alert", status);
    router.push(`?${newSearchParams.toString()}`);
  },[status])

  return (
    <div className='w-full md:w-[20%] mt-8 cursor-pointer'>
      <div className='flex md:flex-col gap-1'>
        <h2 className='text-gray-500 font-mono text-xl hidden md:block'>PREDEFINED</h2>
        <p className={` hover:bg-slate-300 p-2 rounded-md ${status === 'all' ? 'bg-slate-300 text-blue-500' : ''}`} onClick={() => setStatus('all')}>All</p>
        <p className={` hover:bg-slate-300 p-2 rounded-md ${status === 'acknowledged' ? 'bg-slate-300 text-blue-500' : ''}`} onClick={() => setStatus('acknowledged')}>Acknowledged</p>
        <p className={` hover:bg-slate-300 p-2 rounded-md ${status === 'unAcknowledged' ? 'bg-slate-300 text-blue-500' : ''}`} onClick={() => setStatus('unAcknowledged')}>unAcknowledged</p>
        <p className={` hover:bg-slate-300 p-2 rounded-md ${status === 'assigned' ? 'bg-slate-300 text-blue-500' : ''}`} onClick={() => setStatus('assigned')}>Assigned To Me</p>
      </div>
    </div >
  )
}

export default AlertSideMenu
