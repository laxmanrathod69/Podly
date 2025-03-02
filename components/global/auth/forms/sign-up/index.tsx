"use client"

import { Loader } from "@/components/global/loader"
import { Button } from "@/components/ui/button"
import { SIGN_UP_FORM } from "@/constants"
import { useAuthSignUp } from "@/hooks/auth"
import dynamic from "next/dynamic"
import { FormGenerator } from "../form-generator"

const OtpInput = dynamic(
  () =>
    import("@/components/global/otp-input").then(
      (component) => component.default,
    ),
  { ssr: false },
)

export const SignUpForm = () => {
  const {
    register,
    errors,
    verifying,
    creating,
    onGenerateCode,
    onInitiateUserRegistration,
    code,
    setCode,
    getValues,
  } = useAuthSignUp()

  return (
    <form
      onSubmit={onInitiateUserRegistration}
      className="flex flex-col gap-3 mt-7"
    >
      <div id="clerk-captcha"></div> {/* TODO: Adjust Clerk captcha */}
      {verifying ? (
        <div className="flex justify-center mb-5 text-white-1">
          <OtpInput otp={code} setOtp={setCode} />
        </div>
      ) : (
        SIGN_UP_FORM.map((field) => (
          <FormGenerator
            {...field}
            key={field.id}
            register={register}
            errors={errors}
          />
        ))
      )}
      {verifying ? (
        <Button
          type="submit"
          className="rounded-lg bg-orange-1 hover:bg-orange-700 transition-all ease-in-out duration-200 h-8"
          disabled={creating}
        >
          <Loader loading={creating}>Sign Up with Email</Loader>
        </Button>
      ) : (
        <Button
          type="button"
          disabled={creating}
          className="rounded-lg bg-orange-1 hover:bg-orange-700 transition-all ease-in-out duration-200 h-8"
          onClick={() =>
            onGenerateCode(getValues("email"), getValues("password"))
          }
        >
          <Loader loading={false}>Generate Code</Loader>
        </Button>
      )}
    </form>
  )
}
