"use client"
import { logInWithGoogle,signInAction } from "@/action/authAction";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { Provider } from "@supabase/supabase-js";
import Link from "next/link";

export default function Login({ searchParams }: { searchParams: Message }) {
  const handleLogin=(provider:Provider)=>{
    logInWithGoogle(provider)
  }
  
  return (
    <div className="flex flex-col gap-5 items-center p-8 w-max mx-auto mt-10 justify-center border shadow-lg rounded-lg  ">
      <button onClick={()=>handleLogin('google')}><FcGoogle className="h-6 w-6"/>  </button>
      <form className="flex-1 flex flex-col min-w-64">
        <h1 className="text-2xl font-medium">Sign in</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link className="text-foreground font-medium underline" href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              className="text-xs text-foreground underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            required
          />
          <SubmitButton pendingText="Signing In..." formAction={signInAction}>
            Sign in
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </div>
  );
}
