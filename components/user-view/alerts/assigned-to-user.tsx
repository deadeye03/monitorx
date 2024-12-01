"use client"
import { assignedToUser } from '@/action/alert';
import { getUserOfTeamMembers } from '@/action/team';
import LoadingScreen from '@/components/ui/LoadingScreen';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AlertsUser } from '@/types/type';
import { Loader2 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

function AssignedToUser({ teamId, alertId }: { teamId: string | null, alertId: string }) {
    const [userId, setUserId] = useState('');
    const [allUsers, setAllUsers] = useState<AlertsUser[] | undefined>([])
    const [isFetching, setIsFetching] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    if (!teamId) {
        return <div className='p-2 text-red-500 border'>No teams available</div>
    }
    const fetchAllUsers = useCallback(async () => {
        setIsFetching(true);
        try {
            const users = await getUserOfTeamMembers(teamId);
            setAllUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
            setAllUsers([]); // Set to empty array in case of error
        } finally {
            setIsFetching(false);
        }
    }, [teamId]);

    useEffect(() => {
        fetchAllUsers();
    }, [teamId])
    const assigendTo = async (value: string) => {
        setIsLoading(true)
        if (!value) {
            alert('User is not found')
            setIsLoading(false)
            return;
        }
        const isAsigned = await assignedToUser(alertId, value);
        if (isAsigned) {
            toast.success('User is Asigned to alert')
            location.reload();
        }
        else {
            toast.error('failed to asigned user to alert')
        }
        setIsLoading(false);

    }
    return (
        <> 
          {isLoading && <LoadingScreen/>}
            <Select value={userId} onValueChange={(value) => { assigendTo(value); setUserId(value) }}>
                <SelectTrigger>
                    <SelectValue placeholder='Select User'></SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {isFetching ? (
                        <div className="flex items-center justify-center p-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span className="sr-only">Loading teams...</span>
                        </div>
                    ) : allUsers?.length === 0 ? (
                        <div className='p-2 border text-red-500'>No Users In Team</div>
                    ) : (
                        allUsers?.map((user) => (
                            <SelectItem key={user?.id} value={user?.id}>
                                {user?.email}
                            </SelectItem>


                        ))
                    )}
                </SelectContent>
            </Select>
        </>
    )
}

export default AssignedToUser
