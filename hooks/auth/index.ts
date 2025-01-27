"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useSignIn, useSignUp } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { OAuthStrategy } from "@clerk/types"
import { useState } from "react"
import { onSignUpUser } from "@/actions/auth.actions"
import { SignInSchema } from "@/components/global/auth/forms/sign-in/schema"
import { SignUpSchema } from "@/components/global/auth/forms/sign-up/schema"

export const useAuthSignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn()
  const router = useRouter()

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    mode: "onBlur",
  })

  const onClerkAuth = async (email: string, password: string) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! something went wrong",
      })

    try {
      const authenticated = await signIn.create({
        identifier: email,
        password,
      })

      if (authenticated.status === "complete") {
        reset()
        await setActive({ session: authenticated.createdSessionId })
        toast("Success", {
          description: "Welcome back!",
        })
        router.push("/callback/sign-in")
      }
    } catch (error: any) {
      if (error.errors[0].code === "form_password_incorrect")
        toast("Error", {
          description: "Incorrect email or password, try again.",
        })
    }
  }

  const { mutate: InitiateLoginFlow, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      onClerkAuth(email, password),
  })

  const onAuthenticateUser = handleSubmit(async (values) => {
    InitiateLoginFlow({ email: values.email, password: values.password })
  })

  return {
    onAuthenticateUser,
    isPending,
    register,
    errors,
  }
}

export const useAuthSignUp = () => {
  const { setActive, isLoaded, signUp } = useSignUp()
  const [creating, setCreating] = useState<boolean>(false)
  const [verifying, setVerifying] = useState<boolean>(false)
  const [code, setCode] = useState<string>("")

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
  } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    mode: "onBlur",
  })

  const router = useRouter()

  const onGenerateCode = async (email: string, password: string) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! something went wrong",
      })
    try {
      if (email && password) {
        await signUp.create({
          emailAddress: getValues("email"),
          password: getValues("password"),
        })

        await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        setVerifying(true)
      } else {
        return toast("Error", {
          description: "No fields must be empty",
        })
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2))
      toast("Error", { description: "Incorrect email or password, try again." })
    }
  }

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    if (!isLoaded)
      return toast("Error", {
        description: "Oops! something went wrong",
      })

    try {
      setCreating(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status !== "complete") {
        return toast("Error", {
          description: "Oops! something went wrong, status in complete",
        })
      }

      if (completeSignUp.status === "complete") {
        if (!signUp.createdUserId) {
          return
        }
        const user = await onSignUpUser({
          firstname: values.firstname,
          lastname: values.lastname,
          clerkId: signUp.createdUserId,
          image: "",
        })

        reset()

        if (user.status === 200) {
          toast("Success", { description: user.message })
          await setActive({ session: completeSignUp.createdSessionId })
          router.push("/") // WIP: redirect to dashboard
        }

        if (user.status !== 200) {
          toast("Error", { description: user.message + "action failed" })
          router.refresh
        }

        setCreating(false)
        setVerifying(false)
      } else {
        console.log(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2))
      toast("Error", { description: "Oops! something went wrong, Try again." })
    }
  })

  return {
    onGenerateCode,
    onInitiateUserRegistration,
    register,
    errors,
    verifying,
    creating,
    code,
    setCode,
    getValues,
  }
}

export const useGoogleAuth = () => {
  const { signIn, isLoaded: LoadedSignIn } = useSignIn()
  const { signUp, isLoaded: LoadedSignUp } = useSignUp()

  const signInWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignIn) return
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/sign-in",
      })
    } catch (error: any) {
      toast("Error", { description: "Oops! something went wrong" })
    }
  }

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) return
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/complete",
      })
    } catch (error: any) {
      toast("Error", { description: "Oops! something went wrong" })
    }
  }

  return { signUpWith, signInWith }
}
