'use client'

import { allTeams, asignedMontiorTo_teams, getAllTeamMembers } from '@/action/team'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUserRole } from '@/context/UserRoleContexts'
import { TeamMembers } from '@/types/type'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

function MonitorAllTeam({ monitorId,setConfigId }: { monitorId: string,setConfigId:React.Dispatch<React.SetStateAction<string | null>> }) {
  const [teamId, setTeamId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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
        toast.error('Unable to get all Teams')
      } finally {
        setIsFetching(false)
      }
    }
  }, [workspaceId])

  useEffect(() => {
    fetchTeams()
  }, [fetchTeams])

  const assignMonitor = useCallback(async (selectedTeamId: string) => {
    try {
      await asignedMontiorTo_teams(selectedTeamId, monitorId)
      // Handle successful assignment (e.g., show success message)
      toast.success('Team is Assigned to monitor successfully')
      setConfigId(null)
    } catch (error) {
      console.error('Error assigning monitor:', error)
      toast.error('Error assigning monitor')
      // Handle error (e.g., show error message to user)
    }
  }, [monitorId])

  const handleTeamChange = useCallback((selectedTeamId: string) => {
    setIsLoading(true)
    setTeamId(selectedTeamId)
    assignMonitor(selectedTeamId)
    setIsLoading(false)
  }, [assignMonitor])

  return (
    <>
    {isLoading&&<LoadingScreen/>}
      <Select value={teamId} onValueChange={handleTeamChange}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Teams" />
        </SelectTrigger>
        <SelectContent className="">
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
            <div className="flex items-center justify-between p-2">
              <Link href={'#'} className="text-blue-500">No teams available</Link>
              
            </div>
          )}
        </SelectContent>
      </Select>
    </>
  )
}

export default MonitorAllTeam