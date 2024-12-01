"use server"

import prisma from "@/lib/prisma"
import { getUserId } from "./user"
import { hashSync } from "bcrypt-ts";
import { revalidatePath } from "next/cache";
import { useId } from "react";
import { findWorkSpaceId } from "./workSpace";
import { EditMonitorData } from "@/types/type";

type Data = {
    name: string,
    type: string,
    authType: string,
    username: string,
    password: string,
    initialToken: string,
    refreshUrl: string,
    headerKey: string,
    headerValue: string,
    interval: string,
    failuresCount: string,
    successCount: string,
    successResponseCount: string,
    endPointUrl: string,
    altNames: string,
    daysBeforeExpiry: string,
    reminderFrequency: string,
    isWildCard: boolean,
    wildCardUrl: string,
    issueDate: string,
    tennure: string,
    pathName: string,
    teamId: string,
    databases:string[],
    isCloudService:boolean,
}

export const createMonitorConfigration = async (data: Data) => {
    try {
        const workSpaceId = await prisma.workSpace.findUnique({
            where: {
                workspace_name: data.pathName
            }
        })
        const getUser = await getUserId();
        if (!getUser) throw new Error('Not authenticated user not found')
        const monitorConfig = await prisma.monitor_config.create({
            data: {
                userId: getUser,
                name: data.name,
                monitorType: data.type,
                workspaceId: workSpaceId?.id || '',
                teamId: data?.teamId || null,
            }
        });
        if (!monitorConfig) {
            console.log('unable ot create monitorconfig')
            throw new Error('failed during monitorConfig')
        }
        if (data.type === 'http' || data.type === 'grpc') {
            const monitor_http_grpc = await prisma.monitor_HTTP_gPRC_config.create({
                data: {
                    monitor_configId: monitorConfig.id,
                    authType: data.authType,
                    interval_check: data.interval,
                    userName: data.username || "",
                    password: hashSync(data.password, 10) || "",
                    inital_token: data.initialToken,
                    refresh_token: data.refreshUrl,
                    header_key: data.headerKey,
                    header_value: data.headerValue,
                    endpoint_url: data.endPointUrl,
                    failure_count: data.failuresCount,
                    success_count: data.successCount,
                    success_response_code: data.successResponseCount,

                }
            });
            console.log('your created config is ', monitor_http_grpc)
            revalidatePath('/monitorx')
            return true
        }
        else if (data.type === 'ssl') {
            const monitor_ssl = await prisma.monitor_SSL_config.create({
                data: {
                    monitor_configId: monitorConfig.id,
                    endpoint_url: data.endPointUrl,
                    alt_names: data.altNames,
                    is_wildcard: data.isWildCard,
                    wildcard_url: data.wildCardUrl,
                    certifcate_issue: new Date(data.issueDate),
                    certificate_tenure: data.tennure,
                    expiry_reminder: data.reminderFrequency
                }
            })
            console.log('your created config is ', monitor_ssl)
            revalidatePath('/monitorx')
            return true

        }
        else if (data.type==='components') {
            const monitor_components=await prisma.monitor_System_components.create({
                data:{
                    monitor_configId: monitorConfig.id,
                    components_lists:data.databases,
                    is_cloud:data.isCloudService
                }
            })
            console.log('your created config is ', monitor_components)
            revalidatePath('/monitorx')
            return true
        }

    } catch (error: any) {
        console.log('unable to create monitor config', error);
        // throw new Error('faild during monitor config', error)
        return false
    }
}

export const getMonitor = async (monitorId: string) => {
    try {
        const monitor = await prisma.monitor_config.findUnique({
            where: {
                id: monitorId
            },
            include: {
                Monitor_HTTP_gPRC_config: true,
                Monitor_SSL_config: true,
            }
        })
        return monitor
    } catch (error) {

    }
}

export const updateMonitorStatus = async (configId: string, status: boolean) => {
    try {
        const updated = await prisma.monitor_config.update({
            where: {
                id: configId
            },
            data: {
                is_active: status
            }
        })
        revalidatePath(`/monitorx`)
        return true;
    } catch (error) {
        console.log('Unable to update status')
        return false;
    }
}
export const isUniqueMonitors = async (name: string, workspace: string) => {
    try {
        const userId = await getUserId();
        // console.log('workspace is ',workspace)
        const workSpaceId = await findWorkSpaceId(workspace)
        if (!useId || !workSpaceId) {
            throw new Error('Unauthenticated user');
        }
        const isUnique = await prisma.monitor_config.findFirst({
            where: {
                name,
                workspaceId: workSpaceId
            }
        })
        if (isUnique) {
            return false
        }
        else {
            return true;
        }

    } catch (error) {
        console.log('Unable to process findunique method', error)
        return false;
    }


}

export const deleteMonitor = async (monitorId: string) => {
    try {
        const data = await prisma.monitor_config.delete({
            where: {
                id: monitorId
            }
        })
        revalidatePath("/monitorx/podcaster")
        return true;
    } catch (error) {
        console.log('unable to delete monitor ', error)
        return false;
    }
}

export const updateMonitorConfiguration = async (data: EditMonitorData) => {
    try {

        if (data.type === 'http' || data.type === 'grpc') {
            const monitor_http_grpc = await prisma.monitor_HTTP_gPRC_config.update({
                where: {
                    id: data.monitor_http_gprcId
                },
                data: {
                    authType: data.authType,
                    interval_check: data.interval,
                    userName: data.username || "",
                    password: hashSync(data.password, 10) || "",
                    inital_token: data.initialToken,
                    refresh_token: data.refreshUrl,
                    header_key: data.headerKey,
                    header_value: data.headerValue,
                    endpoint_url: data.endPointUrl,
                    failure_count: data.failuresCount,
                    success_count: data.successCount,
                    success_response_code: data.successResponseCount,

                }
            });
            console.log('your updated config is ', monitor_http_grpc)
            revalidatePath('/monitorx')
            return true
        }
        else if (data.type === 'ssl') {
            const monitor_ssl = await prisma.monitor_SSL_config.update({
                where: {
                    id: data.monitor_sslId
                },
                data: {
                    endpoint_url: data.endPointUrl,
                    alt_names: data.altNames,
                    is_wildcard: data.isWildCard,
                    wildcard_url: data.wildCardUrl,
                    certifcate_issue: new Date(data.issueDate),
                    certificate_tenure: data.tennure,
                    expiry_reminder: data.reminderFrequency
                }
            })
            console.log('your created config is ', monitor_ssl)
            revalidatePath('/monitorx')
            return true
        }

    } catch (error: any) {
        console.log('unable to create monitor config', error);
        // throw new Error('faild during monitor config', error)
        return false
    }
}