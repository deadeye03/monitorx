'use server'

import prisma from "@/lib/prisma"
import { Frequency } from "@prisma/client"
import { revalidatePath } from "next/cache"

type Rotation = {
    name: string,
    userId: string,
    scheduleId: string,
    startTime: Date,
    endDate: Date,
    rotationType: Frequency
}


export const createSchedule = async (name: string, teamId: string) => {
    try {
        const schedule = await prisma.team_schedule.create({
            data: {
                name,
                teamId
            }
        })
        revalidatePath(`/monitorx/podcaster/teams/${teamId}/on-call`)
        return { success: true, message: 'Schedule is created Successfully' }

    } catch (error) {
        console.log('Unable ot create schedule', error)
        return { success: false, message: 'Creating Schedule is failed' }
    }
}

export const createRotation = async (rotation: Rotation) => {
    // console.log('send data is ',data)
    try {
        const create = await prisma.team_schedule_rotation.create({
            data: {
                userId: rotation.userId,
                name: rotation.name,
                team_scheduleId: rotation.scheduleId,
                frequency: rotation.rotationType,
                starts_on: rotation.startTime,
                ends_on: rotation.endDate
            }
        })
        revalidatePath(`/monitorx/podcaster/teams/45439kfjd323a/on-call`)
        return { success: true, message: 'Rotation is created Successfully' }
    } catch (error) {
        console.log('Unable ot create Rotation', error)
        return { success: false, message: 'Creating Rotation is failed' }
    }
}

export const deleteRotation = async (id: string) => {
    console.log('delete Rotation id is',id)
    try {
        await prisma.team_schedule_rotation.delete({
            where: {
                id
            }
        })
        revalidatePath(`/monitorx/podcaster/teams/45439kfjd323a/on-call`)
        return { success: true, message: 'Rotation is Deleted Successfully' }
    } catch (error) {
        console.log('Unable ot create Rotation', error)
        return { success: false, message: 'Deleting Rotation is failed' }
    }
}