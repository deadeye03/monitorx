'use client'

import React, { useEffect, useId, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { Badge } from "@/components/ui/badge"

import { MoreHorizontal, MoreVertical, X } from "lucide-react"
import { useUserRole } from "@/context/UserRoleContexts"
import InviteUserDialog from "./InviteUserDialog"
import { removeInviteUser } from "@/action/inviteUsers"
import toast from "react-hot-toast"


export default function UserDashboard({ params, allWorkspaceUsers, ownerWorkSpace }: { params: string, allWorkspaceUsers: any, ownerWorkSpace: any }) {
    const { userRole,workspaceId } = useUserRole()
    const [open, setOpen] = useState(userRole === 'user' ? false : userRole === 'stackholder' ? false : true)
    const [userId, setUserId] = useState('')
    const handleClick = (id: string) => {
        if (userId === id) {
            setUserId('')
        }
        else {
            setUserId(id)
        }
    }
    const handleRemove = async (userEmail: string) => {
        const removeUser=await removeInviteUser(workspaceId,userEmail)
        if (removeUser) {
            toast.success('Member is removed success fully');
        }
        else{
            toast.error('Unable to remove Member...')
        }
    }

    const allUsers = [
        {
            invited_user_name: ownerWorkSpace.user.name,
            invited_user_email_id: ownerWorkSpace.user.email,
            role: ownerWorkSpace.role,
            status: 'verified'
        },
        ...allWorkspaceUsers
    ]

    return (
        <>  {open && <InviteUserDialog open={open} setOpen={setOpen} params={params} />}


            <div className="">

                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">Users</h1>
                        {(userRole === 'owner' || userRole === 'admin') ? <Button onClick={() => setOpen(true)}>Add user</Button> : <Button>All Users</Button>}
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-2">
                            <Input placeholder="Search users..." className="max-w-sm" />
                            <Button variant="secondary">Run</Button>
                            <Button variant="secondary">Save</Button>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {allWorkspaceUsers.length} users found.
                        </div>

                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>E-mail</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>


                                {allUsers.map((user: any) =>
                                    <TableRow key={user.id}>
                                        <TableCell>{user.invited_user_name}</TableCell>
                                        <TableCell>{user.invited_user_email_id}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={`bg-green-50  border-green-200 ${user.status === 'verified' ? 'text-green-700' : 'text-red-700'}`}>
                                                {user.status}
                                            </Badge>
                                        </TableCell>

                                        <TableCell className='relative'>
                                            {(userRole === 'admin' || userRole === 'owner') &&
                                                <Button variant="ghost" size="icon" onClick={() => handleClick(user.id)}>
                                                    {user.id === userId ? <X className='h-4 w-4' /> : <MoreHorizontal className="h-4 w-4" />}

                                                </Button>}
                                            {user.id === userId && <Button className='bg-transparent text-red-500 absolute -top-4 left-[30px] border' onClick={() => handleRemove(user.invited_user_email_id)}> Remove</Button>}
                                        </TableCell>

                                    </TableRow>)}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}