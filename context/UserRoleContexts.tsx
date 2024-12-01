'use client'

import { getUserId, getUserRole } from '@/action/user'
import prisma from '@/lib/prisma'
import React, { createContext, useState, useContext, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { findWorkSpaceId } from '@/action/workSpace'



type UserRole = string | null

interface UserRoleContextType {
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  refetchUserRole: (workspaceId: string) => Promise<void>
  workspaceId: string
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined)

export function UserRoleProvider({ children }: { children: React.ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>(null)
  const pathName = usePathname();
  const workSpace = pathName.split('/')[2];
  const [workspaceId, setWorkspaceId] = useState<string>('')

  const fetchUserRole = async (workspaceId: string) => {

    const role = await getUserRole(workspaceId)
    console.log('usr ROle is ', role)
    if (role) {
      setUserRole(role || null)
    }
    else {
      console.error('Error fetching user role:',)
      setUserRole(null)
    }

  }

  const refetchUserRole = async (workspaceName: string) => {
    const wsId = await findWorkSpaceId(workspaceName)
    if (!wsId) {
      return;
    }
    setWorkspaceId(wsId)
    await fetchUserRole(wsId)
  }
  useEffect(() => {
    console.log('i am refetching user role ', workSpace)
    const fetchRole = async () => {
      await refetchUserRole(workSpace)
    }
    fetchRole();
  }, [workSpace])

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, refetchUserRole, workspaceId }}>
      {children}
    </UserRoleContext.Provider>
  )
}

export function useUserRole() {
  const context = useContext(UserRoleContext)
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider')
  }
  return context
}