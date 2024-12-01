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

function TeamForm({ setIsForm }: { setIsForm: any }) {
    const pathName=usePathname()
    const workSpaceName=pathName.split('/')[2]
    console.log('workspace name',workSpaceName)
    const [teamName,setTeamName]=useState('')
    const [description,setDescription]=useState('')
    const [isLoading,setIsLoading]=useState(false)
    const addTeam=async()=>{
        setIsLoading(true)
        const team=await createTeam(teamName,description,workSpaceName)
        if (team===true) {
            toast.success('Team is created successfully')
            setIsLoading(false)
        }
        else{
            console.log('team is ',team)
            toast.error(team)
            setIsLoading(false)
        }
        setIsLoading(false)
        setIsForm(false)
    }
    return (
        <div className='h-screen w-full fixed top-0 left-0 z-10 bg-black bg-opacity-50 p-12 flex justify-center'>
            {isLoading && <LoadingScreen/>}
            
            <div className='flex flex-col  p-6 max-w-[500px] bg-white rounded-md'>
                <h1>Add team</h1>
                <p className='p-3 flex bg-[#deebff] text-black gap-1 my-6'>
                    <AlertCircle className='h-5 w-5 text-blue-500' /> Do you want to add more users to your account? Invite them from Users  page
                </p>
                <label htmlFor="teamName">Name <span className='text-red-500'>*</span></label>
                <Input
                    className='border-2 focus-visible:ring-0 focus-visible:ring-offset-0'
                    id='teamName'
                    value={teamName}
                    required
                    onChange={(e)=>setTeamName(e.target.value)}
                />
                <span className='text-red-400'>you should provide unique team name</span>
                <label htmlFor="description" className='mt-6'>Description</label>
                <Textarea
                    className=''
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                />
                <label htmlFor="seatch" className='mt-6'>Search</label>
                <Input
                    className='border-2 focus-visible:ring-0 focus-visible:ring-offset-0'
                    id='search'
                />
                <div className='mt-3 flex justify-end gap-4'>
                    <Button onClick={() => setIsForm(false)} >Cancel</Button>
                    <Button className='w-max bg-blue-700' onClick={()=>addTeam()} >
                        Add team
                    </Button>

                </div>
            </div>
            <Button onClick={()=>setIsForm(false)} ><X className='h-6 w-6 text-white' /> </Button>
        </div>
    )
}

export default TeamForm
