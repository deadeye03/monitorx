"use server"

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server"
import { findWorkSpaceId } from "./workSpace";
import { error } from "console";

export const getUserId = async () => {
    const { data: { user } } = await createClient().auth.getUser();
    if (!user) throw new Error('Unauthenticated ')
    // console.log('user id is ',user.id)
    const userId = await prisma.user.findFirst({
        where: {
            supaId: user.id
        }
    })
    // console.log('monogo user is is ',userId?.id)
    return userId?.id
}
export const getUserDetails = async () => {
    const { data: { user } } = await createClient().auth.getUser();
    if (!user) throw new Error('Unauthenticated ')
    // console.log('user id is ',user.id)
    const userId = await prisma.user.findFirst({
        where: {
            supaId: user.id
        }
    })
    // console.log('monogo user is is ',userId?.id)
    return userId;
}



export const updateNumber = async (number: string) => {
    const userId = await getUserId()
    const updateNumber = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            number: number,
            is_phone_number_verified:true
        }
    })
    if (updateNumber) {
        return true;
    }
    else {
        return false;
    }
}

export const contactUs = async (name:string,email: string,phoneNumber:string) => {
    try{
    const contact = await prisma.contactUs.create({
        data: {
            name,
            email: email,
            phoneNumber:phoneNumber
        }
    })
    console.log('contact-us',contact)
    return true;
} catch (error){
    console.log('Unable to create contact us ',error)
    return false
} 

  /*  if (contact) {
        return true
    }
    else {
        return false
    } */
}

export const getUserRole = async (workspaceId: string) => {
    const userId = await getUserId();
    
    if (!userId || !workspaceId) {
        throw new Error('Unatuthenticate or invaild workspace')
    }
    const user = await prisma.workSpace_users.findFirst({
        where: {
            userId,
            workspaceId
        }
    })
    return user?.role

}
