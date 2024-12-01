'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { createWorkSpace, findWorkSpace } from '@/action/workSpace'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import LoadingScreen from './ui/LoadingScreen'
import { useUserRole } from '@/context/UserRoleContexts'


interface WorkSpace {
  id: string;
  ownerId: string;
  workspace_name: string;
  trial_startDate: Date;
  trial_endDate: Date;
  subscription_start: Date | null;
  subscription_end: Date | null;

}
export default function WorkspaceLogin({ existingWorkspaces }: { existingWorkspaces: any }) {
  const isWorkSpace = () => {
    return existingWorkspaces.length < 1 ? true : false;
  }
  const { userRole, refetchUserRole } = useUserRole()
  const router = useRouter();
  const [workspaceName, setWorkspaceName] = useState('')
  const [selectedWorkspace, setSelectedWorkspace] = useState('')
  const [isNewWorkspace, setIsNewWorkspace] = useState(isWorkSpace)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    if (newValue.includes(' ')) {
      setError('Spaces are not allowed in workspace name')
    } else {
      setError('')
      setWorkspaceName(newValue)
    }
  }
  const addWorkSpace = async () => {

    if (!workspaceName) {
      setError('Please enter workspace name')
      return;
    }
    setIsLoading(true)

    const addNewWorkspace = await createWorkSpace(workspaceName.trim())
    if (addNewWorkspace === 'true') {
      toast.success('Workspace created successfully')
      await refetchUserRole(workspaceName)
      router.push(`/monitorx/${workspaceName}`)
    }
    else {
      console.log('false', addNewWorkspace)
      toast.error(addNewWorkspace)
      setIsLoading(false)
      setWorkspaceName('')
    }
  }
  const handleSelectWorkspace = async (workspcace: string) => {
    setIsLoading(true)
    await refetchUserRole(workspcace)
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-gray-100">
      {/* Left side - Blog posts */}
      {isLoading && <LoadingScreen />}

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Welcome to Monitor<span className='text-[#11d594]'>X</span></h2>
            <p className="mt-2 text-sm text-gray-600">Select a workspace or create a new one</p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <Select value={selectedWorkspace} onValueChange={setSelectedWorkspace}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a workspace" />
                </SelectTrigger>
                {existingWorkspaces.length > 0 &&
                  <SelectContent>

                    {existingWorkspaces?.map((workspace: any, i: any) => (
                      <SelectItem key={i} value={workspace.workspace?.workspace_name}>{workspace.workspace.workspace_name}</SelectItem>
                    ))}
                  </SelectContent>}
                {existingWorkspaces.length < 1 && 
                  <div className='p-2 border text-blue-500'>No work Space avillable</div>
                }
              </Select>

              <div className="flex items-center space-x-2">
                <Switch id="new-workspace" checked={isNewWorkspace} onCheckedChange={setIsNewWorkspace} />
                <Label htmlFor="new-workspace">Create a new workspace</Label>
              </div>

              {isNewWorkspace && (
                <>
                  <Input
                    id="workspace-name"
                    type="text"
                    placeholder="Enter new workspace name"
                    value={workspaceName}
                    onChange={handleInputChange}
                    className={error ? 'border-red-500' : ''}
                  />
                  {error && <p className="text-sm text-red-500">{error}</p>}
                </>
              )}
            </div>

            <div className='w-full'>

              {isNewWorkspace ? <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" onClick={() => addWorkSpace()}> Create Workspace</Button> : <Link href={`/monitorx/${selectedWorkspace}`} onClick={() => handleSelectWorkspace(selectedWorkspace)} className="w-full block text-center bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md" >Continue </Link>}

            </div>

          </div>


        </div>
      </div>
    </div>
  )
}
