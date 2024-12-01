"use client"
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
function SettingMenubar({param}:{param:string}) {
  const path=usePathname().split('/').pop();
//   console.log('param in setting',param)
  return (
    <div className="border-r p-4 space-y-4">
                    <div className="font-semibold text-sm text-muted-foreground">ATLASSIAN ADMIN</div>
                    <div className="space-y-2">
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                            User management
                        </Link>
                    </div>

                    <div className="font-semibold text-sm text-muted-foreground mt-6">MY PROFILE</div>
                    <div className="space-y-2">
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                            Profile
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                            Profile settings
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                            Notifications
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                            Forwarding rules
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            <ExternalLink className="h-4 w-4" />
                            Your on-call schedule
                        </Link>
                    </div>

                    <div className="font-semibold text-sm text-muted-foreground mt-6">PEOPLE</div>
                    <div className="space-y-2">
                        <Link href={`/monitorx/${param}/setting/users`} className={`flex items-center gap-2 text-sm hover:bg-slate-300 rounded-sm ${path==='users'?'bg-gray-200 text-blue-500':''}`}>
                            Users
                        </Link>
                        <Link href="#" className="flex items-center gap-2 text-sm hover:text-primary">
                            Roles
                        </Link>
                    </div>
                </div>
  )
}

export default SettingMenubar
