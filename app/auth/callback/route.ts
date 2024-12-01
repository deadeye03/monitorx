
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirect_to")?.toString();

  if (code) {
    
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  if (redirectTo) {
    console.log('redirected to ',redirectTo)
    return NextResponse.redirect(`${origin}${redirectTo}`);
  }
  
  const {
    data: { user },
  } = await createClient().auth.getUser();
  const userInDb= await prisma.user.findFirst({
    where:{
      email:user?.email
    }
  })
  if (!userInDb) {
   const account= await prisma.user.create({
    data:{
      supaId:user?.id||"",
      name:user?.user_metadata.full_name,
      email:user?.email||"",
      photo:user?.user_metadata.picture,
      number:user?.phone
    }
   })
    console.log('account is ',account)

    const isInvitedUser=await prisma.invited_users.findFirst({
      where:{
        invited_user_email_id:account.email,
        status:'unverified'
      }
    })
    console.log('invited user is ',isInvitedUser)
    if (isInvitedUser) {
      const updatedStatus=await prisma.invited_users.update({
        where:{
          id:isInvitedUser.id
        },
        data:{
          status:'verified'
        }
      })
      
      const createWorkspace_user=await prisma.workSpace_users.create({
        data:{
          userId:account.id,
          workspaceId:isInvitedUser.workspaceId,
          role:isInvitedUser.role
        }
      })
      console.log('created workspace for invited user is ',createWorkspace_user)
    }
    if (!account.is_phone_number_verified) {
      
    }
  }
  else{
    if (!userInDb.is_phone_number_verified) {
      return NextResponse.redirect(`${origin}/monitorx/verify?verify=sms`);
    }
    // URL to redirect to after sign up process completes
  }
  return NextResponse.redirect(`${origin}/monitorx`);
}
