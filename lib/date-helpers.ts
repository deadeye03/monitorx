import { ViewType } from "@/types/type"

export function calculateBlockPosition(
  startTime: Date,
  endTime: Date,
  viewType: ViewType,
  containerWidth: number
): { left: number; width: number } {
  const totalMinutes = 24 * 60 // minutes in a day
  const startMinutes = startTime.getHours() * 60 + startTime.getMinutes()
  const endMinutes = endTime.getHours() * 60 + endTime.getMinutes()
  
  if (viewType === "1 Day") {
    const left = (startMinutes / totalMinutes) * containerWidth
    // const width = ((endMinutes - startMinutes) / totalMinutes) * containerWidth
    const width=600
    return { left, width }
  }
  
  // For week and month views, calculate based on days
  const msPerDay = 24 * 60 * 60 * 1000
  const viewStart = startTime
  const daysDiff = Math.floor((startTime.getTime() - viewStart.getTime()) / msPerDay)
  const duration = Math.ceil((endTime.getTime() - startTime.getTime()) / msPerDay)
  
  const daysInView = viewType === "1 Week" ? 7 : viewType === "2 Weeks" ? 14 : 30
  const dayWidth = containerWidth / daysInView
  
  return {
    left: daysDiff * dayWidth,
    width: duration * dayWidth
  }
}

