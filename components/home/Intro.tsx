"use client"
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import Image from 'next/image'
import { Database, FileJson, FileType, Puzzle, Server, Type } from 'lucide-react'
import { contactUs } from '@/action/user'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'

function Intro() {

  const brandImg = ['/mongodb.png', '/jira.png', '/indeed.png', '/walmart.png']
  const [email, setEmail] = useState('')
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [isEmailValid,setIsEmailValid]=useState(true);
  const [phoneNumber,setPhoneNumber]=useState('')
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Regular expression for basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(emailValue));
};
  const submitContact = async () => {

    const createContact = await contactUs(name,email,phoneNumber)
    if (createContact) {
      toast.success('Thankyou For Choosing Monitorx')
    }
    else {
      toast.error('Something went wrong please try again...');
    }
    setOpen(false);
  }
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-[710px] p-6 top-4 translate-y-0 translate-x-[-50%] overflow-y-scroll">
          <DialogHeader className='border-b '>
            <DialogTitle className="">Contact Us</DialogTitle>
          </DialogHeader>
            <Label htmlFor="name" aria-required className='text-sm font-semibold text-slate-600'>Name</Label>
            <Input id='name' value={name} onChange={(e) => setName(e.target.value)} className='mb-4'></Input>

            <Label htmlFor="email" className='mt-4'>
              E-mail <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              placeholder="email@example.com"
              value={email}
              type="email"
              onChange={handleEmailChange}
              required
            />
            <p className={`text-sm ${isEmailValid ? "text-muted-foreground" : "text-red-500"}`}>
              {isEmailValid ? "You should provide a valid email." : "Please enter a valid email address."}
            </p>

            <Label htmlFor="number" className='mt-4'>
              Mobile Number <span className="text-red-500">*</span>
            </Label>
            <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 text-black"
                  required
                />

            <div className='mt-4 flex gap-4 justify-end'>
              <Button className='bg-white hover:bg-slate-300 text-gray-500' onClick={() => setOpen(false)} >Cancel</Button>
              <Button type='button' className='bg-blue-500 text-white disabled:bg-white disabled:text-black' disabled={phoneNumber.length!==10 ||!isEmailValid || !email} onClick={() => submitContact()} >Contact Us</Button>
            </div>

        </DialogContent>
      </Dialog>
      <div className="container px-6 py-4 gap-10 md:px-20 md:py-10  flex flex-col md:gap-4 h-full md:flex-row">
        {/* intro title */}
        <div className='flex-1 h-full flex flex-col gap-4'>
          <h1 className='bg-prime-1 px-4 py-2 text-[#8adb9c] rounded-lg text-sm w-max mt-8 font-roman'>
            System Components Healthcheck Assistant
          </h1>
          <h1 className='text-2xl font-extrabold
            text-text-1 font-roman md:text-[43px]  leading-tight'>
            Monitor Health of all System Components at one place.
          </h1>
          <p className='text-slate-400'>
            Choose databases, queues and other components present in architecture. A single healthcheck API to monitor them all.
          </p>
          <Button type='submit' className='bg-prime-1 text-white ' onClick={()=>setOpen(true)} >Contact us</Button>
        </div>

        {/* images feature */}
        <div className='flex-1 h-full'>
          <div className='h-full w-full flex justify-center items-center'>
            <div className='relative'>
              <div className=' p-4 rounded-full animate-spin'>
                <div className='h-[200px] w-[200px] md:h-[270px] md:w-[270px]'></div>
              </div>
              <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
                <div className='relative h-[200px] w-[200px] bg-gradient-to-r from-[#dcffca] to-[#8adb9c] rounded-full md:h-[270px] md:w-[270px]'>
                  <Image
                    src='/img/human.webp'
                    height={250}
                    width={250}
                    alt='human'
                    className='h-[265px] w-[265px] object-cover object-top absolute -top-[65px] rounded-full md:h-[335px] md:w-[335px]'
                  />
                </div>
              </div>
              {/* icons */}

              <FileJson className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1/2 text-white rounded-xl h-12 w-12 bg-yellow-500 p-2" />
              <FileType className="absolute bottom-1/4 right-0 translate-x-1/2 translate-y-1/2 text-white rounded-xl h-12 w-12 bg-blue-600 p-2" />
              <Puzzle className="absolute bottom-1/4 left-0 -translate-x-1/2 -translate-y-1/2 text-white rounded-xl h-12 w-12 bg-blue-600 p-2" />
              <Database className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-white rounded-xl h-12 w-12 bg-green-600 p-2" />
              <Server className="absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 text-white rounded-xl h-12 w-12 bg-purple-600 p-2" />
            </div>
          </div>
        </div>

      </div>
      {/* our partners */}
      {/* <div>
          <h1 className='text-center text-gray-500 mt-10 md:mt-0 '>TRUESTED BY <span className='text-[#11d594] underline'>1514K</span> LEADING COMPANIES</h1>
          <div className='flex gap-5 md:gap-x-10 justify-center items-center'>
            {brandImg.map((img)=>
            <div key={img} className='relative h-16 w-40 flex justify-center items-center px-2 '>
              <Image src={`/img${img}`} height={200} width={200} className='h-full object-contain' alt='img'/>
            </div>
            )}
          </div>
        </div> */}
    </div>
  )
}

export default Intro
