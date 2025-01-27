"use client"

import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { SIGN_IN_FORM } from "@/constants/forms"
import { useAuthSignIn } from "@/hooks/auth/index"
import { FormGenerator } from "../form-generator"

export const SignInForm = () => {
  const { isPending, onAuthenticateUser, register, errors } = useAuthSignIn()

  return (
    <form className="flex flex-col gap-3 mt-7" onSubmit={onAuthenticateUser}>
      {SIGN_IN_FORM.map((field) => (
        <FormGenerator
          {...field}
          key={field.id}
          register={register}
          errors={errors}
        />
      ))}

      <Button
        type="submit"
        className="rounded-lg bg-orange-1 hover:bg-orange-700 transition-all ease-in-out duration-200 h-8"
      >
        <Loader loading={isPending}>Sign In with Email</Loader>
      </Button>
    </form>
  )
}
