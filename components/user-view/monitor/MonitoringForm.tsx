'use client'

import React, { ChangeEvent, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { createMonitorConfigration, isUniqueMonitors } from '@/action/monitorAction'
import LoadingScreen from '@/components/ui/LoadingScreen'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'
import { url } from 'inspector'
import AllTeam from './MonitorTeam'
import MonitorFormAllTeam from './MonitorFormAllTeam'
import { Checkbox } from '@/components/ui/checkbox'

const databaseOptions = [
  { id: 'mysql', label: 'MySQL' },
  { id: 'postgresql', label: 'PostgreSQL' },
  { id: 'mongodb', label: 'MongoDB' },

]
export default function MonitoringForm({ setShowForm }: { setShowForm: any }) {
  const pathName = usePathname().split('/')[2]
  // console.log('pathing..is ',pathName)
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [authType, setAuthType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [initialToken, setInitialToken] = useState('')
  const [refreshUrl, setRefreshUrl] = useState('')
  const [headerKey, setHeaderKey] = useState('')
  const [headerValue, setHeaderValue] = useState('')
  const [interval, setInterval] = useState('')
  const [failuresCount, setFailuresCount] = useState('')
  const [successCount, setSuccessCount] = useState('')
  const [successResponseCount, setSuccessResponseCount] = useState('')
  const [endPointUrl, setEndpointUrl] = useState('')
  const [altNames, setAltNames] = useState('')
  const [daysBeforeExpiry, setDaysBeforeExpiry] = useState('')
  const [reminderFrequency, setReminderFrequency] = useState('')
  const [isWildCard, setIsWildCard] = useState(true)
  const [wildCardUrl, setWildCardUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [issueDate, setIssueDate] = useState('')
  const [tennure, setTennure] = useState('')
  const [isSearch, setIsSearch] = useState(false)
  const [isUnique, setIsUnique] = useState(false)
  const [isUrlValid, setIsUrlValid] = useState(true);
  const [teamId, setTeamId] = useState('')
  //System components monitor varriable
  const [databases, setDatabases] = useState<string[]>([])
  const [isCloudService,setIsCloudService]=useState(true);
  const handleCheckboxChange = (databaseId: string) => {
    setDatabases(prev =>
      prev.includes(databaseId)
        ? prev.filter(id => id !== databaseId)
        : [...prev, databaseId]
    )
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Handle form submission here
    // console.log('Form submitted', { name, type, authType, username, password, initialToken, refreshUrl, headerKey, headerValue, interval, failuresCount, successCount, successResponseCount, endPointUrl, altNames, daysBeforeExpiry, reminderFrequency })
    const data = {
      name, type, authType, username, password, initialToken, refreshUrl, headerKey, headerValue, interval, failuresCount, successCount, successResponseCount, endPointUrl, altNames, daysBeforeExpiry, reminderFrequency, isWildCard, wildCardUrl, issueDate, tennure, pathName,databases,isCloudService, teamId
    }
    console.log('data is ', data)
    if (type === 'http' || type === 'grpc') {

      if (authType === '') {

        toast.error('Please select authentication type ');
        setIsLoading(false)
        return;
      }
      if (interval === '' || failuresCount === '' || successCount === '' || successResponseCount === '' || endPointUrl === '') {
        toast.error('Please Enter All required filed');
        setIsLoading(false)
        return;
      }
    }
    if (authType === 'basic') {
      if (username === '' || password === '') {
        toast.error('Please Enter Username or password ');
        setIsLoading(false)
        return;
      }
    }
    else if (authType === 'jwt') {
      if (initialToken === '' || headerKey === '' || headerValue === '') {
        toast.error('Please Enter all required filed (initialToken ,headerkey,headervalue) ');
        setIsLoading(false)
        return;
      }
    }
    if (type === 'ssl') {
      if (isWildCard) {
        if (wildCardUrl === '') {
          toast.error('Please Enter Wild Card Url');
          setIsLoading(false)
          return;
        }
      }
      else {
        if (altNames === '') {
          toast.error('Please Enter alt Names');
          setIsLoading(false)
          return;
        }
      }
      if (endPointUrl === '' || issueDate === '' || tennure === '' || reminderFrequency === '') {
        toast.error('Please Enter All required filed');
        setIsLoading(false)
        return;
      }
    }
    if (type ==='components'){
      if (databases.length<1) {
        toast.error('Choose at least one Components')
        setIsLoading(false);
        return;
      }
    }
    toast.success('data is submitting......')
    const result = await createMonitorConfigration(data)
    if (result) {
      toast.success('Monitor configuration successfully added')
      setShowForm(false)
      setIsLoading(false)
    }
    else {
      toast.error('Unable to create monitor config ...Please try again')
      setIsLoading(false)
    }
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>,setUrl:React.Dispatch<React.SetStateAction<string>>) => {
    const urlValue = e.target.value;
    setUrl(urlValue);

    // Updated regular expression for more flexible URL validation
    const urlPattern = /^(https?:\/\/)?(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[^\s]*)?((\?|&)[^\s]*)?$/;
    
    setIsUrlValid(urlPattern.test(urlValue));
    // console.log('URL value is:', urlValue);
    // console.log('Is URL valid:', urlPattern.test(urlValue));
  };

  const onCheck = async () => {
    setIsSearch(true)


    setTimeout(async () => {
      const isUnique = await isUniqueMonitors(name, pathName)
      if (!isUnique) {
        toast.error("This monitor is already exist")
        setIsSearch(false)
        setIsUnique(false)
      }
      else {
        setIsSearch(false)
        setIsUnique(true)
      }
    }, 1000);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto max-h-screen pb-10 overflow-y-auto">
      {isLoading && <LoadingScreen />}
      <CardHeader>
        <CardTitle>Monitoring Configuration</CardTitle>
        <CardDescription>Set up your monitoring parameters</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name <span className='text-red-500'>*</span> </Label>
            <div className='flex border-2 items-center rounded-md'>
              <Input id="name" className='border-0 focus-visible:ring-0 focus-visible:ring-offset-0' value={name} onChange={(e) => setName(e.target.value)} disabled={isUnique == true} placeholder="Enter monitoring name" required />
              {isSearch ?
                <div role="status">
                  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div> : <Button disabled={name.length < 4 || isUnique == true} onClick={() => onCheck()} className=' disabled:bg-slate-500 disabled:text-black'>Check</Button>}
            </div>
          </div>

          {isUnique && <div className="space-y-2">
            <Label htmlFor="type">Type <span className='text-red-500'>*</span> </Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select monitoring type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="components">System components monitoring</SelectItem>
                <SelectItem value="http">HTTP healthcheck</SelectItem>
                <SelectItem value="grpc">gRPC healthcheck</SelectItem>
                <SelectItem value="ssl">SSL expiry check</SelectItem>
                <SelectItem value="nginx">Nginx response time check</SelectItem>
                <SelectItem value="error">4xx or 5xx error count check</SelectItem>
              </SelectContent>
            </Select>
          </div>}
          {type === 'components' &&
            (<>
              <div className="space-y-2">
                <Label htmlFor="type">Choose your components: <span className='text-red-500'>*</span> </Label>
                <div className='flex'>
                  {databaseOptions.map((option) => (
                    <div key={option.id} className="flex flex-1 text-blue-500 items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={databases.includes(option.id)}
                        onCheckedChange={() => handleCheckboxChange(option.id)}
                      />
                      <Label htmlFor={option.id}>{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className='space-y-2'>
                 <h3>Did you want to use our cloud services <span className='text-red-500'>*</span></h3>
                  <div className='flex gap-12 items-center'>
                    <div className='flex gap-2 items-center'>
                      <Input id='yes' type='radio' name='isCloud' checked={isCloudService} onChange={()=>setIsCloudService(true)} ></Input>
                      <Label className='text-blue-500' htmlFor='yes'>Yes</Label>
                    </div>
                    <div className='flex gap-2 items-center'>
                      <Input id='no' type='radio' name='isCloud' checked={!isCloudService} onChange={()=>setIsCloudService(false)} ></Input>
                      <Label className='text-blue-500' htmlFor='no'>No</Label>
                    </div>
                  </div>
              </div>
            </>
            )}

          {(type === 'http' || type === 'grpc') && (
            <>
              <div className="space-y-2">
                <Label htmlFor="authType">Authentication Type <span className='text-red-500'>*</span> </Label>
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
                    <Label htmlFor="username">Username <span className='text-red-500'>*</span> </Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password <span className='text-red-500'>*</span> </Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" />
                  </div>
                </>
              )}

              {authType === 'jwt' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="initialToken">Initial Token <span className='text-red-500'>*</span> </Label>
                    <Input id="initialToken" minLength={3} value={initialToken} onChange={(e) => setInitialToken(e.target.value)} placeholder="Enter initial token" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="refreshUrl">Refresh URL <span className='text-red-500'>*</span> </Label>
                    <Input id="refreshUrl" type='url' value={refreshUrl} onChange={(e) => handleUrlChange(e, setRefreshUrl)} placeholder="Enter refresh URL" />
                    <p className={`text-sm ${isUrlValid ? "text-muted-foreground" : "text-red-500"}`}>
                      {isUrlValid ? "You should provide a valid URL." : "Please enter a valid URL (e.g., http,https://example.com)."}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerKey">Header Key <span className='text-red-500'>*</span> </Label>
                    <Input id="headerKey" minLength={3} value={headerKey} onChange={(e) => setHeaderKey(e.target.value)} placeholder="Enter header key" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headerValue">Header Value <span className='text-red-500'>*</span> </Label>
                    <Input id="headerValue" value={headerValue} onChange={(e) => setHeaderValue(e.target.value)} placeholder="Enter header value" />
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="url">Endpoint URL <span className='text-red-500'>*</span> </Label>
                <Input id="url" type='url' value={endPointUrl} onChange={(e) => handleUrlChange(e, setEndpointUrl)} placeholder="Enter URL" />
                <p className={`text-sm ${isUrlValid ? "text-muted-foreground" : "text-red-500"}`}>
                  {isUrlValid ? "You should provide a valid URL." : "Please enter a valid URL (e.g., http,https://example.com)."}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interval">Interval between continuous checks (seconds)  <span className='text-red-500'>*</span> </Label>
                <Input id="interval" type="number" min={1} value={interval} onChange={(e) => setInterval(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter interval" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="failuresCount">Number of continuous failures to mark unhealthy  <span className='text-red-500'>*</span> </Label>
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
                <h2 >WildCard Certificate <span className='text-red-500'>*</span></h2>
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
                  <Label htmlFor="wildcardUrl">Enter Your WildCard Url  <span className='text-red-500'>*</span></Label>
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
                <Label htmlFor="tennure">Certificate tennure in year<span className='text-red-500'>*</span></Label>
                <Input id="tennure" type="number" min={0} value={tennure} onChange={(e) => setTennure(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter tennure of certificate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminderFrequency">Days before expiry reminder<span className='text-red-500'>*</span></Label>
                <Input id="reminderFrequency" type="number" min={0} value={reminderFrequency} onChange={(e) => setReminderFrequency(parseInt(e.target.value) > 0 ? e.target.value : '1')} placeholder="Enter reminder frequency" />
              </div>
            </>
          )}
          {isUnique &&
            <div className="space-y-2">
              <Label htmlFor="reminderFrequency">Assigned To Team</Label>

              <MonitorFormAllTeam teamId={teamId} setTeamId={setTeamId} />
            </div>}

          <Button type="submit" disabled={isUnique == false || name.length < 4 || !type} className="w-full disabled:bg-gray-500 disabled:text-white">Submit</Button>
        </form>
      </CardContent>
    </Card>
  )
}