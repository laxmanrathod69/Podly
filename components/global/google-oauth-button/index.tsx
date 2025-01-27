"use client"

import { Button } from "@/components/ui/button"
import { Loader } from "../loader"
import { useGoogleAuth } from "@/hooks/auth"
import Image from "next/image"

interface GoogleAuthButtonProps {
  method: "signin" | "signup"
}

export const GoogleAuthButton = ({ method }: GoogleAuthButtonProps) => {
  const { signUpWith, signInWith } = useGoogleAuth()

  return (
    <Button
      {...(method === "signin"
        ? { onClick: () => signInWith("oauth_google") }
        : { onClick: () => signUpWith("oauth_google") })}
      className="w-full rounded-2xl flex gap-2 border-black-2 hover:bg-black-2 transition-all ease-in-out duration-200 h-9 font-medium text-xs text-white-2"
      variant="outline"
    >
      <Loader loading={false}>
        <Image src="/icons/google.svg" alt="google" width={20} height={20} />
        {method === "signin" ? "Sign in" : "Sign up"} with Google
      </Loader>
    </Button>
  )
}
