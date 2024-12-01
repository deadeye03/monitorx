'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import toast from 'react-hot-toast'
import { getUserId, updateNumber } from '@/action/user'
import { useRouter } from 'next/navigation'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { sendOtp, verifyOtp } from '@/action/otpVerification'

export default function OTPVerification({ number,setIsOtp }: { number: string,setIsOtp:React.Dispatch<React.SetStateAction<boolean>> }) {
    const router = useRouter();
    const [otp, setOtp] = useState(['', '', '', '', '', ''])
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [isVerifying, setIsVerifying] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [countdown, setCountdown] = useState(30)
    const [canResend, setCanResend] = useState(false)

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1)
            }, 1000)
        }

        if (countdown === 0) {
            setCanResend(true)
        }

        return () => {
            if (timer) clearInterval(timer)
        }
    }, [countdown])

    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value !== '' && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handleVerify = async () => {
        setIsVerifying(true)
        // Simulating API call
        const enteredOtp = otp.join('')
        const response = await verifyOtp();
        if (!response.success) {
            toast.error(response.message)
            setIsVerifying(false);
            return;
        }
        else {
            if (enteredOtp === response.message) {
                setIsVerified(true)
                const updateUser = await updateNumber(number)
                if (!updateUser) {
                    router.push('/monitorx/verify')
                    setIsVerifying(false)
                }
                router.push('/monitorx')
                toast.success('Otp Successfully verfied');
            } else {
                setIsVerified(false)
                toast.error('Invalid OTP. Please try again.')
            }

        }
        setIsVerifying(false)

    }

    const handleResendOTP = async () => {
        setIsLoading(true);
        const response = await sendOtp(number, true);
        if (response.success) {
            toast.success(`Otp Resend on your ${number} Phone number`)
        }
        else {
            toast.error(response.message)
        }
        setIsLoading(false)
    }
    return (
        <>
            {isLoading && <LoadingScreen />}
            <div className="min-h-screen w-[100vw] z-30 fixed top-0 left-0 bg-gradient-to-b from-gray-200 to-gray-100 text-white flex flex-col items-center justify-center p-4">
                {isVerifying && <LoadingScreen />}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">

                        <h2 className="text-xl font-semibold mb-4">Enter Verification Code</h2>

                        <p className="text-sm ">We've sent a 6-digit code to {number} . Enter it below to verify your number.</p>
                        <p className='text-red-500 mb-6'>valid for only 10 minutes</p>

                        <div className="flex justify-between mb-2">
                            {otp.map((digit, index) => (
                                <Input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(el) => inputRefs.current[index] = el}
                                    className="w-12 h-12 text-center text-lg font-bold bg-gray-700 border-gray-600 focus:border-blue-500"
                                />
                            ))}
                        </div>
                        <div className="flex text-sm gap-3 justify-between mb-6">
                            <button 
                            onClick={()=>setIsOtp(false)}
                            className='text-blue-500 hover:text-blue-700 cursor-pointer'>
                            Changed phone number?</button>
                            <div>
                                <p>{countdown > 0 ? `${countdown}s` : ''}</p>
                                <button
                                    type="button"
                                    onClick={() => handleResendOTP()}
                                    disabled={!canResend}
                                    className={`font-bold ${canResend ? 'text-blue-500 hover:text-blue-700 cursor-pointer' : 'text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Resend OTP
                                </button>
                            </div>

                        </div>
                        <Button
                            onClick={handleVerify}
                            disabled={otp.some(digit => digit === '') || isVerifying}
                            className="w-full bg-blue-500 hover:bg-blue-600"
                        >
                            {isVerifying ? 'Verifying...' : 'Verify OTP'}
                        </Button>

                        {isVerified && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center mt-4 text-green-400"
                            >
                                <Check className="w-5 h-5 mr-2" />
                                <span>OTP Verified Successfully</span>
                            </motion.div>
                        )}

                        {!isVerified && otp.every(digit => digit !== '') && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center justify-center mt-4 text-red-400"
                            >


                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    )
}