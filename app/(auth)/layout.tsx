import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image"
import { redirect } from "next/navigation"

const AuthLayout = async ({ children }: ChildrenProp) => {
  try {
    const user = await currentUser()
    if (user?.id) redirect("/")
  } catch (error: any) {
    console.error(`Error in AuthLayout: ${JSON.stringify(error, null, 2)}`)
  }

  return (
    <main className="relative h-screen w-full">
      <div className="absolute w-full h-full">
        <Image
          src="/images/bg-img.png"
          alt="bankground"
          fill
          className="w-full h-full"
        />
      </div>
      {children}
    </main>
  )
}

export default AuthLayout
