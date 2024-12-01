import { getUserId } from '@/action/user'
import PhoneVerification from '@/components/user-view/phone-verification/VerifyPhone'
import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server'
import React from 'react'

async function page() {
//  const userId= await getUserId();
//  const user=await prisma.find
  return (
    <div>
      <PhoneVerification/>
    </div>
  )
}

export default page
