import OnCall from '@/components/user-view/teams/team/on-call/On-call'
import prisma from '@/lib/prisma'
import React from 'react'

async function page({ params }: { params: { workspace: string, id: string } }) {
  console.log("params is and on-call", params)
  const allEscalation = await prisma.team_escalationpolicy.findMany({
    where: {
      teamId: params.id
    },
    include: {
      escalation_policy_rules: {
        include: {
          user:{
            select:{
              id:true,
              name:true
            }
          },
          team:{
            select:{
              id:true,
              teamName:true
            }
          }
        },
        orderBy:{
          minutes_after_creation:'asc'
        }
      },
      
    }
  })
  const teamName = await prisma.team.findUnique({
    where: {
      id: params.id,
    },
    select: {
      teamName: true
    }
  })
  const allSchedule =await prisma.team_schedule.findMany({
    where:{
      teamId:params.id,
    },
    include:{
      team_schedule_rotation:{
        include:{
          user:{
            select:{
              id:true,
              name:true,
            }
          }
        }
      },
      team_schedule_override:true
    }
  })
  // console.log('all esclation is ', allEscalation)
  // console.log('teamNameis ',teamName)
  if (!teamName) {
    throw new Error('unable to get teamNmae')
  }
  return (
    <div>
      <OnCall param={params.workspace} teamId={params.id} allEscalation={allEscalation} teamName={teamName.teamName} allSchedule={allSchedule} />
    </div>
  )
}

export default page
