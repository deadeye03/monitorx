"use server"
import prisma from "@/lib/prisma"
import { createClient } from "@/utils/supabase/server"
import { Role } from "@prisma/client"

import { findWorkSpaceId } from "./workSpace"
import { revalidatePath } from "next/cache"

interface Data{
    email:string,
    name:string,
    role:Role,
    params:string
}
export const createInviteUsers=async(info:Data,workspaceId:string)=>{
    try {
        // const workspaceId=await findWorkSpaceId(info.params)
        if (!workspaceId) {
            throw new Error('No workspace found plese try agin')
        }
        console.log('email is ',info.email)
        const { data: { user } } = await createClient().auth.getUser();
        if (user?.email===info.email) {
            return("You Can't Invite Self  ")
        }
        const isInvited=await prisma.invited_users.findFirst({
            where:{
                invited_user_email_id:info.email,
                workspaceId
            }
        })
        if (isInvited) {
            return ('This User is already invited')
        }
        const isExistUser=await prisma.user.findFirst({
            where:{
                email:info.email
            }
        })
        console.log('exist user is ',isExistUser)
        
        if (!isExistUser) {
            const invitedUser=await prisma.invited_users.create({
                data:{
                    invited_by:user?.email||"",
                    invited_user_name:info.name,
                    invited_user_email_id:info.email,
                    workspaceId,
                    role:info.role,
                    status:'unverified'
        
                }
            })
            console.log('inivited user is ',invitedUser)           
        }
        else{
            
            const invitedUser=await prisma.invited_users.create({
                data:{
                    invited_by:user?.email||"",
                    invited_user_name:info.name,
                    invited_user_email_id:info.email,
                    workspaceId,
                    role:info.role,
                    status:'verified'
        
                }
            })
            const createWork_space_users= await prisma.workSpace_users.create({
                data:{
                    userId:isExistUser.id,
                    workspaceId,
                    role:invitedUser.role
                }
            })
            console.log('inivited  existing  user is ',invitedUser)  
        }
        revalidatePath('/monitorx/test1/setting/users')
        return 'true'
    } catch (error) {
        console.log('Error during create invite users',error);
        return ('Unable to inivite users please try again')
    }

}

export const removeInviteUser =async(workspaceId:string,email:string)=>{
    try {
        await prisma.invited_users.deleteMany({
            where:{
                workspaceId,
                invited_user_email_id:email
            }
        })
        revalidatePath('/monitorx/test1/setting/users')
        return true;
    } catch (error) {
        console.log('unable to delete invited user',error)
        return false;
    }
}
