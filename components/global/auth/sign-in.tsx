import { Button } from "@/components/ui/button"
import { SignedOut } from "@clerk/nextjs"
import Link from "next/link"

export const SignIn = () => {
  return (
    <SignedOut>
      <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
        <Button
          asChild
          className="text-16 w-full bg-orange-1 hover:bg-orange-600 transition-all ease-in-out duration-200 font-extrabold"
        >
          <Link href="/sign-in">Sign in</Link>
        </Button>
      </div>
    </SignedOut>
  )
}
