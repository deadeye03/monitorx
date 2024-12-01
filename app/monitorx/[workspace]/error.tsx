'use client' // Error boundaries must be Client Components
 
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
  const refresh=()=>{
    location.reload()
  }
  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
      <h2 className='text-center'>Something went wrong!</h2>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => refresh()
        }
      >
        Try again
      </Button>
    </div>
  )
}