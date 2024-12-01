"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import MonitorAllTeam from './MonitorTeam'
import { X } from 'lucide-react'
import { deleteMonitor, getMonitor } from '@/action/monitorAction'
import toast from 'react-hot-toast'
import MonitorEditForm from './monitor-edit-form'


function ShowDropdownMenu({ monitorId, setConfigId }: { monitorId: string, setConfigId: React.Dispatch<React.SetStateAction<string | null>> }) {
    const [monitorData, setMonitorData] = useState<any | undefined>()
    useEffect(() => {
        const monitor = async () => {
            const monitorIs = await getMonitor(monitorId);
            if (!monitorIs) {
                return;
            }
            setMonitorData(monitorIs)
        }
        monitor();
    }, [])
    const [showChange, setShowChange] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)
    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this monitor ')) {
            // Save it!
            const monitor = await deleteMonitor(monitorId)
            if (monitor) {
                toast.success("Monitor is Deleted")
            }
            else {
                toast.error("failed to delete monitor please try again")
            }
        } else {
            // Do nothing!
            return
        }
    }
    return (
        <>
            {showEditForm && <MonitorEditForm monitorData={monitorData} setShowEditForm={setShowEditForm} setConfigId={setConfigId} />}
            <div className='absolute flex flex-col -left-24 bottom-0 border bg-white rounded-md z-10'>
                <Button className='bg-transparent text-blue-500 hover:bg-slate-300 min-w-[118px]'
                    onClick={() => setShowChange((prev) => !prev)}>
                    {showChange ? <X className='h-4 w-4' /> : 'Change Team'}
                </Button>
                <Button className='bg-transparent text-green-500 hover:bg-slate-300' onClick={() => setShowEditForm(true)} >Edit</Button>
                <Button className='bg-transparent text-red-500 hover:bg-slate-300' onClick={handleDelete}>Delete</Button>
                {showChange && <div className='absolute top-0 -left-[120px]  border-red-500 rounded-md border-2'>
                    <MonitorAllTeam monitorId={monitorId} setConfigId={setConfigId} />
                </div>}
            </div>
        </>
    )
}

export default ShowDropdownMenu
