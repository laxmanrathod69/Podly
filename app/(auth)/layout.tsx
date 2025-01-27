import { onAuthenticatedUser } from "@/actions/auth.actions"
import Image from "next/image"
import { redirect } from "next/navigation"

interface Props {
  children: React.ReactNode
}

const AuthLayout = async ({ children }: Props) => {
  const user = await onAuthenticatedUser()
  if (user.status === 200) redirect("/callback/sign-in")

  return (
    <main className="relative h-screen w-full">
      <div className="absolute size-full">
        <Image
          src="/images/bg-img.png"
          alt="bankground"
          fill
          className="size-full"
        />
      </div>
      {children}
    </main>
  )
}

export default AuthLayout
