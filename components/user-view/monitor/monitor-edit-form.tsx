'use client'

import React, { ChangeEvent, useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { getMonitor, updateMonitorConfiguration } from '@/action/monitorAction'
import LoadingScreen from '@/components/ui/LoadingScreen'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import MonitorFormAllTeam from './MonitorFormAllTeam'
import { Monitor } from '@/types/type'
import { X } from 'lucide-react'

export default function MonitorEditForm({ monitorData, setShowEditForm,setConfigId }: { monitorData: Monitor, setShowEditForm: any,setConfigId:React.Dispatch<React.SetStateAction<string | null>> }) {
  console.log('monitordata is ', monitorData)
  const pathName = usePathname().split('/')[2]
  const [name, setName] = useState(monitorData.name || '')
  const [type, setType] = useState(monitorData.monitorType || '')
  const [authType, setAuthType] = useState(monitorData.Monitor_HTTP_gPRC_config?.authType || '')
  const [username, setUsername] = useState(monitorData.Monitor_HTTP_gPRC_config?.userName || '')
  const [password, setPassword] = useState(monitorData.Monitor_HTTP_gPRC_config?.password || '')
  const [initialToken, setInitialToken] = useState(monitorData.Monitor_HTTP_gPRC_config?.inital_token || '')
  const [refreshUrl, setRefreshUrl] = useState(monitorData.Monitor_HTTP_gPRC_config?.refresh_token || '')
  const [headerKey, setHeaderKey] = useState(monitorData.Monitor_HTTP_gPRC_config?.header_key || '')
  const [headerValue, setHeaderValue] = useState(monitorData.Monitor_HTTP_gPRC_config?.header_value || '')
  const [interval, setInterval] = useState(monitorData.Monitor_HTTP_gPRC_config?.interval_check || '')
  const [failuresCount, setFailuresCount] = useState(monitorData.Monitor_HTTP_gPRC_config?.failure_count || '')
  const [successCount, setSuccessCount] = useState(monitorData.Monitor_HTTP_gPRC_config?.success_count || '')
  const [successResponseCount, setSuccessResponseCount] = useState(monitorData.Monitor_HTTP_gPRC_config?.success_response_code || '')
  const [endPointUrl, setEndpointUrl] = useState(monitorData.Monitor_HTTP_gPRC_config?.endpoint_url || '')
  const [altNames, setAltNames] = useState(monitorData.Monitor_SSL_config?.alt_names || '')
  const [daysBeforeExpiry, setDaysBeforeExpiry] = useState(monitorData.Monitor_SSL_config?.expiry_reminder || '')
  const [reminderFrequency, setReminderFrequency] = useState(monitorData.Monitor_SSL_config?.expiry_reminder || '')
  const [isWildCard, setIsWildCard] = useState(monitorData.Monitor_SSL_config?.is_wildcard || false)
  const [wildCardUrl, setWildCardUrl] = useState(monitorData.Monitor_SSL_config?.wildcard_url || '')
  const [isLoading, setIsLoading] = useState(false)
  const [issueDate, setIssueDate] = useState(monitorData.Monitor_SSL_config?.certifcate_issue || '')
  const [tennure, setTennure] = useState(monitorData.Monitor_SSL_config?.certificate_tenure || '')
  const [isUrlValid, setIsUrlValid] = useState(true)
  const [monitor_http_gprcId,setMonitor_http_gprcId]=useState(monitorData.Monitor_HTTP_gPRC_config?.id || '')
  const [monitor_sslId,setMonitor_sslId]=useState(monitorData.Monitor_SSL_config?.id || '')
  const [teamId, setTeamId] = useState(monitorData.teamId || '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const data = {
      name, type, authType, username, password, initialToken, refreshUrl, headerKey, headerValue, interval, failuresCount, successCount, successResponseCount, endPointUrl, altNames, daysBeforeExpiry, reminderFrequency, isWildCard, wildCardUrl, issueDate, tennure, pathName,teamId,monitor_http_gprcId,monitor_sslId
    }

    try {
      const result = await updateMonitorConfiguration(data)
      if (result) {
        toast.success('Monitor configuration successfully updated')
        setShowEditForm(false)
        setConfigId(null)
      } else {
        toast.error('Unable to update monitor config. Please try again')
      }
    } catch (error) {
      toast.error('An error occurred while updating the monitor config')
    } finally {
      setIsLoading(false)
      setConfigId(null)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>, setState: React.Dispatch<React.SetStateAction<string>>) => {
    const urlValue = e.target.value
    setState(urlValue)
    const urlPattern = /^(https?:\/\/)([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(\/[^\s]*)?$/
    setIsUrlValid(urlPattern.test(urlValue))
  }

  return (
    <Card className="w-[100vw] top-0 left-0 fixed mx-auto h-screen z-20 flex flex-col">
      {isLoading && <LoadingScreen />}
      <CardHeader>
        <div>
          <CardTitle>Edit Monitor Configuration</CardTitle>
          <CardDescription>Update your monitoring parameters</CardDescription>
        </div>
        <div>
          <Button className='absolute top-5 right-6 text-3xl rounded-full flex justify-center items-center' onClick={() => {setShowEditForm(false);setConfigId(null)}}>
            <X className='h-6 w-6'/>
          </Button>
        </div>
      </CardHeader>
      <div className="flex-grow overflow-y-auto px-4 pb-4 md:px-80 border-2">
        <CardContent className='border rounded-md border-red-500'>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} disabled placeholder="Monitor name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input id="type" value={type} disabled placeholder="Monitor type" />
            </div>

            {(type === 'http' || type === 'grpc') && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="authType">Authentication Type <span className='text-red-500'>*</span></Label>
                  <Select value={authType} onValueChange={setAuthType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select authentication type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="jwt">JWT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {authType === 'basic' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username <span className='text-red-500'>*</span></Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password <span className='text-red-500'>*</span></Label>
                      <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                    </div>
                  </>
                )}

                {authType === 'jwt' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="initialToken">Initial Token <span className='text-red-500'>*</span></Label>
                      <Input id="initialToken" minLength={3} value={initialToken} onChange={(e) => setInitialToken(e.target.value)} placeholder="Enter initial token" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refreshUrl">Refresh URL <span className='text-red-500'>*</span></Label>
                      <Input id="refreshUrl" type='url' value={refreshUrl} onChange={(e) => handleUrlChange(e, setRefreshUrl)} placeholder="Enter refresh URL" />
                      <p className={`text-sm ${isUrlValid ? "text-muted-foreground" : "text-red-500"}`}>
                        {isUrlValid ? "You should provide a valid URL." : "Please enter a valid URL (e.g., http,https://example.com)."}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="headerKey">Header Key <span className='text-red-500'>*</span></Label>
                      <Input id="headerKey" minLength={3} value={headerKey} onChange={(e) => setHeaderKey(e.target.value)} placeholder="Enter header key" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="headerValue">Header Value <span className='text-red-500'>*</span></Label>
                      <Input id="headerValue" value={headerValue} onChange={(e) => setHeaderValue(e.target.value)} placeholder="Enter header value" />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <Label htmlFor="url">Endpoint URL <span className='text-red-500'>*</span></Label>
                  <Input id="url" type='url' value={endPointUrl} onChange={(e) => handleUrlChange(e, setEndpointUrl)} placeholder="Enter URL" />
                  <p className={`text-sm ${isUrlValid ? "text-muted-foreground" : "text-red-500"}`}>
                    {isUrlValid ? "You should provide a valid URL." : "Please enter a valid URL (e.g., http,https://example.com)."}
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interval">Interval between continuous checks (seconds) <span className='text-red-500'>*</span></Label>
                  <Input id="interval" type="number" min={1} value={interval} onChange={(e) => setInterval(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter interval" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="failuresCount">Number of continuous failures to mark unhealthy <span className='text-red-500'>*</span></Label>
                  <Input id="failuresCount" min={1} type="number" value={failuresCount} onChange={(e) => setFailuresCount(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter failures Count" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="successCount">Number of continuous success to mark healthy <span className='text-red-500'>*</span></Label>
                  <Input id="successCount" min={1} type="number" value={successCount} onChange={(e) => setSuccessCount(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter success Count" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="successResponseCount">Success response code <span className='text-red-500'>*</span></Label>
                  <Select value={successResponseCount} onValueChange={setSuccessResponseCount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select success code" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="200">200</SelectItem>
                      <SelectItem value="201">201</SelectItem>
                      <SelectItem value="400">400</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {type === 'ssl' && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="url">Endpoint URL <span className='text-red-500'>*</span></Label>
                  <Input id="url" type='url' value={endPointUrl} onChange={(e) => handleUrlChange(e, setEndpointUrl)} placeholder="Enter URL" />
                  <p className={`text-sm ${isUrlValid ? "text-muted-foreground" : "text-red-500"}`}>
                    {isUrlValid ? "You should provide a valid URL." : "Please enter a valid URL (e.g., http,https://example.com)."}
                  </p>
                </div>

                <div className="space-y-2">
                  <h2>WildCard Certificate <span className='text-red-500'>*</span></h2>
                  <div className='flex gap-3 items-center'>
                    <div className='flex gap-2 items-center'>
                      <Input id='true' name='isWildCard' className='h-6' checked={isWildCard === true} type='radio' onChange={() => setIsWildCard(true)} />
                      <label htmlFor="true">True</label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <Input id='false' name='isWildCard' className='h-6' checked={isWildCard === false} type='radio' onChange={() => setIsWildCard(false)} />
                      <label htmlFor="false">False</label>
                    </div>
                  </div>
                </div>
                {!isWildCard &&
                  <div className="space-y-2">
                    <Label htmlFor="altNames">ALT NAMES (if any) <span className='text-red-500'>*</span></Label>
                    <Textarea id="altNames" value={altNames} onChange={(e) => setAltNames(e.target.value)} placeholder="Enter ALT NAMES (one per line)" />
                  </div>}
                {isWildCard &&
                  <div className="space-y-2">
                    <Label htmlFor="wildcardUrl">Enter Your WildCard Url <span className='text-red-500'>*</span></Label>
                    <Input id="wildcardUrl" type='url' value={wildCardUrl} onChange={(e) => handleUrlChange(e, setWildCardUrl)} placeholder="Enter Wild Card url" />
                    <p className={`text-sm ${isUrlValid ? "text-muted-foreground" : "text-red-500"}`}>
                      {isUrlValid ? "You should provide a valid URL." : "Please enter a valid URL (e.g., http,https://example.com)."}
                    </p>
                  </div>}

                <div className="space-y-2">
                  <Label htmlFor="issueDate">Certificate date of issue:<span className='text-red-500'>*</span></Label>
                  <Input
                    id='issueDate'
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tennure">Certificate tenure in years<span className='text-red-500'>*</span></Label>
                  <Input id="tennure" type="number" min={0} value={tennure} onChange={(e) => setTennure(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter tenure of certificate" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderFrequency">Days before expiry reminder<span className='text-red-500'>*</span></Label>
                  <Input id="reminderFrequency" type="number" min={0} value={reminderFrequency} onChange={(e) => setReminderFrequency(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter reminder frequency" />
                </div>
              </>
            )}
            <div className="">
              <Button type="submit" className="w-full">Update</Button>
            </div>
          </form>
        </CardContent>
      </div>
    </Card>
  )
}