import { onAuthenticatedUser } from "@/actions/auth.actions"
import Image from "next/image"
import { redirect } from "next/navigation"

const AuthLayout = async ({ children }: ChildrenProp) => {
  const user = await onAuthenticatedUser()
  if (user.status === 200) redirect("/")

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
