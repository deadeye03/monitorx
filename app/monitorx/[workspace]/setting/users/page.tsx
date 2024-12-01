import { getUserId } from '@/action/user'
import { findWorkSpaceId } from '@/action/workSpace';
import UserDashboard from '@/components/user-view/setting/user/UserDashboard'
import { useUserRole } from '@/context/UserRoleContexts';
import prisma from '@/lib/prisma';
import React from 'react'

async function page({params}:{params:{workspace:string}}) {
 
  const userId=await getUserId();
  const workspaceId=await findWorkSpaceId(params.workspace)
  // const userRole=await prisma.workSpace_users.findFirst({
  //   where:{
  //     userId,
  //     workspaceId
  //   }
  // })
  
  const allWorkspaceUsers=await prisma.invited_users.findMany({
    where:{
      workspaceId
    },
    select:{
      id:true,
      invited_user_name:true,
      invited_user_email_id:true,
      role:true,
      status:true,
      
    },
    
  })
  const ownerWorkSpace=await prisma.workSpace_users.findFirst({
    where:{
      workspaceId,
      role:'owner'
    },
    include:{
      user:true,
      
    }
  })
  
  // console.log('allWorkspace user',allWorkspaceUsers)
  // console.log("user of workspace is " ,userRole)
  console.log('owner of workspce ',ownerWorkSpace)
  // if (!userRole) {
  //   throw new Error('SOMETHING WENT WRONG AT USER ROLE')
  // }

  return (
    <div>
      <UserDashboard params={params.workspace}  allWorkspaceUsers={allWorkspaceUsers} ownerWorkSpace={ownerWorkSpace}/>
    </div>
  )
}

export default page
