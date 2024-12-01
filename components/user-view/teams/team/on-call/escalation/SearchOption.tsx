"use client"
import { findSearch } from '@/action/escalation';
import { Input } from '@/components/ui/input';
import { useUserRole } from '@/context/UserRoleContexts';
import React, { useCallback, useEffect, useState } from 'react'

type Option = {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setId: React.Dispatch<React.SetStateAction<string>>;
    action: string,
    setShowError: React.Dispatch<React.SetStateAction<boolean>>;
    teamId: string;
    showSuggestion:boolean,
    setShowSuggestion:React.Dispatch<React.SetStateAction<boolean>>
}

function SearchOption({ search, setSearch, action, setShowError, teamId,showSuggestion,setShowSuggestion,setId }: Option) {
    const { workspaceId } = useUserRole();
    const [option, setOption] = useState<any>([])
    const [filterSuggestions, setFilteredSuggestions] = useState<any>([]);
    const fetchSearch = useCallback(async () => {
        if (action === 'user') {
            const users = await findSearch('user', teamId)
            setOption(users)
        }
        else if (action === 'on_call') {

        }
        else {
            const teams = await findSearch(action, workspaceId);
            setOption(teams);
        }

    }, [action]);

    useEffect(() => { fetchSearch() }, [action])
    // useEffect(() => {
    //     let filtered = [...option]
    //     if (search) {
    //         filtered.filter(opt => opt?.workspace_user.user.name.toLowerCase().include(search.toLowerCase()) ||
    //             opt?.teamName.toLowerCase().include(search.toLowerCase()))
    //         setFilteredSuggestions(filtered)
    //     }
    //     setFilteredSuggestions(filtered)
    //     console.log("filter on-call",filterSuggestions)
    // }, [search,option])

    return (
        <>
            <Input
                type="text"
                placeholder={`Search for ${action}`}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setShowError(false) }}
                onFocus={() => setShowSuggestion(true)}
            />
            {showSuggestion &&
                <div className='min-h-10 max-h-40 w-full border rounded-md mt-2  overflow-y-auto no-scrollbar'>
                    {action === 'user' ?
                        option.length > 0 ? option.map((opt: any) =>
                            <li key={opt.workspace_user.user?.id || 'unique'} className="py-2 px-2 hover:bg-gray-300 hover:text-blue-400 cursor-pointer list-none w-full" onClick={() => { setSearch(opt.workspace_user.user?.name); setShowSuggestion(false);setId(opt.workspace_user.user?.id|| "") }}>{opt.workspace_user?.user.name}</li>
                        ) : <li className='bg-slate-300 list-none py-2'>No Result found</li> :
                        action === 'on_call' ? <li className='list-none py-2'>Schedule not yet</li> :
                            option.length > 0 ? option.map((opt: any) =>
                                <li key={opt.id} className="py-2 px-2 hover:bg-gray-300 hover:text-blue-400 cursor-pointer list-none w-full" onClick={() => { setSearch(opt.teamName); setShowSuggestion(false);setId(opt.id) }}>{opt.teamName}</li>
                            ) : <li className='bg-slate-300 list-none py-2'>No Result found</li>}
                </div>}
        </>
    )
}

export default SearchOption
