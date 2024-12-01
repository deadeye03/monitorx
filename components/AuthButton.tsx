import { signOutAction } from "@/action/authAction"; 

import Link from "next/link";

import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";

export default async function AuthButton() {
  const supabase=createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log('supabaseeeeeei s',supabase)
  // console.log('user is ', await supabase.auth.getUser());
  return user ? (
    <div className="flex items-center gap-4">
      {user.user_metadata?.avatar_url &&
      <Image src={user.user_metadata?.avatar_url} height={50} width={50} className="rounded-full h-8 w-8 object-cover" alt="user-image " /> } 
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}  data-prevent-nprogress={true}>
          Sign out
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"} data-disable-nprogress={false}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"} className="text-prime-1 bg-[#86a8d7] px-4 py-2 hover:bg-[#2c5082] font-bold  rounded-lg hover:text-black hidden md:block">
        <Link href="/sign-up"  data-disable-nprogress={false}>Start Free Trial</Link>
        
      </Button>
      <Button asChild size="sm" variant={"default"} className="text-prime-1 bg-[#86a8d7] px-4 py-2 hover:bg-[#2c5082] font-bold  rounded-lg hover:text-black md:hidden">
        <Link href="/sign-up"  data-disable-nprogress={false}>Free Trial</Link>
        
      </Button>
    </div>
  );
}
