"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { EscalationPolicy, Schedule } from "@/types/type"
import { ChevronDown, MoreHorizontal, Clock, Users } from "lucide-react"
import Link from "next/link"
import RoutingRules from "./Routing-rules"
import EscalationPolicies from "./escalation/Escalation_policies"
import { useState } from "react"
import AddEscalation from "./escalation/Add-Escalation"
import ScheduleViewer from "./schedule/schedule-viewer"
import Addrotation from "./schedule/Add-rotation"
import AllSchedule from "./schedule/All-ScheduleView"
import AddSchedule from "./schedule/Add-schedule"

export default function OnCall({ param, allEscalation, teamName, teamId, allSchedule }: { param: string, allEscalation: EscalationPolicy[], teamName: string | null, teamId: string, allSchedule: Schedule[] }) {
  const [open, setOpen] = useState(false)
  const [openSchedule,setOpenSchedule]=useState(false);
  return (
    <>
      {open && <AddEscalation open={open} setOpen={setOpen} teamId={teamId} />}
      {openSchedule && <AddSchedule setIsForm={setOpenSchedule} teamId={teamId}/>}
      {/* {openAddRotation && <Addrotation openAddRotation={openAddRotation} setOpenAddRotation={setOpenAddRotation} teamId={teamId} />} */}
      <div className="container mx-auto p-3 ">
        <nav className="text-sm text-muted-foreground mb-4 flex">
          <Link href={`/monitorx/${param}/teams`} className="hover:text-blue-500">Teams / </Link>
          {teamName}
        </nav>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">On-call</h1>
          <Button variant="outline">Save view</Button>
        </div>

        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Routing rules</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline">Add routing rule</Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Route alerts to</span>
            <RoutingRules allEscalation={allEscalation} />
          </div>
        </section>

        {/*  Escalation policies */}
        <section className="mb-8 border-b-2 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Escalation policies</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setOpen(true)} >Add escalation</Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>
          <EscalationPolicies allEscalation={allEscalation} teamName={teamName} />
        </section>

        {/* schedule viewer */}
        <section className="pb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">On-call Schedules</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={() => setOpenSchedule(true)} >Add Schedule</Button>
              <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
          </div>
          {/* <ScheduleViewer openAddRotation={openAddRotation} setOpenAddRotation={setOpenAddRotation} /> */}
          <AllSchedule allSchedule={allSchedule} teamId={teamId} />
        </section>
      </div>
    </>
  )
}