import { getUserDetails, getUserId } from "@/action/user";
import WorkspaceLogin from "@/components/ChooseWorkSpace";
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function monitorxPage() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const userId = await getUserDetails();
  if (!userId?.is_phone_number_verified) {
    return redirect(`${process.env.NEXT_PUBLIC_URL}/monitorx/verify?verify=sms`)
  }
  const existingWorkspaces = await prisma.workSpace_users.findMany({
    where: {
      userId:userId?.id,
    },
    include: {
      workspace: {
        select: {
          workspace_name: true
        }
      }
    }
  });

  // Filter out any null workspaces
  const validWorkspaces = existingWorkspaces.filter(ws => ws.workspace !== null);
   
  console.log('existing workspace ', validWorkspaces);

  return (
    <>
      <WorkspaceLogin existingWorkspaces={validWorkspaces} />
    </>
  );
}