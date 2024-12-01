"use server"

import prisma from "@/lib/prisma"
import { notification_type } from "@prisma/client"
import { revalidatePath } from "next/cache"

type Rule = {
    condition: string
    action: notification_type
    minutes: number
    id: string
    search:string
}

export const addEscalationPolicies = async (rules: Rule[], escalationName: string, teamId: string) => {
    try {
      const team_escalation = await prisma.team_escalationpolicy.create({
        data: {
          teamId,
          escalationplicy_name: escalationName
        }
      })
  
      await Promise.all(rules.map(async (rule) => {
        if (rule.action==='user') {
          await prisma.escalation_policy_rules.create({
            data: {
              team_escalationpolicyId: team_escalation.id,
              alert_status: rule.condition,
              minutes_after_creation: rule.minutes,
              notification_type: rule.action,
              userId: rule.id,
            }
          })         
        }
        else if (rule.action==='on_call') {
          await prisma.escalation_policy_rules.create({
            data: {
              team_escalationpolicyId: team_escalation.id,
              alert_status: rule.condition,
              minutes_after_creation: rule.minutes,
              notification_type: rule.action,
            }
          })
        }
        else{
          await prisma.escalation_policy_rules.create({
            data: {
              team_escalationpolicyId: team_escalation.id,
              alert_status: rule.condition,
              minutes_after_creation: rule.minutes,
              notification_type: rule.action,
              teamId: rule.id,
            }
          })
        }
      }))
      revalidatePath(`/monitox/workspace/teams/${teamId}/on-call`)
      return { success: true, message: "Escalation policies added successfully" }
    } catch (error) {
      console.error("Error adding escalation policies:", error)
      return { success: false, message: "Failed to add escalation policies" }
    }
  }

export const isUniqueEscalation_name=async(teamId:string,name:string)=>{
    const isName=await prisma.team_escalationpolicy.findFirst({
        where:{
            teamId,
            escalationplicy_name:name
        }
    })
    if (isName) {
        return ({isAvillable:true,message:'This name is already exist choose another one'})
    }
    return;
}

export const findSearch=async(option:string,id:string)=>{
  console.log('id is ',id)
  try {
    if (option==='user') {
      const findAllUsers=await prisma.team_member.findMany({
        where:{
          teamId:id,
        },
        select:{
          workspace_user:{
            select:{
              user:{
                select:{
                  id:true,
                  name:true
                }
              }
            }
          }
        }
      })
      console.log('all user of search is ',findAllUsers)
      return findAllUsers;
    }
    else if (option==='on_call') {
      
    }
    else{
      const findAllTeams=await prisma.team.findMany({
        where:{
          workspaceId:id
        },
        select:{
          id:true,
          teamName:true
        }
      })
      return findAllTeams;
    }
    return;
  } catch (error) {
    console.log('Unable to find search',error)

  }
}
  