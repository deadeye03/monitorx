"use client"

import { Card, CardContent } from '@/components/ui/card'
import { EscalationPolicy } from '@/types/type'
import { ArrowDownUp, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import React, { useState } from 'react'

function EscalationPolicies({ allEscalation, teamName }: { allEscalation: EscalationPolicy[], teamName: string | null }) {
    const [expandedCards, setExpandedCards] = useState<string[]>(() => 
        allEscalation.length > 0 ? [allEscalation[0].id] : []
    )

    const toggleCard = (id: string) => {
        setExpandedCards(prev =>
            prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
        )
    }

    return (
        <div className="space-y-4">
            {allEscalation.map((escalation) => (
                <Card key={escalation.id}>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleCard(escalation.id)}>
                            <div className="flex items-center space-x-2">
                                <ArrowDownUp className="h-4 w-4" />
                                <span className="font-medium">{escalation.escalationplicy_name}</span>
                            </div>
                            <button
                                className="flex items-center space-x-2"
                            >
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {expandedCards.includes(escalation.id) ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                        {expandedCards.includes(escalation.id) && (
                            <div className="mt-4 space-y-4">
                                {escalation.escalation_policy_rules.map((rules) => (
                                    <div className="flex items-start space-x-4" key={rules.id}>
                                        <Clock className="h-5 w-5 mt-1 text-muted-foreground" />
                                        <div>
                                            <div className="text-sm font-medium">{rules.minutes_after_creation} m</div>
                                            <div className="text-sm text-muted-foreground">
                                                {rules.notification_type === 'user' ? (
                                                   <>notify  <span className="font-bold text-black">{rules.user?.name?rules.user.name:'Users'}</span></>
                                                ) : rules.notification_type === 'on_call' ? (
                                                    <>on-call users of schedule <span className="font-bold text-black">{rules.notification_type}</span> </>
                                                ) : rules.notification_type === 'team' ? (
                                                    <>Route to team <span className="font-bold text-black">{rules.team?.teamName}</span></>
                                                ) : rules.notification_type === 'members' ? (
                                                    <>notify All members of <span className="font-bold text-black">{rules.team?.teamName}</span></>
                                                ) : rules.notification_type === 'admin' ? (
                                                    <>notify admins of  <span className="font-bold text-black">{rules.team?.teamName}</span></>
                                                ) : (
                                                    <>notify all Users of <span className="font-bold text-black">{rules.team?.teamName}</span></>
                                                )}, if not acknowledged
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default EscalationPolicies

