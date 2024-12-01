"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const getAllAlerts = async (workspaceId: string) => {
    if (!workspaceId) {
        return;
    }
    try {
        const getAllAlerts = await prisma.alert.findMany({
            where: {
                workspaceId
            },
            include: {
                monitor_config: {
                    select: {
                        id: true,
                        name: true,
                        teamId: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            }
        })
        // console.log('get all alerts is ',getAllAlerts)
        return getAllAlerts
    } catch (error: any) {
        console.log('unable to fetch all monitors', error)
        throw new Error("Unable to fetch all monitors", error)
    }

}

export const getAllAlertMonitor = async (monitorId: string) => {
    try {
        const getAllAlerts = await prisma.alert.findMany({
            where: {
                monitor_configId: monitorId
            },
            include: {
                monitor_config: {
                    select: {
                        id: true,
                        name: true,
                        teamId: true
                    }
                },
                user: {
                    select: {
                        id: true,
                        email: true
                    }
                }
            },
            orderBy:{
                createdAt:'asc'
            }

        })
        return getAllAlerts
    } catch (error: any) {
        console.log('unable to fetch all monitors', error)
        throw new Error("Unable to fetch all monitors", error)
    }
}

export const changeAlertStatus = async (alertId: string, status: boolean, workspaceName: string) => {
    try {
        await prisma.alert.update({
            where: {
                id: alertId
            },
            data: {
                acknowledged: status
            }
        })
        revalidatePath(`/monitorx/${workspaceName}/alerts`)
        return true;
    } catch (error) {
        console.log('unalbel to update alert status', error)
        return false;
    }
}

export const assignedToUser = async (alertId: string, userId: string) => {
    try {
        await prisma.alert.update({
            where: {
                id: alertId
            },
            data: {
                userId
            }
        })
        revalidatePath(`monitorx/workspace/alerts`)
        return true;
    } catch (error) {
        console.log('unalbel to assigen user to alert', error)
        return false;
    }
}