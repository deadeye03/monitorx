"use client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { EscalationPolicy } from '@/types/type'
import React, { useCallback, useEffect, useState } from 'react'

function RoutingRules({ allEscalation }: { allEscalation: EscalationPolicy[] }) {
    const [escalationId, setEscalationId] = useState(allEscalation[0]?.id||'');
    const [escalationPolicy,setEscalationPolicy]=useState();
    useEffect(() => {
        
      }, [allEscalation,escalationId])
           
    return (
        <Select value={escalationId} onValueChange={setEscalationId} >
            <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Select escalation" />
            </SelectTrigger>
            <SelectContent>
                <div className='px-2 text-slate-500'>ESCALATION(S) </div>
                {allEscalation.map((escalation) =>
                    <SelectItem key={escalation.id} value={escalation.id}>{escalation.escalationplicy_name}</SelectItem>
                )}
            </SelectContent>
        </Select>
    )
}

export default RoutingRules
