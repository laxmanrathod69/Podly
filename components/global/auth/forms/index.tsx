"use client"

import Image from "next/image"
import { SignInForm } from "./sign-in"
import { SignUpForm } from "./sign-up"
import { Separator } from "@/components/ui/separator"
import { GoogleAuthButton } from "../../google-oauth-button"
import Link from "next/link"
import { memo, useMemo } from "react"

interface Props {
  type: "signIn" | "signUp"
}

const AuthForm = memo(({ type }: Props) => {
  const isSignIn = useMemo(() => type === "signIn", [type])

  return (
    <div className="flex flex-col rounded-2xl px-9 py-8 w-[25rem] min-h-[30rem] h-auto bg-black-1">
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/icons/brand-logo.svg"
          alt="logo"
          width={100}
          height={100}
        />
        <div className="flex flex-col gap-1 items-center text-white-1">
          <h3 className="text-[1.1rem] font-bold text-[#E8E6E3]">
            {isSignIn ? "Sign in to Podly" : "Create your account"}
          </h3>
          <p className="text-[13px] text-[#E8E6E3A6]">
            {isSignIn
              ? "Welcome back! Please sign in to continue"
              : "Welcome! Please fill in the details to get started."}
          </p>
        </div>
      </div>
      <div id="clerk-captcha" className="mb-5"></div>

      {isSignIn ? <SignInForm /> : <SignUpForm />}
      <div className="my-7 w-full relative">
        <div className="bg-black-1 p-3 absolute text-white-4 text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          or continue with
        </div>
        <Separator orientation="horizontal" className="bg-gray-1" />
      </div>
      <GoogleAuthButton method={isSignIn ? "signin" : "signup"} />
      <p className="text-[#E8E6E3A6] text-[13px] text-center mt-5">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}
        <span className="text-orange-1 hover:underline cursor-pointer">
          <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
            {isSignIn ? " Sign Up" : " Sign In"}
          </Link>
        </span>
      </p>
    </div>
  )
})

AuthForm.displayName = "AuthForm"

export default AuthForm
