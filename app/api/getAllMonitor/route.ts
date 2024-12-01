// import { getUserId } from "@/action/user";

import prisma from "@/lib/prisma";


import { NextRequest,NextResponse } from "next/server";


export async function POST(req:NextRequest){
     const {userId,workSpaceId}=await req.json();
    try {     
        
        if (!userId) {
            return NextResponse.json({message:'Auntheticated user'},{status:402})
        }
        const allMonitorConfig= await prisma.monitor_config.findMany({
            where:{
                
                workspaceId:workSpaceId
            },
            include:{
                user:true,
                Monitor_HTTP_gPRC_config:true,
                Monitor_SSL_config:true,
                Monitor_System_components:true,
                team:{
                    select:{
                        id:true,
                        teamName:true
                    }
                }
            },
            orderBy:[{createdAt:'desc'},{is_active:'desc'}]
            
        })
        if (!allMonitorConfig) {
            return NextResponse.json({message:'User is not created any monitor'},{status:200})
            
        }
        //  console.log( 'allMonitorConfig',allMonitorConfig)
        return NextResponse.json({data:allMonitorConfig},{status:200})
    } catch (error) {
        console.log('unable to process you request ',error)
        return NextResponse.json({Error:error},{status:404})
    }
}