"use server"

import prisma from '@/lib/prisma'
import { Twilio } from 'twilio'
import { getUserId } from './user'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

if (!accountSid || !authToken) {
    throw new Error('Set twilio accountSid and Token');
}
const client = new Twilio(accountSid, authToken)

export const sendOtp = async (phoneNumber: string, update: boolean) => {
    if (!phoneNumber) {
        return { success: false, message: 'Phone number is required' }
    }
    try {
        // Generate a random 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString()
        const expiresAt = Date.now() + 10 * 60 * 1000
        // Send the OTP via Twilio
        const message = await client.messages.create({
            body: `Your OTP(One Time Password) for MonitorX verification is: ${otp}`,
            from: twilioPhoneNumber,
            to: `+91${phoneNumber}`
        })

        console.log(`Message sent with SID: ${message.sid}`)

        //saving otp 
        const userId = await getUserId();
        if (!userId) {
            throw new Error('Unauthenticated user please login ')
        }
        if (!update) {
            const saveOtp = await prisma.user_otp.findFirst({
                where: {
                    userId
                },
            })
            if (saveOtp) {
                await prisma.user_otp.updateMany({
                    where: {
                        userId,
                    },
                    data: {
                        otp,
                        expiresAt
                    }
                })
            }
            else {
                await prisma.user_otp.create({
                    data: {
                        userId,
                        otp,
                        expiresAt
                    },
                })
            }
            return { success: true, message: 'OTP sent successfully' }

        }
        else {
            const saveOtp = await prisma.user_otp.updateMany({
                where: {
                    userId,
                },
                data: {
                    otp,
                    expiresAt
                }
            })
            return { success: true, message: 'OTP Resend at your number' }
        }
    } catch (error) {
        console.error('Error sending OTP:', error)
        return { success: false, message: 'Failed to send OTP' }
    }
}

export const verifyOtp = async () => {
    const userId = await getUserId();
    if (!userId) {
        throw new Error('Unauthenticated user please login ')
    }
    const user = await prisma.user_otp.findFirst({
        where: {
            userId
        },
    })
    if (user) {
        if (Date.now() > user?.expiresAt) {
            return { success: false, message: 'OTP has Expired ' }
        }
        return { success: true, message: user.otp }
    }
    return { success: false, message: 'Failed to verify otp try again' }
}

export const resendOtp = async () => {

}
