import { findSearch } from '@/action/escalation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useCallback, useEffect, useState } from 'react'
import { Frequency } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import DateTimePicker from './Date-time-picker';
import { Switch } from '@/components/ui/switch';
import EndDateTimePicker from './end-time-picker';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { requestToBodyStream } from 'next/dist/server/body-streams';
import { createRotation } from '@/action/schedule';
import toast from 'react-hot-toast';
import LoadingScreen from '@/components/ui/LoadingScreen';

function Addrotation({ openAddRotation, setOpenAddRotation, teamId, scheduleId }: { openAddRotation: boolean, setOpenAddRotation: React.Dispatch<React.SetStateAction<boolean>>, teamId: string, scheduleId: string }) {
    const [name, setName] = useState('Rota1');
    const [userId, setUserId] = useState('')
    const [users, setUsers] = useState<any>([])
    const [showSuggestion, setShowSuggestion] = useState(false)
    const [filterUser, setFilterUsers] = useState<any>([])
    const [searchText, setSearchText] = useState('')
    const [rotationType, setRotationType] = useState<Frequency>('daily')
    // const [date, setDate] = useState<Date>(new Date())
    // const [time, setTime] = useState<string>("08:00")
    // const [endTime, setEndTime] = useState<string>("11:30")
    const [endDate, setEndDate] = useState<Date>(new Date())
    const [startTime, setStartTime] = useState<Date>(new Date())
    const [isEnd, setIsEnd] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const fetchSearch = useCallback(async () => {
        const users = await findSearch('user', teamId)
        setUsers(users)
    }, [teamId])

    useEffect(() => { fetchSearch() }, [teamId])

    useEffect(() => {
        let filtered = [...users];
        filtered = filtered.filter(user => user.workspace_user?.user.name.toLowerCase().includes(searchText.toLowerCase()))
        setFilterUsers(filtered)
    }, [searchText, users])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)
        if (!userId || !name || !teamId || !scheduleId) {
            setError('Please Enter All Required Field')
            return;
        }
        let rotation;
        if (!isEnd) {
            // Calculate ends_on (1 year ahead of starts_date)
            endDate.setFullYear(startTime.getFullYear() + 1);
            const data = { userId, name, scheduleId, rotationType, startTime, endDate }
            rotation = await createRotation(data);
        }
        else {
            if (startTime>=endDate) {
                setError('Rotation startTime has to be smaller than endTime!')
                setIsLoading(false)
                return;
            }
            const data = { userId, name, scheduleId, rotationType, startTime, endDate }
            rotation = await createRotation(data);
        }
        if (rotation.message) {
            toast.success(rotation.message)
            setOpenAddRotation(false);
        }
        else {
            toast.error(rotation.message)
        }
        setIsLoading(false)
        console.log(userId, startTime, name, teamId, rotationType, endDate)
    }
    const findUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setShowSuggestion(true)
        setSearchText(e.target.value);
    }
    const handleUserClick = (id: string, userName: string) => {
        console.log('user name and id is ', id, userName)
        setSearchText(userName);
        setShowSuggestion(false);
        setUserId(id);
    }

    return (
        <>
        {isLoading && <LoadingScreen/>};
            <Dialog open={openAddRotation} onOpenChange={setOpenAddRotation} >
                <DialogContent className="sm:max-w-[1000px] p-0 top-4 translate-y-0 translate-x-[-50%] overflow-y-scroll" onClick={() => setShowSuggestion(false)}>
                    <DialogHeader className='border-b p-6'>
                        <DialogTitle>Add Rotation</DialogTitle>
                    </DialogHeader>
                    {error && <div className='flex gap-3 px-6 py-3 bg-red-300 text-slate-700 items-center'><X className='h-5 w-5 text-red-500 cursor-pointer' onClick={() => setError('')} /> <p className=''>{error}</p></div>}
                    <form onSubmit={handleSubmit} className='px-6 py-3 '>
                        <Label htmlFor="name" aria-required className='text-sm font-semibold text-slate-600'>Name<span className='text-red-500'>*</span></Label>
                        <Input id='name' value={name} onChange={(e) => setName(e.target.value)} className='mb-4'></Input>
                        <Label htmlFor="name" aria-required className='text-sm font-semibold text-slate-600'>Participants<span className='text-red-500'>*</span></Label>

                        {/* Participants box */}
                        <Input onChange={(e) => findUser(e)} value={searchText} className='focus-visible:ring-0 focus:border-2 focus:border-blue-500 focus-visible:ring-offset-0 mb-4'></Input>
                        {showSuggestion && <ul className='border mb-2 max-w-60 rounded-md shadow-md max-h-40 overflow-y-scroll no-scrollbar'>
                            {filterUser.length > 0 ? <> <li className='p-2 text-sm text-gray-500 font-semibold'>USER(s)</li> {filterUser?.map((user: any) => <li key={user.workspace_user?.user.id} className='p-2 text-black border-b hover:text-white font-bold text-sm hover:bg-[#253858] cursor-pointer ' onClick={() => handleUserClick(user.workspace_user?.user.id, user.workspace_user?.user.name)} >{user.workspace_user?.user.name}</li>)} </> : <li className='p-2 bg-white text-gray-500'>No result found</li>}
                        </ul>}

                        {/* Rotation Type */}
                        <p className='text-sm font-semibold text-slate-600'>Rotation Type <span className='text-red-500'>*</span></p>
                        <Select value={rotationType} onValueChange={(value) => setRotationType(value as Frequency)}>
                            <SelectTrigger className='focus:ring-0 focus:ring-ring focus:ring-offset-0' >
                                <SelectValue defaultValue={rotationType} placeholder={rotationType}>{rotationType} </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value='daily'>
                                    daily
                                </SelectItem>
                                <SelectItem value='weekly'>
                                    weekly
                                </SelectItem>
                                <SelectItem value='custom'>
                                    custom
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        {/* select starts date */}
                        <p className='text-sm font-semibold text-slate-600 mt-4'>start on</p>
                        <DateTimePicker setStartTime={setStartTime} />

                        {/* select ends date */}

                        <div className='flex gap-3 items-center my-2'>
                            <p className='text-sm font-semibold text-slate-600 '>ends on </p>
                            <Switch id="ends-on" checked={isEnd} onCheckedChange={setIsEnd} />
                        </div>
                        {isEnd && <EndDateTimePicker setEndDate={setEndDate} />}
                        {/* <DateTimePicker date={date} setDate={setDate} time={time} setTime={setTime} /> */}
                        <div className='mt-4 flex gap-4 justify-end'>
                            <Button className='bg-white hover:bg-slate-300 text-gray-500' onClick={() => setOpenAddRotation(false)} >Cancel</Button>
                            <Button type='submit' className='bg-blue-500 text-white' onClick={handleSubmit} >Add</Button>

                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Addrotation
