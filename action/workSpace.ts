"use server"
import prisma from "@/lib/prisma";
import { getUserId } from "./user";



export const findWorkSpace=async()=>{
    const userId=await getUserId();
    const existingWorkspaces=await prisma.workSpace_users.findMany({
      where:{
        userId
      },
      include:{
        workspace:true
      }
    })
    console.log('existing workspace ',existingWorkspaces)
}

export const createWorkSpace=async(name:string)=>{
    console.log('i am in creatWorkSpace')
    console.log('workspace is ',name)
    try {
        const userId=await getUserId ();
        if (!userId) {
            throw new Error("unauthenticated at createWorkspaces")
        }
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 30);
        
        const addWorkspace=await prisma.workSpace.create({
            data:{
            ownerId:userId ,
            workspace_name :name,
            trial_endDate:trialEndDate
            }
        })
    
        const addWorkSpaceUser=await prisma.workSpace_users.create({
            data:{
                userId:addWorkspace.ownerId,
                workspaceId:addWorkspace.id
            }
        })
        console.log('addworkspace is',addWorkspace)
        console.log('addworkspace user is ',addWorkSpaceUser)
        return 'true';
    } catch (error:any) {
        console.log('unable to create workspace',error)
        if (error.code=='P2002') {
            return ('This name is alreadey taken please choose another one')
        }
        return('Creating workSpace failed Please try again.....at else ');
    }

}

export const findWorkSpaceId = async (name: string) => {
    if (!name || name.trim() === '') {
      return ;
    }
  
    const workspace = await prisma.workSpace.findUnique({
      where: {
        workspace_name: name.trim()
      }
    });
  
    if (!workspace) {
      console.log('workspace not found yet please enter a workspce')
      return;
    }
  
    return workspace.id;
  }


export const findAllWorkspaceMember=async(workspaceId:string)=>{
    try {
        const allMembers=await prisma.workSpace_users.findMany({
            where:{
                workspaceId
            },
            select:{
                id:true,
                user:true
            }
        })
        return allMembers;
        
    } catch (error) {
        console.log('unable to find all workspace members',error);
        throw new Error('unable to fetch all members');
    }
}