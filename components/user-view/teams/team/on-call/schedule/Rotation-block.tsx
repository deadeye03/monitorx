"use client"
import { RotationBlock as RotationBlockType, ViewType } from "@/types/type"
import { calculateBlockPosition } from "@/lib/date-helpers"
import { Pencil, X } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteRotation } from "@/action/schedule"
import toast from "react-hot-toast"

interface RotationBlockProps {
  rotation: RotationBlockType
  viewType: ViewType
  containerWidth: number
}

export function RotationBlock({ rotation, viewType, containerWidth }: RotationBlockProps) {
  const { left, width } = calculateBlockPosition(
    rotation.startTime,
    rotation.endTime,
    viewType,
    containerWidth
  )
  const [rotationId, setRotationId] = useState<string | null>(null)
  const [rotationName, setRotationName] = useState('')
  const [open, setOpen] = useState(false)
  const handleClick = (id: string, name: string) => {
    if (rotationId === id) {
      setRotationId(null)
    }
    else {
      setRotationId(id)
      setRotationName(name);
    }
  }
  const handleDelete = async () => {
    console.log('this is handle Delete',rotationId)
    if (rotationId) {
      const del = await deleteRotation(rotationId);
      if (del.success) {
        toast.success(del.message)
      }
      else {
        toast.error(del.message)
      }
      setRotationId(null);
      setOpen(false);
      return;
    }
    setRotationId(null);
    setOpen(false);
  }
  //   console.log('width is ',width,left)
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-[710px] p-6 top-4 translate-y-0 translate-x-[-50%] overflow-y-scroll">
          <DialogHeader className='border-b '>
            <DialogTitle className="text-xl">Delete Rotation</DialogTitle>
          </DialogHeader>
          <h1 className="text-center font-semibold">Deleting a rotation cannot be undone. Are you sure you want to delete rotation {rotationName}?</h1>
          <div className='mt-4 flex gap-4 justify-end'>
            <Button className='bg-white hover:bg-slate-300 text-gray-500' onClick={() => setOpen(false)} >Cancel</Button>
            <Button type='submit' className='bg-blue-500 text-white' onClick={() => handleDelete()} >Delete Rotation</Button>

          </div>
        </DialogContent>
      </Dialog>
      <div className="relative flex border-t border-b border-dashed py-1">
        <div className="relative w-[13%] flex items-center gap-2 border-r border-dashed text-sm text-blue-500 cursor-pointer" onClick={() => handleClick(rotation.id, rotation.name)} >
          {rotation.name}
          {rotation.id !== rotationId ? <Pencil className="h-3 w-3 text-black" /> : <X className="h-4 w-4 text-red-500" />}


        </div>
          {rotation.id === rotationId &&
            <div className="absolute bg-white border shadow-md rounded-md left-28  w-40 z-10">
              <ul className="text-black font-medium flex flex-col cursor-pointer">
                <li className="py-2 px-2 hover:bg-slate-300">Edit Rotation</li>
                <li className="py-2 px-2 hover:bg-slate-300" onClick={() => setOpen(true)}>Delete Rotaiton</li>
              </ul>
            </div>}
        <div
          className=" h-8 bg-indigo-600 text-white text-sm rounded px-2 flex items-center"
          style={{
            width: `${width}px`,
            minWidth: '20px',
            marginLeft: `${left}px`
          }}
          title={`${rotation.name}: ${rotation.startTime.toLocaleString()} - ${rotation.endTime.toLocaleString()}`}
        >
          {width > 50 && rotation.userName}
        </div>
      </div>
    </>
  )
}

