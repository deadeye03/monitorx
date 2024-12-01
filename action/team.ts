"use server"
import prisma from "@/lib/prisma";
import { getUserId } from "./user";
import { revalidatePath } from "next/cache";


export const createTeam = async (teamName: string, description: string, workSpacename: string) => {
   try {

      const workSpaceId = await prisma.workSpace.findUnique({
         where: {
            workspace_name: workSpacename
         }
      })
      const userId = await getUserId()
      if (!workSpaceId || !userId) {
         console.log('user has no wokspace with name ')
         return ('Please select correct workspace')
      }
      const isUniqueName = await prisma.team.findFirst({
         where: {
            teamName,
            workspaceId: workSpaceId.id
         }
      })
      if (isUniqueName) {
         return ("This team name is already exist please choose another one");
      }

      const team = await prisma.team.create({
         data: {
            creatorId: userId,
            workspaceId: workSpaceId?.id,
            teamName,
            description: description
         }
      })
      console.log('team is ', team)
      if (team) {
         revalidatePath(`/monitorx/${workSpacename}/teams`)
         const escalationPolicy = await prisma.team_escalationpolicy.create({
            data: {
               teamId: team.id,
               escalationplicy_name: team.teamName + "_escalation",
            }
         })
         const escalationPolicy_rule=await prisma.escalation_policy_rules.create({
            data:{
               team_escalationpolicyId:escalationPolicy.id,
               alert_status:'acknowleged',
               minutes_after_creation:0,
               notification_type:'user',
               userId,
               
            }
         })
         const escalationPolicy_rule2=await prisma.escalation_policy_rules.create({
            data:{
               team_escalationpolicyId:escalationPolicy.id,
               alert_status:'acknowleged',
               minutes_after_creation:10,
               notification_type:'members',
               teamId:team.id,
            }
         })
         const team_schedule=await prisma.team_schedule.create({
            data:{
               teamId:team.id,
               name:team.teamName + "_escalation"
            }
         })
         
         return true
      }
      else {
         return ('Failed to create team try again')
      }
   } catch (error) {
      console.log('error during creating team', error)
      return ('Failed to create team try after some time')
   }

}

export const allTeams = async (workspaceId: string) => {
   console.log('workspace id is ', workspaceId)
   try {
      const allTeams = await prisma.team.findMany({
         where: {
            workspaceId
         },
         orderBy: {
            createdAt: 'desc'
         }
      })
      return allTeams
   } catch (error: any) {
      console.log('error during fetch all Teams details', error)
      throw new Error('Unable to get teams currently', error)
   }
}

//fetching that team which has members.
export const getAllTeamMembers = async (workspaceId: string) => {
   try {
      const allMembers = await prisma.team_member.findMany({
         where: {
            workspaceId
         },
         include: {
            team: {
               select: {
                  id: true,
                  teamName: true
               }
            }
         }
      })
      return allMembers
   } catch (error: any) {
      console.log('error during fetch all Teams members details', error)
      throw new Error('Unable to get teams members currently', error)
   }
}

export const asignedMontiorTo_teams = async (teamId: string, monitorId: string) => {
   try {
      const asigned = await prisma.monitor_config.update({
         where: {
            id: monitorId
         },
         data: {
            teamId
         }
      })
      console.log('asigned team to monitor is', asigned)
      revalidatePath('/monitorx/podcaster')
      return true;
   } catch (error) {
      console.log('unalble to asigned team to monitor', error);
      return false;
   }
}

export const getTeamName = async (teamId: string) => {
   const team = await prisma.team.findFirst({
      where: {
         id: teamId
      }
   });
   return team?.teamName;
}

export const inviteTeamMembers = async (teamId: string, workspace_userId: string, workspaceId: string) => {
   try {
      const isExistMember = await prisma.team_member.findFirst({
         where: {
            teamId,
            workspace_userId
         }
      })
      if (isExistMember) {
         return 'This user is already a member this team'
      }
      const addTeam_member = await prisma.team_member.create({
         data: {
            teamId,
            workspace_userId,
            workspaceId
         }
      })
      console.log('added team member is ', addTeam_member)
      revalidatePath(`/monitorx/monitor/teams/${teamId}/members`)
      return 'true';
   } catch (error) {
      console.log('unable to add team members righ now', error)
      return ('unable to add team members righ now')
   }

}

export const removeTeamMembers = async (team_memberId: string) => {
   try {
      const remove = await prisma.team_member.delete({
         where: {
            id: team_memberId
         }
      })
      revalidatePath(`/monitorx/monitor/teams/${team_memberId}/members`)
      return true;
   } catch (error) {
      console.log('unable to Remove team member', error)
      return false;
   }
}

export const getUserOfTeamMembers = async (teamId: string) => {
   try {
      const teamWithMembers = await prisma.team.findUnique({
         where: {
            id: teamId
         },
         select: {
            team_member: {
               select: {
                  workspace_user: {
                     select: {
                        user: {
                           select: {
                              id: true,
                              email: true
                           }
                        }
                     }
                  }
               }
            }
         }
      });

      if (!teamWithMembers) {
         console.log('No team found with the given ID');
         return [];
      }

      // Filter out team members without associated users and map to the required format
      const teamMembers = teamWithMembers.team_member
         .filter(member => member.workspace_user?.user != null)
         .map(member => ({
            id: member.workspace_user.user.id,
            email: member.workspace_user.user.email
         }));

      return teamMembers;
   } catch (error) {
      console.error('Failed to fetch data for team members:', error);
      // Instead of throwing an error, return an empty array
      return [];
   }
};