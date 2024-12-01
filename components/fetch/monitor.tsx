import { getUserId } from "@/action/user";
import { createClient } from "@/utils/supabase/server";

export default async function allMointor() {
    
    const userId = await getUserId()
    console.log('id is ', await getUserId());
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getAllMonitor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId }),
      next: { revalidate: 3600 }
    });
    const response=await res.json()
    const allMonitorConfig=response.data
    console.log('monitor is ', allMonitorConfig)
    return allMonitorConfig;
}