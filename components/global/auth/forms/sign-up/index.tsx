"use client"
import dynamic from "next/dynamic"
import { useAuthSignUp } from "@/hooks/auth"
import { SIGN_UP_FORM } from "@/constants"
import { FormGenerator } from "../form-generator"
import { Button } from "@/components/ui/button"
import { Loader } from "@/components/global/loader"

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
          <Loader isLoading={creating} label="Verifying..." variant="spin2">
            Sign Up with Email
          </Loader>
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
          Generate Code
        </Button>
      )}
    </form>
  )
}
