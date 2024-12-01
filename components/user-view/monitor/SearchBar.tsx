'use client'

import { Input } from "@/components/ui/input"
import SearchStatus from "@/components/ui/SearchStatus"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { startTransition, useEffect, useState, useTransition } from "react"

export default function MonitorSearch() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [status, setStatus] = useState(searchParams.get('status') || 'all')
  const q = searchParams.get('q') || ''

  useEffect(()=>{
     setStatus(searchParams.get('status') ||'all')
  },[status,searchParams])

  const handleSearch = (query: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('q', query)
    if (status) newSearchParams.set('status', status)
    router.push(`${pathname}?${newSearchParams.toString()}`, {
      scroll: false,
    })
  }

  return (
    <div className='bg-slate-300 py-3 px-2 md:px-14 md:py-8'>
      <h1 className='font-semibold text-2xl'>Monitors</h1>
      <div className='bg-[#091e42] px-2 py-1 flex rounded-md items-center mt-4'>
        <SearchStatus searching={isPending} />
        <Input 
          className='border-none bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0' 
          placeholder={`status : ${status}`}
          id="search"
          onChange={(e) => {
            startTransition(() => {
              handleSearch(e.target.value)
            })
          }}
          defaultValue={q}
          name='q' 
        />
      </div>
    </div>
  )
}