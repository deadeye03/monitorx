"use client"
import { allTeams, getAllTeamMembers } from '@/action/team'
import { useUserRole } from '@/context/UserRoleContexts'
import { TeamMembers } from '@/types/type'
import React, { useCallback, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface AllTeamProps {
  teamId: string,
  setTeamId: React.Dispatch<React.SetStateAction<string>>
}

function MonitorFormAllTeam({ teamId, setTeamId }: AllTeamProps) {
  const { workspaceId } = useUserRole()
  const [allTeam, setAllTeams] = useState<TeamMembers[]>([])
  const [isFetching, setIsFetching] = useState(false)
  const fetchTeams = useCallback(async () => {
    if (workspaceId) {
      try {
        setIsFetching(true)
        const fetchedTeams = await getAllTeamMembers(workspaceId)
        setAllTeams(fetchedTeams)
      } catch (error) {
        console.error('Error fetching teams:', error)
        // Handle error (e.g., show error message to user)
        // toast.error('Unable to get all Teams')
      } finally {
        setIsFetching(false)
      }
    }
  }, [workspaceId])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])
  return (
    <Select value={teamId} onValueChange={setTeamId}>
      <SelectTrigger>
        <SelectValue placeholder="Select Teams" />
      </SelectTrigger>
      <SelectContent>
        {isFetching ? (
          <div className="flex items-center justify-center p-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="sr-only">Loading teams...</span>
          </div>
        ) : allTeam.length > 0 ? (
          allTeam.map((member) => (
            <SelectItem key={member.team.id} value={member.team.id}>
              {member.team.teamName}
            </SelectItem>
          ))
        ) : (
          <p className="p-2 text-blue-500">No teams available</p >
        )}
      </SelectContent>
    </Select>
  )
}

export default MonitorFormAllTeam
