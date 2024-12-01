'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Particles from 'react-particles'
import type { Engine } from "tsparticles-engine"
import { loadSlim } from "tsparticles-slim"
import Countdown from 'react-countdown'
import { contactUs } from '@/action/user'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Label } from './label'
import { Input } from './input'
import { Button } from './button'

export default function ModernComingSoon() {


    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine)
    }, [])

    const [email, setEmail] = useState('')
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [phoneNumber, setPhoneNumber] = useState('')
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);

        // Regular expression for basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(emailValue));
    };
    const submitContact = async () => {

        const createContact = await contactUs(name, email, phoneNumber)
        if (createContact) {
            toast.success('Thankyou For Choosing Monitorx')
        }
        else {
            toast.error('Something went wrong please try again...')
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen} >
                <DialogContent className="sm:max-w-[710px] p-6 top-4 translate-y-0 translate-x-[-50%] overflow-y-scroll">
                    <DialogHeader className='border-b '>
                        <DialogTitle className="">Contact Us</DialogTitle>
                    </DialogHeader>
                    <form >
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
                            <motion.form

                                className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5 }}
                            >
                                <Button type='submit' className='bg-blue-500 text-white disabled:bg-white disabled:text-black' disabled={phoneNumber.length !== 10 || !isEmailValid || !email} onClick={() => submitContact()} >Contact Us</Button>
                            </motion.form>
                        </div>

                    </form>
                </DialogContent>
            </Dialog>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-white overflow-hidden">
                <Particles
                    id="tsparticles"
                    init={particlesInit}
                    options={{
                        background: {
                            color: {
                                value: "transparent",
                            },
                        },
                        fpsLimit: 120,
                        interactivity: {
                            events: {
                                onClick: {
                                    enable: true,
                                    mode: "push",
                                },
                                onHover: {
                                    enable: true,
                                    mode: "repulse",
                                },
                                resize: true,
                            },
                            modes: {
                                push: {
                                    quantity: 4,
                                },
                                repulse: {
                                    distance: 200,
                                    duration: 0.4,
                                },
                            },
                        },
                        particles: {
                            color: {
                                value: "#ffffff",
                            },
                            links: {
                                color: "#ffffff",
                                distance: 150,
                                enable: true,
                                opacity: 0.5,
                                width: 1,
                            },
                            move: {
                                direction: "none",
                                enable: true,
                                outModes: {
                                    default: "bounce",
                                },
                                random: false,
                                speed: 1,
                                straight: false,
                            },
                            number: {
                                density: {
                                    enable: true,
                                    area: 800,
                                },
                                value: 80,
                            },
                            opacity: {
                                value: 0.5,
                            },
                            shape: {
                                type: "circle",
                            },
                            size: {
                                value: { min: 1, max: 5 },
                            },
                        },
                        detectRetina: true,
                    }}
                />
                <div className="relative  w-full max-w-4xl px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        <h1 className="text-6xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
                            Coming Soon
                        </h1>
                        <p className="text-xl mb-12 text-gray-300">
                            We're crafting something extraordinary. Stay tuned!
                        </p>
                        <Countdown
                            date={Date.now() + 30 * 24 * 60 * 60 * 1000}
                            renderer={({ days, hours, minutes, seconds, completed }) => (
                                <div className="flex justify-center space-x-4 mb-12">
                                    {[
                                        { label: 'Days', value: days },
                                        { label: 'Hours', value: hours },
                                        { label: 'Minutes', value: minutes },
                                        { label: 'Seconds', value: seconds },
                                    ].map((item) => (
                                        <motion.div
                                            key={item.label}
                                            className="text-center"
                                            initial={{ y: 50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <div className="text-4xl font-bold bg-white bg-opacity-10 rounded-lg p-4 w-24 backdrop-blur-sm">
                                                {item.value.toString().padStart(2, '0')}
                                            </div>
                                            <div className="mt-2 text-sm text-gray-300">{item.label}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        />
                        {/* <motion.form
                            
                            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        > */}

                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto"
                            onClick={() => setOpen(true)} >
                            Notify Me
                        </button>
                        {/* </motion.form> */}
                    </motion.div>
                    <motion.div
                        className="mt-12 flex justify-center space-x-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="text-gray-300 hover:text-white transition-colors"
                                aria-label={`Follow us on ${social}`}
                            >
                                {social}
                            </a>
                        ))}
                    </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 text-sm text-gray-400">
                    © 2023 MonitorX All rights reserved.
                </div>
            </div>
        </>
    )
}

