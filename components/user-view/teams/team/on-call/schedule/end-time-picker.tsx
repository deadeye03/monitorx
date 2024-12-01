"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function EndDateTimePicker({setEndDate}:{setEndDate:React.Dispatch<React.SetStateAction<Date>>}) {
  const [date, setDate] = React.useState<Date>(new Date())
  const [time, setTime] = React.useState<string>("11:30")
  // Generate time options in 30-minute intervals
  const timeOptions = React.useMemo(() => {
    const times: string[] = []
    for (let i = 0; i < 24; i++) {
      times.push(`${i.toString().padStart(2, "0")}:00`)
      times.push(`${i.toString().padStart(2, "0")}:30`)
    }
    return times
  }, [])

  // Combine date and time into a single DateTime
  const getDateTime = React.useCallback(() => {
    if (!date) return null
    
    const [hours, minutes] = time.split(":").map(Number)
    const dateTime = new Date(date)
    dateTime.setHours(hours, minutes, 0, 0)
    return dateTime
  }, [date, time])

  // For demonstration purposes, log the DateTime whenever it changes
  React.useEffect(() => {
    const dateTime = getDateTime()
    if (dateTime) {
      console.log("End DateTime for database:", dateTime.toISOString())
      setEndDate(dateTime)
    }
  }, [getDateTime])

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate)
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Select value={time} onValueChange={setTime}>
          <SelectTrigger className="w-[180px]">
            <Clock className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Select time" />
          </SelectTrigger>
          <SelectContent>
            {timeOptions.map((timeOption) => (
              <SelectItem key={timeOption} value={timeOption}>
                {timeOption}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="text-[12px] text-muted-foreground">
        {date && time ? (
          <p>Selected End DateTime: {getDateTime()?.toLocaleString()}</p>
        ) : (
          <p>Please select both date and time</p>
        )}
      </div>
    </div>
  )
}

