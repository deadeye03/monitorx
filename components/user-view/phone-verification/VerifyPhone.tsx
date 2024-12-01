'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Lock, Phone, Shield } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import OTPVerification from './OtpVerification'
import toast from 'react-hot-toast'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { sendOtp } from '@/action/otpVerification'
import { useSearchParams,useRouter } from 'next/navigation'

export default function VerifyPhone() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [country, setCountry] = useState('IN')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isOtp, setIsOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const searchParams=useSearchParams();
  const router=useRouter();
  const query =searchParams.get('verify')
  if (query!=='sms') {
    router.push('/monitorx')
  }
  const handleOtp = async() => {
    setIsLoading(true);
    const response=await sendOtp(phoneNumber,false);
    if (response.success) {
      toast.success(`Otp sent on your ${phoneNumber} Phone number`)
      setIsOtp(true)  
    }
    else{
      toast.error(response.message)
    }
    setIsLoading(false)
  }
  if (isOtp) {
    return <OTPVerification number={phoneNumber} setIsOtp={setIsOtp} />
  }
  return (
    <>
      {isLoading && <LoadingScreen />}
      <div className="min-h-screen w-[100vw] z-30 fixed top-0 left-0 bg-gradient-to-b from-gray-200 to-gray-100 text-white flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="flex items-center justify-center mb-8">
            <Bell className="w-10 h-10 text-blue-400 mr-2" />
            <h1 className="text-2xl font-bold text-black">Monitor<span className='text-[#11d594]'>X</span> </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="bg-gray-400 rounded-lg p-6 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4">Verify your phone number</h2>

            <div className="flex items-center mb-6">
              <div className="bg-blue-500 rounded-full p-3 mr-4">
                <Phone className="w-6 h-6" />
              </div>
              <p className="text-sm">We need to verify your number for secure monitoring alerts.</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-400" />
                <p className="text-sm">Enables two-factor authentication (2FA)</p>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-blue-400" />
                <p className="text-sm">Helps prevent unauthorized access</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger className="w-[120px] text-black">
                    <SelectValue placeholder="Country" className='text-black' />
                  </SelectTrigger>
                  <SelectContent className='text-black'>
                    <SelectItem className='text-black' value="IN">India (+91)</SelectItem>
                    <SelectItem value="US">USA (+1)</SelectItem>
                    <SelectItem value="UK">UK (+44)</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="tel"
                  placeholder="Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 text-black"
                  required
                />
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-blue-500 hover:bg-blue-600" onClick={() => handleOtp()}>
                  Send code via SMS
                </Button>
                <Button variant="outline" className="flex-1 text-black">
                  Send code via call
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}