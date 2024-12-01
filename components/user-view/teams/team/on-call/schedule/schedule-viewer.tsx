"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import Addrotation from "./Add-rotation"
import { RotationBlock } from "./Rotation-block"
import { calculateBlockPosition } from "@/lib/date-helpers"
import type { Rotation, RotationBlock as RotationBlockType, ViewType } from "@/types/type"

interface ScheduleViewerProps {
    scheduleId: string
    teamId: string
    rotations: Rotation[]
}

export default function ScheduleViewer({ scheduleId, teamId, rotations }: ScheduleViewerProps) {
    const [currentView, setCurrentView] = useState<ViewType>("1 Day")
    const [currentDate, setCurrentDate] = useState(new Date())
    const [openAddRotation, setOpenAddRotation] = useState(false)
    const [currentHour, setCurrentHour] = useState(new Date().getHours())
    const [rotationBlocks, setRotationBlocks] = useState<RotationBlockType[]>([])
    const timelineRef = useRef<HTMLDivElement>(null)
    const [containerWidth, setContainerWidth] = useState(0)

    const viewOptions: ViewType[] = ["1 Day", "1 Week", "2 Weeks", "1 Month"]

    useEffect(() => {
        const blocks = rotations.map(rotation => ({
            id: rotation.id,
            name: rotation.name,
            startTime: new Date(rotation.starts_on),
            endTime: new Date(rotation.ends_on),
            userId: rotation.userId,
            userName:rotation.user.name
        }))
        setRotationBlocks(blocks)
    }, [rotations])

    useEffect(() => {
        if (timelineRef.current) {
            setContainerWidth(timelineRef.current.offsetWidth)
        }
    }, [timelineRef.current])

    const formatDateRange = () => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })

        if (currentView === "1 Day") {
            return formatter.format(currentDate)
        } else if (currentView === "1 Month") {
            return new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate)
        } else {
            const endDate = new Date(currentDate)
            endDate.setDate(endDate.getDate() + (currentView === "1 Week" ? 6 : 13))
            return `${formatter.format(currentDate)} - ${formatter.format(endDate)}`
        }
    }

    const renderTimeSlots = () => {
        if (currentView === "1 Day") {
            return (
                <div className="rela w-full flex">
                    <div className="w-[15%] border-r"></div>
                    <div className="w-full text-sm text-muted-foreground flex">
                        {Array.from({ length: 24 }, (_, i) => (
                            <div key={i} className={`flex-1 ${(i === 6 || i === 12 || i === 18) ? 'border-l border-dashed' : (currentHour === i) ? 'border-r-4 border-red-600' : ''}`}>
                                {`${i === 0 ? '12' : i === 6 ? '6' : i === 12 ? '12' : i === 18 ? '6' : ' '}${i === 0 ? 'AM' : i === 6 ? 'AM' : i === 12 ? 'PM' : i === 18 ? 'PM' : ' '}`}
                            </div>
                        ))}
                    </div>
                </div>
            )
        }

        const daysToShow = currentView === "1 Week" ? 7 : currentView === "2 Weeks" ? 14 : 30
        const days = Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date(currentDate)
            date.setDate(date.getDate() + i)
            return date
        })

        return (
            <div className="w-full flex ">
                <div className="w-[15%] border-r"></div>
                <div className='w-full flex'>
                    {days.map((date, i) => (
                        <div key={i} className="bg-background flex flex-1 border-r border-dashed">
                            <div className="text-[11px] font-normal">
                                {(currentView === "1 Week" || currentView === "2 Weeks")
                                    ? new Intl.DateTimeFormat('en-US', { month: 'numeric', day: 'numeric', weekday: 'short' }).format(date)
                                    : new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date)}
                            </div>
                            {date.toDateString() === new Date().toDateString() && <div className="h-full w-[1px] bg-red-600"></div>}
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    const renderRotationBlocks = () => {
        console.log('container width is ',containerWidth)
        return rotationBlocks.map(block => (
            <RotationBlock
                key={block.id}
                rotation={block}
                viewType={currentView}
                containerWidth={containerWidth}
            />
        ))
    }

    return (
        <Card className="border-0">
            {openAddRotation && <Addrotation openAddRotation={openAddRotation} setOpenAddRotation={setOpenAddRotation} teamId={teamId} scheduleId={scheduleId} />}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            const newDate = new Date(currentDate)
                            const daysToShow = currentView === '1 Day' ? 1 : currentView === '1 Week' ? 7 : currentView === '2 Weeks' ? 14 : 30
                            newDate.setDate(newDate.getDate() - daysToShow)
                            setCurrentDate(newDate)
                        }}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                            const newDate = new Date(currentDate)
                            const daysToShow = currentView === '1 Day' ? 1 : currentView === '1 Week' ? 7 : currentView === '2 Weeks' ? 14 : 30
                            newDate.setDate(newDate.getDate() + daysToShow)
                            setCurrentDate(newDate)
                        }}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold">{formatDateRange()}</h2>
                </div>
                <div className="flex items-center gap-2">
                    {viewOptions.map((view) => (
                        <Button
                            key={view}
                            variant={currentView === view ? "secondary" : "ghost"}
                            onClick={() => setCurrentView(view)}
                        >
                            {view}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="">
                <div className="">
                    <div className="flex items-center justify-between bg-[#DEEBFF]">
                        <h3 className="pl-2 font-semibold">Rotations</h3>
                        <Button
                            variant="outline"
                            className="text-sm p-1 bg-transparent text-blue-500 hover:bg-transparent"
                            onClick={() => setOpenAddRotation(true)}
                        >
                            + Add rotation
                        </Button>
                    </div>
                    <div className="flex flex-col w-full min-h-24" ref={timelineRef}>
                        <div className=" " >
                            {renderTimeSlots()}
                        </div>
                        <div className="">
                            
                            {renderRotationBlocks()}
                        </div>

                    </div>
                </div>

                <div className=" min-h-24">
                    <div className="flex items-center justify-between bg-[#DEEBFF]">
                        <h3 className="pl-2 font-semibold">Overrides</h3>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" className="bg-transparent text-blue-500 hover:bg-transparent">Take on-call for an hour</Button>
                            <Button variant="outline" className="bg-transparent text-blue-500 hover:bg-transparent">+ Add override</Button>
                        </div>
                    </div>
                    {renderTimeSlots()}
                </div>

                <div className="">
                    <h3 className="text-lg font-semibold bg-[#DEEBFF] pl-2">Final schedule</h3>
                    {renderTimeSlots()}
                </div>
            </div>
        </Card>
    )
}

