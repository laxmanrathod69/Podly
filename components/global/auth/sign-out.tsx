import { Button } from "@/components/ui/button"
import { SignedIn, useClerk } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

export const SignUp = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  return (
    <SignedIn>
      <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
        <Button
          className="text-16 w-full bg-orange-1 hover:bg-orange-600 transition-all ease-in-out duration-200 font-extrabold"
          onClick={() => signOut(() => router.push("/"))}
        >
          Sign out
        </Button>
      </div>
    </SignedIn>
  )
}
