"use client"
import { createTeam } from '@/action/team'
import { SubmitButton } from '@/components/submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AlertCircle, X } from 'lucide-react'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { createSchedule } from '@/action/schedule'

function AddSchedule({ setIsForm,teamId }: { setIsForm: React.Dispatch<React.SetStateAction<boolean>>,teamId:string }) {
    const pathName=usePathname()
    const workSpaceName=pathName.split('/')[2]
    console.log('workspace name',workSpaceName)
    const [scheduleName,setScheduleName]=useState('')
    const [description,setDescription]=useState('')
    const [timeZone,setTimeZone]=useState("(+05:30) IST Kolkata")
    const [isLoading,setIsLoading]=useState(false)
    const addSchedule=async()=>{
        setIsLoading(true)
        if (!scheduleName) {
            toast.error('Please enter Schedule Name')
            setIsLoading(false)
            return;
        }
        const schedule=await createSchedule(scheduleName,teamId)
        if (schedule.success) {
            toast.success(schedule.message)
            setIsLoading(false)
        }
        else{
            // console.log('team is ',team)
            toast.error(schedule.message)
            setIsLoading(false)
        }
        setIsLoading(false)
        setIsForm(false)
    }
    return (
        <div className='h-screen w-full fixed top-0 left-0 z-10 bg-black bg-opacity-50 px-12 py-3 flex justify-center'>
            {isLoading && <LoadingScreen/>}
            
            <div className='flex flex-col max-h-96  px-6 min-w-[500px] bg-white rounded-md'>
                <h1 className='py-3 font-bold'>Add Schedule</h1>
                
                <label htmlFor="scheduleName">Name <span className='text-red-500'>*</span></label>
                <Input
                    className='border-2 focus-visible:ring-0 focus-visible:ring-offset-0'
                    id='scheduleName'
                    value={scheduleName}
                    required
                    onChange={(e)=>setScheduleName(e.target.value)}
                />
                <span className='text-red-400'>you should provide unique team name</span>
                <label htmlFor="description" className='mt-6'>Description</label>
                <Textarea
                    className=''
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <label htmlFor="timeZone" className='mt-6'>Name <span className='text-red-500'>*</span></label>
                <Input
                    className='border-2 focus-visible:ring-0 focus-visible:ring-offset-0'
                    id='timeZone'
                    value={timeZone}
                    required
                    disabled
                />
                <div className='mt-3 flex justify-end gap-4'>
                    <Button onClick={() => setIsForm(false)} >Cancel</Button>
                    <Button className='w-max bg-blue-700' onClick={()=>addSchedule()} >
                        Add 
                    </Button>

                </div>
            </div>
            <Button onClick={()=>setIsForm(false)} className='hover:bg-white hover:text-black' ><X className='h-6 w-6' /> </Button>
        </div>
    )
}

export default AddSchedule
