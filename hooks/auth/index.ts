"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { redirect, useRouter } from "next/navigation"
import { useAuth, useClerk, useSignIn, useSignUp } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { OAuthStrategy } from "@clerk/types"
import { useEffect, useState } from "react"
import { onSignUpUser } from "@/actions/auth.actions"
import { SignInSchema } from "@/components/global/auth/forms/sign-in/schema"
import { SignUpSchema } from "@/components/global/auth/forms/sign-up/schema"
import { useErrorToast2, useSuccessToast } from "../toasts"

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
    if (!isLoaded) return useErrorToast2("Oops! something went wrong")

    try {
      const authenticated = await signIn.create({
        identifier: email,
        password,
      })

      if (authenticated.status === "complete") {
        reset()
        await setActive({ session: authenticated.createdSessionId })
        useSuccessToast("Welcome back!")
        router.push("/callback/sign-in")
      } else {
        useErrorToast2("Failed to sign in. Please check your credentials.")
      }
    } catch (error: any) {
      useErrorToast2("Incorrect email or password, try again.")
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
    if (!isLoaded) return useErrorToast2("Oops! something went wrong")
    try {
      if (email && password) {
        await signUp.create({
          emailAddress: getValues("email"),
          password: getValues("password"),
        })

        await signUp.prepareEmailAddressVerification({ strategy: "email_code" })
        setVerifying(true)
      } else {
        setVerifying(false)
        return useErrorToast2("No fields must be empty")
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2))
      return useErrorToast2("Oops! something went wrong.")
    }
  }

  const onInitiateUserRegistration = handleSubmit(async (values) => {
    if (!isLoaded) return useErrorToast2("Oops! something went wrong.")

    try {
      setCreating(true)
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status !== "complete") {
        setCreating(false)
        return useErrorToast2("Oops! something went wrong.")
      }

      if (completeSignUp.status === "complete") {
        if (!signUp.createdUserId) {
          return
        }
        const user = await onSignUpUser({
          name: `${values.firstname} ${values.lastname}`,
          clerkId: signUp.createdUserId,
          image: "",
        })

        reset()

        if (user.status === 200) {
          useSuccessToast(user.message)
          await setActive({ session: completeSignUp.createdSessionId })
          setCreating(false)
          router.push("/") // WIP: redirect to dashboard
        }

        if (user.status !== 200) {
          useErrorToast2(user.message)
          router.refresh
        }

        setCreating(false)
        setVerifying(false)
      } else {
        console.log(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (error: any) {
      console.error(JSON.stringify(error, null, 2))
      return useErrorToast2("Oops! something went wrong.")
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
    if (!LoadedSignIn) {
      useErrorToast2("Oops! something went wrong")
      redirect("/sign-in")
    }
    try {
      return signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/sign-in",
      })
    } catch (error: any) {
      useErrorToast2("Oops! something went wrong")
    }
  }

  const signUpWith = (strategy: OAuthStrategy) => {
    if (!LoadedSignUp) {
      useErrorToast2("Oops! Something went wrong")
      redirect("/sign-up")
    }
    try {
      return signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/callback",
        redirectUrlComplete: "/callback/complete",
      })
    } catch (error: any) {
      useErrorToast2("Oops! something went wrong")
    }
  }

  return { signUpWith, signInWith }
}

export const useSignOut = () => {
  const { signOut } = useClerk()
  const { sessionId } = useAuth()

  const onSignOutUser = async (sessionId: string) => {
    try {
      await signOut({ sessionId })
      useSuccessToast("You have successfully signed out")
      redirect("/")
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Oops! something went wrong"
      useErrorToast2(errorMessage)
    }
  }

  useEffect(() => {
    if (sessionId) {
      onSignOutUser(sessionId)
    }
  }, [sessionId, onSignOutUser])

  return null
}
