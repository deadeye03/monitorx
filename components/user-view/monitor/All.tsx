"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import MonitoringForm from './MonitoringForm'
import { configData } from '@/types/type'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import { ChevronUp, ChevronDown, MoreHorizontal, Heading1, MoreVertical, X } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams } from 'next/navigation'
import SkeletonTable from '@/components/ui/skeleton/TableSkelton'
import { Select, SelectItem, SelectTrigger, SelectValue,SelectContent } from '@/components/ui/select'
import { updateMonitorStatus } from '@/action/monitorAction'
import toast from 'react-hot-toast'
import { useUserRole } from '@/context/UserRoleContexts'
import AllTeam from './MonitorTeam'
import ShowDropdownMenu from './ShowDropdownMenu'
import { useRouter } from 'next-nprogress-bar'
import { usePathname } from 'next/navigation'
import { Span } from 'next/dist/trace'
interface AllProps {
    allMonitorConfig: configData[]
}

const All: React.FC<AllProps> = ({ allMonitorConfig }) => {
    const workspaceNmae = usePathname().split("/"[2])
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState(searchParams.get('status') || 'all')
    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [detailsHeight, setDetailsHeight] = useState(200)
    const [isExpanded, setIsExpanded] = useState(true)
    const [filteredMonitors, setFilteredMonitors] = useState(allMonitorConfig)
    const [isLoading, setIsLoading] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [monitorDetails, setMonitorDetails] = useState<any>({})
    const [monitorId, setMonitorId] = useState<string | null>(null)
    const [configId, setConfigId] = useState<string | null>(null)
    const [isTeam, setIsTeam] = useState(false);
    const { userRole } = useUserRole();
    const viewRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        setMonitorId(null)
        const newStatus = searchParams.get('status') || 'all'
        const newQuery = searchParams.get('q') || ''

        if (newStatus !== status || newQuery !== query) {
            setIsLoading(true)
            setStatus(newStatus)
            setQuery(newQuery)
        }

    }, [searchParams, status, query])

    useEffect(() => {
        setIsLoading(true)
        const filterMonitors = () => {
            let filtered = allMonitorConfig
            // Filter by status
            if (status !== 'all') {
                if (status === 'active') {
                    filtered = filtered.filter(monitor => monitor.is_active === true)
                }
                else if (status === 'inactive') {
                    filtered = filtered.filter(monitor => monitor.is_active === false)
                }
            }
            // Filter by query (name search and monitor type)
            if (query) {
                filtered = filtered.filter(monitor =>
                    monitor.name.toLowerCase().includes(query.toLowerCase()) ||
                    monitor.monitorType.toLowerCase().includes(query.toLowerCase())
                )
                console.log('after qury filted', filtered)
            }

            setFilteredMonitors(filtered)
            console.log('filtered', filterMonitors)
        }

        filterMonitors()
        setIsLoading(false)
    }, [status, query, allMonitorConfig])

    const toggleExpand = () => setIsExpanded(!isExpanded)

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault()
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
        const newHeight = window.innerHeight - e.clientY
        setDetailsHeight(Math.max(50, Math.min(newHeight, window.innerHeight - 100)))
    }

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }
    const handleCheckBox = (config: any) => {
        if (monitorId === config.id) {

            setMonitorId(null)
        }
        else {
            console.log('config is ', config)
            setMonitorId(config.id)
            setMonitorDetails(config)
        }
        viewRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    const updateStatus = async (isStatus: string, configId: string) => {
        try {
            console.log('staus ', isStatus)
            let updatedStatus
            if (isStatus === 'active') {
                updatedStatus = await updateMonitorStatus(configId, false)
            }
            else {
                updatedStatus = await updateMonitorStatus(configId, true)
            }
            console.log('updated', updateStatus)
            updatedStatus ? toast.success('Status is updated') : toast.error('Unable to update status')
        } catch (error) {
            console.log('errro during update status', error)
        }
    }

    const handleMenuClick = (id: string) => {
        if (configId === id) {
            setConfigId(null)
        }
        else {
            setConfigId(id)
        }
    }

    const handleAlarmClick = (monitorId: string) => {
        router.push(`${workspaceNmae}/alerts?m=${monitorId}`)
    }
    return (
        <>

            <div className=' w-full '>
                {showForm && (
                    <div className='min-h-screen w-full p-10  flex justify-center items-center bg-white fixed top-0 left-0 z-20  '>
                        <Button className='absolute top-5 right-6 text-3xl rounded-full p-6 pb-8' onClick={() => setShowForm(false)}>
                            &times;
                        </Button>
                        <div className="w-full max-w-3xl"> {/* Add a container for form width control */}
                            <MonitoringForm setShowForm={setShowForm} />
                        </div>
                    </div>
                )}
                {/* image */}
                {allMonitorConfig && allMonitorConfig.length < 1 && <>
                    <div className='relative w-full flex justify-center items-center'>
                        <Image src='/monitor.svg' alt='monitor' height={300} width={300} />
                    </div>

                    {/* content */}
                    <div className='flex flex-col gap-4 justify-center items-center pb-8'>
                        <h1 className='font-bold font-mono text-2xl '>You don't have any Monitors Yet </h1>
                        <p className=''>
                            moniter can be created manually, or triggered by integrations, <br />  emails, heartbeats, and more <Link href='#' className='text-blue-500 hover:underline'>Learn more about monitiors </Link>
                        </p>
                        <Button className='bg-blue-600' onClick={() => setShowForm(true)}>Create Monitor</Button>
                    </div>
                </>}
                {/* {isLoading && <SkeletonTable/>} */}
                {filteredMonitors.length > 0 && !isLoading &&

                    <div className="flex flex-col min-h-[370px] " >
                        <div className="flex-grow overflow-auto">
                            <div className="container mx-auto p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-2xl font-bold">Monitor Manager</h1>
                                    {(userRole === 'user' || userRole === 'stackholder') ? <Button>See All Monitors</Button> : <Button onClick={() => setShowForm(true)}>Add Monitor</Button>}

                                </div>

                                <Table >
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]" ></TableHead>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Type</TableHead>
                                            <TableHead>Active</TableHead>
                                            <TableHead>Alerts</TableHead>
                                            <TableHead>Created-At</TableHead>
                                            <TableHead>Created-By</TableHead>
                                            <TableHead>Assigned To Team</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody >
                                        {filteredMonitors.map((config) =>
                                            <TableRow key={config.id}>
                                                <TableCell><input type="checkbox"
                                                    checked={monitorId === config.id}
                                                    onChange={() => handleCheckBox(config)} /></TableCell>
                                                <TableCell>{config.name} </TableCell>
                                                <TableCell>{config.monitorType}</TableCell>
                                                <TableCell className=''>
                                                    <Select value={`${config.is_active ? 'active' : 'inactive'}`} onValueChange={() => updateStatus(config.is_active ? 'active' : 'inactive', config.id)}  >
                                                        <SelectTrigger className="focus:ring-0 focus:ring-offset-0 ">
                                                            <SelectValue className='' placeholder="Select monitoring type" />
                                                        </SelectTrigger>
                                                        <SelectContent className=' top-0 z-20 bg-white text-black w-full'>

                                                            <SelectItem value='active' className='text-green-500' >Active</SelectItem>
                                                            <SelectItem value='inactive' className='text-red-500' >Deactive</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </TableCell>
                                                <TableCell className='cursor-pointer hover:text-blue-500 hover:underline' onClick={() => handleAlarmClick(config.id)} >View alarms</TableCell>
                                                <TableCell> <span>{config.createdAt ? new Date(config.createdAt).toLocaleDateString('en-US') : ''}</span> </TableCell>

                                                <TableCell>{config.user.email} </TableCell>
                                                {/* All teams of workspace */}

                                                {config.team?.teamName ? <TableCell className='text-green-500 font-bold'><div className='border p-2 rounded-md w-full'>{config.team.teamName}</div>  </TableCell> : (userRole === 'admin' || userRole === 'owner') ? <TableCell>
                                                    <AllTeam monitorId={config.id} setConfigId={setConfigId} />
                                                </TableCell> : <TableCell > <div className='border p-2 rounded-md'>No teams</div></TableCell>}
                                                {(userRole === 'admin' || userRole === 'owner') &&
                                                    <TableCell className='cursor-pointer relative'>
                                                        <Button variant="ghost" size="icon" onClick={() => handleMenuClick(config.id)}>
                                                            {config.id === configId ? <X className='h-4 w-4' /> : <MoreVertical className="h-4 w-4" />}

                                                        </Button>
                                                        {config.id === configId && <ShowDropdownMenu monitorId={config.id} setConfigId={setConfigId} />}
                                                    </TableCell>}
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>

                        <div
                            className="border-t border-gray-200 bg-white "
                            style={{ height: isExpanded ? `${detailsHeight}px` : '40px' }}
                        >
                            <div
                                className="flex justify-between items-center px-4 py-2 cursor-pointer"
                                onClick={toggleExpand}
                            >
                                <div className="font-semibold" ref={viewRef}>{monitorId ? monitorDetails.name : 'Select an Monitor'}</div>
                                <Button variant="ghost" size="icon">
                                    {isExpanded ? <ChevronDown /> : <ChevronUp />}
                                </Button>
                            </div>
                            {isExpanded && (
                                <>
                                    <div
                                        className="h-1 bg-gray-200 cursor-ns-resize"
                                        onMouseDown={handleMouseDown}
                                    ></div>
                                    <Tabs defaultValue="details" className="p-4">
                                        {monitorId && <TabsList>
                                            <TabsTrigger value="details">Details</TabsTrigger>

                                        </TabsList>}
                                        {monitorId &&
                                            <TabsContent value="details">
                                                <h3 className="text-lg font-semibold mb-2">Monitor  Details</h3>
                                                {/* monitor details */}
                                                {(monitorDetails.monitorType === 'http' || monitorDetails.monitorType === 'grpc') &&
                                                    <div className='grid grid-cols-3 gap-4'>
                                                        <p className='flex flex-col gap-1'>monitor name: <span className='font-bold'>{monitorDetails
                                                            .name}</span> </p>
                                                        <p className='flex flex-col gap-1'>Monitor Type: <span className='font-bold'>{monitorDetails
                                                            .monitorType}</span> </p>
                                                        <p className='flex flex-col gap-1'>authType: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.authType}</span> </p>
                                                        <p className='flex flex-col gap-1'>username: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.userName}</span> </p>
                                                        <p className='flex flex-col gap-1'>initialToken: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.inital_token}</span> </p>
                                                        <p className='flex flex-col gap-1'>refreshUrl: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.refresh_token}</span> </p>
                                                        <p className='flex flex-col gap-1'>headerKey: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.header_key}</span> </p>
                                                        <p className='flex flex-col gap-1'>headerValue: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.header_value}</span> </p>
                                                        <p className='flex flex-col gap-1'>interval: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.interval_check}</span> </p>
                                                        <p className='flex flex-col gap-1'>failuresCount: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.failure_count}</span> </p>
                                                        <p className='flex flex-col gap-1'>successCount: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.success_count}</span> </p>
                                                        <p className='flex flex-col gap-1'>successResponseCode: <span className='font-bold'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.success_response_code
                                                        }</span> </p>
                                                        <p className='flex flex-col gap-1'>endPointUrl: <span className='font-bold overflow-x-scroll no-scrollbar'>{monitorDetails.
                                                            Monitor_HTTP_gPRC_config
                                                            ?.endpoint_url
                                                        }</span> </p>



                                                    </div>
                                                }

                                                {/* ssl configurations details */}

                                                {(monitorDetails.monitorType === 'ssl') &&
                                                    <div className='grid grid-cols-3 gap-4'>
                                                        <p className='flex flex-col gap-1'>monitor name: <span className='font-bold'>{monitorDetails
                                                            .name}</span> </p>
                                                        <p className='flex flex-col gap-1'>Monitor Type: <span className='font-bold'>{monitorDetails
                                                            .monitorType}</span> </p>

                                                        <p className='flex flex-col gap-1 overflow-x-scroll no-scrollbar'>Monitor endPointUrl: <span className='font-bold'>{monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.endpoint_url}</span> </p>
                                                        <p className='flex flex-col gap-1'>WildCard Certificate <span className='font-bold text-red-500'>{monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.is_wildcard ? 'Yes' : 'No'}</span> </p>
                                                        <p className='flex flex-col gap-1 overflow-ys overflow-x-scroll no-scrollbar'>Wildcard Url: <span className='font-bold '>{monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.wildcard_url}</span> </p>
                                                        <p className='flex flex-col gap-1'>Certificate Issue Date <span className='font-bold text-green-500'>{new Date(monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.certifcate_issue).toLocaleDateString('en-US')} (mm-dd-yy)</span> </p>
                                                        <p className='flex flex-col gap-1'>Certificate Tenure <span className='font-bold'>{monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.certificate_tenure} year</span> </p>

                                                        <p className='flex flex-col gap-1'>altNames: <span className='font-bold'>{monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.alt_names}monitox.com </span> </p>
                                                        <p className='flex flex-col gap-1'>Expiry reminder day <span className='font-bold'>{monitorDetails.
                                                            Monitor_SSL_config
                                                            ?.expiry_reminder}days </span> </p>


                                                    </div>
                                                }
                                                {(monitorDetails.monitorType === 'components') &&
                                                    <div className='grid grid-cols-3 gap-4'>
                                                        <p className='flex flex-col gap-1'>monitor name: <span className='font-bold'>{monitorDetails
                                                            .name}</span> </p>
                                                        <p className='flex flex-col gap-1'>Monitor Type: <span className='font-bold'>{monitorDetails
                                                            .monitorType}</span> </p>

                                                        <p className='flex flex-col gap-1'>Cloud Service <span className='font-bold text-red-500'>{monitorDetails.
                                                            Monitor_System_components
                                                            ?.is_cloud ? 'Yes' : 'No'}</span> </p>
                                                        
                                                        <p className='flex flex-col gap-1'>All Components <span className='font-bold text-green-500'>{monitorDetails.
                                                            Monitor_System_components
                                                            ?.components_lists.map((list:string)=>
                                                            <span>{list}, </span> )}</span> </p>

                                                        {monitorDetails.
                                                            Monitor_System_components
                                                            ?.is_cloud && <>
                                                                <p className='flex flex-col gap-1 overflow-x-scroll no-scrollbar'>Cloud service url: <span className='font-bold'>{monitorDetails.
                                                                    Monitor_System_components
                                                                    ?.cloud_service_url}</span> </p>
                                                                <p className='flex flex-col gap-1'>Cloud UserName: <span className='font-bold'>{monitorDetails
                                                                    .Monitor_System_components?.cloud_userName}</span> </p>
                                                                <p className='flex flex-col gap-1'>Cloud Password: <span className='font-bold'>{monitorDetails
                                                                    .Monitor_System_components?.cloud_password}</span> </p>
                                                                <p className='flex flex-col gap-1 overflow-x-scroll no-scrollbar'>Cloud Download Binary url: <span className='font-bold'>{monitorDetails.
                                                                    Monitor_System_components
                                                                    ?.cloud_downloadUrl}</span> </p>

                                                            </>}

                                                    </div>
                                                }
                                                {/* Add more details as needed */}
                                            </TabsContent>
                                        }
                                        {/* Add content for other tabs */}
                                    </Tabs>
                                </>
                            )}
                        </div>
                    </div>
                }
                {filteredMonitors.length < 1 && status !== 'all' &&
                    <h1 className='p-20 font-bold text-black text-3xl text-center'>   Data Not Found! </h1>
                }



            </div>
        </>
    )
}

export default All
