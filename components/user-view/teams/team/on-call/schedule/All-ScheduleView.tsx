"use client"

import { Card, CardContent } from '@/components/ui/card'
import { Schedule } from '@/types/type'
import { ArrowDownUp, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import React, { useState } from 'react'
import Addrotation from './Add-rotation'
import ScheduleViewer from './schedule-viewer'

function AllSchedule({ allSchedule, teamId }: { allSchedule: Schedule[], teamId: string }) {
    // const [openAddRotation, setOpenAddRotation] = useState(false)
    const [expandedCards, setExpandedCards] = useState<string[]>(() =>
        allSchedule.length > 0 ? [allSchedule[0].id] : []
    )

    const toggleCard = (id: string) => {
        setExpandedCards(prev =>
            prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
        )
    }

    return (
        <>
            <div className="space-y-4">
                {allSchedule.map((schedule) => (
                    <Card key={schedule.id}>
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleCard(schedule.id)}>
                                <div className="flex items-center space-x-2">
                                    <ArrowDownUp className="h-4 w-4" />
                                    <span className="font-medium">{schedule.name}</span>
                                </div>
                                <button
                                    className="flex items-center space-x-2"
                                >
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    {expandedCards.includes(schedule.id) ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {expandedCards.includes(schedule.id) && (
                           
                            <ScheduleViewer rotations={schedule.team_schedule_rotation} scheduleId={schedule.id} teamId={teamId} />
                        )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default AllSchedule

