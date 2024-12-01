import { findWorkSpaceId } from '@/action/workSpace'
import AllTeam from '@/components/user-view/teams/AllTeam'
import TeamDashboard from '@/components/user-view/teams/TeamDashboard'
import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import React from 'react'

async function page({ params }:{ params:{workspace:string} }) {
  console.log('.dfparams',params.workspace)
  const workspaceId=await findWorkSpaceId(params.workspace)
  const allTeams=await prisma.team.findMany({
    where:{
      workspaceId
    },
    orderBy:{
      createdAt:'desc'
    }
  })
  // const allTeams = findTeams.flatMap(user => user.teams);

  // console.log('teams are', allTeams);
  if (allTeams.length>0) {
    return (
      <>
      <AllTeam allTeams={allTeams} param={params.workspace}/>
      </>
    )
  }
  return (
    <>
      <TeamDashboard param={params.workspace}/>
    </>
  )
}

export default page
