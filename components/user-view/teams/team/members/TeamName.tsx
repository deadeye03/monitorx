"use client"
import { getTeamName } from '@/action/team';
import { Button } from '@/components/ui/button';

import React, { useEffect, useState } from 'react'

 function TeamName({teamId}:{teamId:string}) {
    const [teamName,setTeamName]=useState<string|undefined>('')
    useEffect(()=>{
        const team=async()=>{
            const teamN= await getTeamName(teamId)
            setTeamName(teamN)
        }
        team();
    },[teamId])
  return (
    <Button>
      Members:- {teamName}
    </Button>
  )
}

export default TeamName
