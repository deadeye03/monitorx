import { findWorkSpaceId } from '@/action/workSpace'
import { Button } from '@/components/ui/button'
import MemberDashboard from '@/components/user-view/teams/team/members/MemberDashboard'
import prisma from '@/lib/prisma'
import Image from 'next/image'
import React from 'react'

async function page({params}:{params:{workspace:string,id:string}} ) {
    // const workspaceId=await findWorkSpaceId(params.workspace)
    const allMembers=await prisma.team_member.findMany({
        where:{
            teamId:params.id
        },
        include:{
            workspace_user:{
                select:{
                    id:true,
                    role:true,
                    user:{
                        select:{
                            name:true,
                            email:true
                        }
                    }
                }
            }
        }
    })
    console.log('all member is ',allMembers)
    return (
        <MemberDashboard params={params.workspace} teamId={params.id} allMembers={allMembers}/>
    )
}

export default page
