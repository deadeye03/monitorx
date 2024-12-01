"use client"
import { Button } from '@/components/ui/button'
import { useUserRole } from '@/context/UserRoleContexts'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import AddMemberPop from './AddMemberPop'
import { AllMembers } from '@/types/type'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { MoreHorizontal, MoreVertical, X } from 'lucide-react'
import TeamName from './TeamName'
import { removeTeamMembers } from '@/action/team'
import toast from 'react-hot-toast'

function MemberDashboard({ params, teamId, allMembers }: { params: string, teamId: string, allMembers: AllMembers[] }) {
    const [open, setOpen] = React.useState(false)
    const { userRole } = useUserRole()
    const [showRemove,setShowRemove]=useState(false)
    const [memberId,setMemberId]=useState('')
    console.log('userrrr rorleee is ', userRole)
    const handleClick=(id:string)=>{
        if (memberId===id) {
            setMemberId('')
        }
        else{
            setMemberId(id)
        }
    }
    const handleRemove=async(team_memberId:string)=>{
        const removeMember=await removeTeamMembers(team_memberId)
        if (removeMember) {
            toast.success('Member is removed success fully');
        }
        else{
            toast.error('Unable to remove Member...')
        }
    }
    return (
        <>
            {open && <AddMemberPop open={open} setOpen={setOpen} teamId={teamId} />}

            {allMembers.length < 1 &&
                <div className='p-8'>
                    <TeamName teamId={teamId}/>
                    <div className='relative  w-full flex justify-center items-center p-8'>
                        <Image src='/img/teams.svg' height={300} width={300} alt='teams' className='h-[250px] w-full object-contain' />
                    </div>
                    <div className=' flex   justify-center items-center'>
                        <div className='w-[480px] flex flex-col justify-center items-center gap-4'>
                            <h1 className='text-xl font-bold font-serif'>Your team members will show here</h1>
                            <p className='text-center'>
                                Add users as team members from here. If you can’t find the right people, you can always invite more people to Opsgenie.
                            </p>
                            <div className='flex gap-4'>
                                <Button className='bg-blue-500 rounded-md hover:bg-blue-700 hover:text-white' onClick={() => setOpen(true)} > Add Members </Button >
                                <Link href={`/monitorx/${params}/setting/users`} className='bg-slate-300 rounded-md text-gray-500 flex justify-center items-center px-4 hover:bg-black hover:text-white'> {(userRole === 'user' || userRole === 'stackholder') ? 'See Users' : 'Invite User'} </Link>
                            </div>
                        </div>
                    </div>
                </div>}

            {allMembers.length>0 && 
                <div className='pt-6 px-2'> 
                    <div className='flex justify-between'>
                    <TeamName teamId={teamId}/>
                    {(userRole === 'admin' || userRole === 'owner') &&
                     <div className='flex gap-4 justify-end'>
                                <Button className='bg-blue-500 rounded-md hover:bg-blue-700 hover:text-white' onClick={() => setOpen(true)} > Add Members </Button >
                                <Link href={`/monitorx/${params}/setting/users`} className='bg-slate-300 rounded-md text-gray-500 flex justify-center items-center px-4 hover:bg-black hover:text-white'> Invite Users </Link>
                            </div>}
                    </div>
                    <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>E-mail</TableHead>
                                  
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                

                                {allMembers.map((member) =>
                                    <TableRow key={member.id}>
                                        <TableCell>{member.workspace_user.user.name}</TableCell>
                                        <TableCell>{member.workspace_user.user.email}</TableCell>
                                        
                                        <TableCell>
                                            <Badge variant="outline" className={`bg-green-50  border-green-200 'text-green-700' }`}>
                                                verified
                                            </Badge>
                                        </TableCell>
                                        <TableCell className='relative'>
                                        {(userRole === 'admin' || userRole === 'owner') &&
                                            <Button variant="ghost" size="icon" onClick={()=>handleClick(member.id)}>
                                                {member.id===memberId? <X className='h-4 w-4'/>: <MoreVertical className="h-4 w-4" />}
                                                
                                            </Button> }
                                             {member.id===memberId &&<Button className='bg-transparent text-red-500 absolute -top-4 left-[30px] border' onClick={()=>handleRemove(member.id)}> Remove</Button>}
                                        </TableCell>
                                    </TableRow>)}
                            </TableBody>
                        </Table>
                </div>
            }
        </>
    )
}

export default MemberDashboard
