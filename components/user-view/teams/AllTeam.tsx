"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TeamsData } from '@/types/type'
import { useRouter } from 'next-nprogress-bar'

import React, { useState } from 'react'
import TeamForm from './TeamForm'
import { useUserRole } from '@/context/UserRoleContexts'
import Link from 'next/link'
interface TeamProps{
  allTeams:TeamsData[]
  param:string
}

const AllTeam: React.FC<TeamProps> = ({ allTeams,param }) => {
  // console.log('param in team',param)
  const {userRole}=useUserRole();
  const router=useRouter();
  const [isForm,setIsForm]=useState(false)
  const handleClick=(id:string)=>{
    router.push(`/monitorx/${param}/teams/${id}/members`)
  }
  const openForm=()=>{
    
  }
  return (<>
     <div className='flex items-center justify-between p-4'>
      <h1 className='font-bold'>Your All Teams</h1>
      {(userRole==='user'||userRole==='stackholder')?<Button>See All Teams</Button> : <div className='flex gap-4'><Button onClick={()=>setIsForm(true)}>Add Team</Button> <Link href={`/monitorx/${param}/setting/users`} className='bg-slate-300 rounded-md text-gray-500 flex justify-center items-center px-4 hover:bg-black hover:text-white'> Invite Uers </Link></div> }
     </div>
    {isForm && <TeamForm setIsForm={setIsForm}/>}
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Created_At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody >
        {allTeams.map((team) => (
          <TableRow key={team.id} onClick={()=>handleClick(team.id)} className='cursor-pointer'>
            <TableCell>{team.teamName}</TableCell>
            <TableCell>{team.description}</TableCell>
            <TableCell>{new Date(team.createdAt).toLocaleDateString('en-US')}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
};


export default AllTeam
