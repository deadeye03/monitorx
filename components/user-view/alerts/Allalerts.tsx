'use client'

import { changeAlertStatus, getAllAlertMonitor, getAllAlerts } from '@/action/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import SkeletonTable from '@/components/ui/skeleton/TableSkelton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useUserRole } from '@/context/UserRoleContexts'
import { Alerts } from '@/types/type'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { usePathname, useSearchParams } from 'next/navigation'
import { MoreVertical } from 'lucide-react'
import AssignedToUser from './assigned-to-user'
import { getUserId } from '@/action/user'

function Allalerts() {
  const searchParams = useSearchParams();
  const monitorId = searchParams.get('m') || '';
  const { workspaceId } = useUserRole()
  const [status, setStatus] = useState(searchParams.get('alert') || 'all')
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [isLoading, setIsLoading] = useState(true)
  const [allAlerts, setAllAlerts] = useState<Alerts[] | undefined>([])
  const [filteredAlerts, setFilteredAlerts] = useState<Alerts[] | undefined>([])
  const [userId,setUserId]=useState('')
  const workspaceName = usePathname().split("/")[2];

  const fetchAlerts = useCallback(async () => {
    if (workspaceId) {
      setIsLoading(true)
      setUserId(await getUserId()||'');
      try {
        if (monitorId) {
          const fetchAllAlertsMonitor = await getAllAlertMonitor(monitorId)
          setAllAlerts(fetchAllAlertsMonitor)
        } else {
          const fetchedAlerts = await getAllAlerts(workspaceId)
          setAllAlerts(fetchedAlerts)
        }
      } catch (error) {
        console.error('Error fetching alerts:', error)
      } finally {
        setIsLoading(false)
      }
    }
  }, [workspaceId, monitorId])

  useEffect(() => {
    fetchAlerts()
  }, [fetchAlerts])

  useEffect(() => {
    const newStatus = searchParams.get('alert') || 'all'
    const newQuery = searchParams.get('q') || ''
    setStatus(newStatus)
    setQuery(newQuery)
  }, [searchParams])

  useEffect(() => {
    if (!allAlerts) return;

    const filterAlerts = () => {
      let filtered = [...allAlerts];

      if (status !== 'all') {
        if (status === 'acknowledged') {
          filtered = filtered.filter(alert => alert.acknowledged === true)
        } else if (status === 'unAcknowledged') {
          filtered = filtered.filter(alert => alert.acknowledged === false)
        } else if (status === 'assigned') {
          filtered = filtered.filter(alert => alert.userId === userId)
        }
      }

      if (query) {
        filtered = filtered.filter(alert =>
          alert.monitor_config.name?.toLowerCase().includes(query.toLowerCase())
        )
      }

      setFilteredAlerts(filtered)
    }

    filterAlerts()
  }, [allAlerts, status, query])

  const updateStatus = async (newStatus: string, alertId: string) => {
    setIsLoading(true)
    if (newStatus === 'Acknowledge') {
      const update = await changeAlertStatus(alertId, true, workspaceName)
      if (update) {
        toast.success("Alert is acknowledged")
        // Update the local state to reflect the change
        setAllAlerts(prevAlerts => 
          prevAlerts?.map(alert => 
            alert.id === alertId ? {...alert, acknowledged: true} : alert
          )
        )
      } else {
        toast.error('Unable to change Alert status right now')
      }
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <SkeletonTable />
  }

  if (allAlerts?.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Alerts</h1>
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
          <p className="font-bold">No Alerts</p>
          <p>There are currently no alerts to display.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Alerts</h1>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Monitor Name</TableHead>
            <TableHead>Assigned to</TableHead>
            <TableHead>Acknowledge</TableHead>
            <TableHead>Assigned At</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAlerts?.map((alert) => (
            <TableRow key={alert.id}>
              <TableCell>{alert.monitor_config.name}</TableCell>
              <TableCell>{alert.user?.email ? alert.user?.email : <AssignedToUser teamId={alert.monitor_config?.teamId} alertId={alert.id}/>}</TableCell>
              <TableCell>
                {alert.acknowledged ? (
                  <div className='border p-2 text-green-500 rounded-md'>Acknowledged</div>
                ) : (
                  <Select
                    value={alert.acknowledged ? 'Acknowledge' : 'unAcknowledge'}
                    onValueChange={(value) => updateStatus(value, alert.id)}
                  >
                    <SelectTrigger className="focus:ring-0 focus:ring-offset-0">
                      <SelectValue placeholder="Change" />
                    </SelectTrigger>
                    <SelectContent className="top-0 z-20 bg-white text-black w-full">
                      <SelectItem value="Acknowledge" className="text-green-500">
                        Acknowledge
                      </SelectItem>
                      <SelectItem value="unAcknowledge" className="text-red-500">
                        Unacknowledge
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </TableCell>
              <TableCell>
                <span>{alert.createdAt ? new Date(alert.createdAt).toLocaleString('en-US') : ''}</span>
              </TableCell>
              <TableCell>
                <MoreVertical className='h-4 w-4 cursor-pointer' />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Allalerts

